package com.volt.terminal

import android.animation.*
import android.app.AlertDialog
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.view.*
import android.view.animation.AccelerateDecelerateInterpolator
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.camera.core.*
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.google.mlkit.vision.barcode.BarcodeScanning
import com.google.mlkit.vision.barcode.common.Barcode
import com.google.mlkit.vision.common.InputImage
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

class MainActivity : AppCompatActivity() {

    enum class State { SCANNING, PROCESSING, WAITING_SELECTION, SUCCESS, COOLDOWN, ERROR }

    // ── Views ─────────────────────────────────────────────────────────────────
    private lateinit var previewView: PreviewView
    private lateinit var layoutOverlay: FrameLayout
    private lateinit var layoutScanning: LinearLayout
    private lateinit var layoutResult: LinearLayout
    private lateinit var layoutDiag: LinearLayout
    private lateinit var tvResultIcon: TextView
    private lateinit var tvResultTitle: TextView
    private lateinit var tvResultSub: TextView
    private lateinit var tvVoltLogo: TextView
    private lateinit var viewQrCorners: View
    private lateinit var viewScanLine: View
    private lateinit var viewPulse: View
    private lateinit var viewMdbDot: View
    private lateinit var tvMdbStatus: TextView
    private lateinit var tvScanHint: TextView
    private lateinit var tvDiagTime: TextView
    private lateinit var tvDiagMdb: TextView
    private lateinit var tvDiagClear: TextView
    private lateinit var scrollDiag: android.widget.ScrollView

    private val clockHandler  = Handler(Looper.getMainLooper())
    private val timeFmt       = SimpleDateFormat("HH:mm:ss  dd/MM/yyyy", Locale.getDefault())
    private val logTimeFmt    = SimpleDateFormat("HH:mm:ss", Locale.getDefault())
    private val logLines      = ArrayDeque<String>(50)

    private val clockRunnable = object : Runnable {
        override fun run() {
            tvDiagTime.text = timeFmt.format(Date())
            clockHandler.postDelayed(this, 1000)
        }
    }

    private fun appendLog(msg: String) {
        val line = "${logTimeFmt.format(Date())} $msg"
        if (logLines.size >= 50) logLines.removeFirst()
        logLines.addLast(line)
        runOnUiThread {
            tvDiagMdb.text = logLines.joinToString("\n")
            scrollDiag.post { scrollDiag.fullScroll(android.widget.ScrollView.FOCUS_DOWN) }
        }
    }

    // ── Logic ─────────────────────────────────────────────────────────────────
    private lateinit var cameraExecutor: ExecutorService
    private lateinit var apiClient: VoltApiClient
    private lateinit var mdbController: MdbController

    private var state = State.SCANNING
    private var isProcessing = false
    private var mdbReady = false
    private var readerEnabled = false
    @Volatile private var pendingVendOutcome: ((Boolean) -> Unit)? = null

    // ── Animations ────────────────────────────────────────────────────────────
    private var scanLineAnimator: ObjectAnimator? = null
    private var pulseAnimator: ObjectAnimator? = null

    // ── Kiosk ─────────────────────────────────────────────────────────────────
    private val ADMIN_PIN = "2025"
    private var logoLongPressStart = 0L

    companion object {
        private const val TAG = "VOLT_Main"
        private const val RESULT_DISPLAY_MS = 4_000L
        private const val REQ_CAMERA = 101
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  LIFECYCLE
    // ══════════════════════════════════════════════════════════════════════════

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setupWindow()
        setContentView(R.layout.activity_main)
        bindViews()
        setupKiosk()

        apiClient      = VoltApiClient()
        mdbController  = MdbController(this)
        cameraExecutor = Executors.newSingleThreadExecutor()

        mdbController.onStatusChange = { msg -> appendLog(msg) }

        mdbController.onMdbReady = {
            mdbReady = true
            runOnUiThread {
                setMdbDot(MdbDotState.GREEN)
                tvScanHint.text = "Scanne ton QR code"
            }
        }

        mdbController.onReaderEnabled = {
            readerEnabled = true
            val pending = pendingVendOutcome
            if (pending != null) {
                appendLog("Lecteur actif + credit deja valide -> BEGIN SESSION")
                mdbController.beginSession(pending)
            } else {
                appendLog("Lecteur actif - scan QR d'abord")
                runOnUiThread {
                    tvScanHint.text = "Machine prête · scannez !"
                    startPulse()
                    flashQrCorners()
                }
            }
        }

        mdbController.onReaderDisabled = {
            readerEnabled = false
            runOnUiThread {
                if (state == State.SCANNING) {
                    tvScanHint.text = if (mdbReady) "Scanne ton QR code" else "Connexion MDB..."
                }
                stopPulse()
                viewQrCorners.animate().alpha(0.75f).setDuration(400).start()
            }
        }

        mdbController.start()
        setMdbDot(MdbDotState.RED)
        clockHandler.post(clockRunnable)

        if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.CAMERA)
                == PackageManager.PERMISSION_GRANTED) {
            startCamera()
        } else {
            ActivityCompat.requestPermissions(this,
                arrayOf(android.Manifest.permission.CAMERA), REQ_CAMERA)
        }
        setState(State.SCANNING)
    }

    override fun onResume() {
        super.onResume()
        hideSystemUI()
    }

    override fun onDestroy() {
        super.onDestroy()
        clockHandler.removeCallbacks(clockRunnable)
        cameraExecutor.shutdown()
        mdbController.stop()
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  WINDOW / KIOSK
    // ══════════════════════════════════════════════════════════════════════════

    private fun setupWindow() {
        window.addFlags(
            WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON or
            WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD or
            WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED or
            WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
        )
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            window.setDecorFitsSystemWindows(false)
        }
    }

    private fun hideSystemUI() {
        @Suppress("DEPRECATION")
        window.decorView.systemUiVisibility = (
            View.SYSTEM_UI_FLAG_FULLSCREEN
            or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
            or View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
            or View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
            or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
        )
    }

    private fun setupKiosk() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            try { startLockTask() } catch (e: Exception) { Log.w(TAG, "startLockTask: ${e.message}") }
        }
        tvVoltLogo.setOnTouchListener { _, event ->
            when (event.action) {
                MotionEvent.ACTION_DOWN -> logoLongPressStart = System.currentTimeMillis()
                MotionEvent.ACTION_UP   -> {
                    val held = System.currentTimeMillis() - logoLongPressStart
                    when {
                        held >= 3000L -> showAdminPinDialog()
                        held >= 500L  -> toggleDiag()
                    }
                }
            }
            true
        }
    }

    private fun toggleDiag() {
        layoutDiag.visibility = if (layoutDiag.visibility == View.VISIBLE) View.GONE else View.VISIBLE
    }

    private fun showAdminPinDialog() {
        val input = EditText(this).apply {
            inputType = android.text.InputType.TYPE_CLASS_NUMBER or
                        android.text.InputType.TYPE_NUMBER_VARIATION_PASSWORD
            hint = "Code admin"
            textSize = 22f
            gravity = Gravity.CENTER
            setPadding(40, 40, 40, 40)
        }
        AlertDialog.Builder(this)
            .setTitle("Mode administration")
            .setView(input)
            .setPositiveButton("Confirmer") { _, _ ->
                if (input.text.toString() == ADMIN_PIN) {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) stopLockTask()
                    Toast.makeText(this, "Mode admin activé", Toast.LENGTH_SHORT).show()
                } else {
                    Toast.makeText(this, "Code incorrect", Toast.LENGTH_SHORT).show()
                }
            }
            .setNegativeButton("Annuler", null)
            .show()
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == REQ_CAMERA && grantResults.firstOrNull() == PackageManager.PERMISSION_GRANTED) {
            startCamera()
        }
    }

    @Suppress("OVERRIDE_DEPRECATION")
    override fun onBackPressed() { /* kiosque */ }

    // ══════════════════════════════════════════════════════════════════════════
    //  MDB STATUS DOT
    // ══════════════════════════════════════════════════════════════════════════

    private enum class MdbDotState { RED, YELLOW, GREEN }

    private fun setMdbDot(dotState: MdbDotState) {
        runOnUiThread {
            val (drawable, label) = when (dotState) {
                MdbDotState.RED    -> Pair(R.drawable.dot_red,    "Connexion...")
                MdbDotState.YELLOW -> Pair(R.drawable.dot_yellow, "En attente machine...")
                MdbDotState.GREEN  -> Pair(R.drawable.dot_green,  "Connecté")
            }
            viewMdbDot.setBackgroundResource(drawable)
            tvMdbStatus.text = label
        }
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  STATES
    // ══════════════════════════════════════════════════════════════════════════

    private fun setState(newState: State, data: StateData = StateData()) {
        state = newState
        layoutOverlay.removeCallbacks(null)
        runOnUiThread {
            hideSystemUI()
            when (newState) {
                State.SCANNING           -> showScanning()
                State.PROCESSING         -> showProcessing()
                State.WAITING_SELECTION  -> showWaitingSelection(data)
                State.SUCCESS            -> showSuccess(data)
                State.COOLDOWN           -> showCooldown(data)
                State.ERROR              -> showError(data)
            }
        }
    }

    private fun showScanning() {
        isProcessing = false
        layoutOverlay.visibility  = View.GONE
        layoutScanning.visibility = View.VISIBLE
        viewQrCorners.alpha = 0.75f
        startScanLineAnimation()
        if (readerEnabled) {
            tvScanHint.text = "Machine prête · scannez !"
            startPulse()
        } else {
            tvScanHint.text = if (mdbReady) "Scanne ton QR code" else "Connexion MDB..."
            stopPulse()
        }
    }

    private fun showProcessing() {
        stopScanLineAnimation()
        stopPulse()
        layoutScanning.visibility = View.GONE
        layoutOverlay.visibility  = View.VISIBLE
        layoutOverlay.setBackgroundResource(R.drawable.bg_processing)
        tvResultIcon.text  = "⚡"
        tvResultTitle.text = getString(R.string.state_processing)
        tvResultSub.text   = getString(R.string.state_processing_sub)
        animatePulse(tvResultIcon)
    }

    private fun showWaitingSelection(data: StateData) {
        stopScanLineAnimation()
        stopPulse()
        layoutScanning.visibility = View.GONE
        layoutOverlay.visibility  = View.VISIBLE
        layoutOverlay.setBackgroundResource(R.drawable.bg_success)
        tvResultIcon.text  = "✓"
        tvResultTitle.text = data.userName?.let { getString(R.string.success_greeting, it) }
            ?: getString(R.string.waiting_message)
        tvResultSub.text   = getString(R.string.waiting_sub)
        animateSlideIn(layoutResult)
        layoutOverlay.postDelayed({
            if (state == State.WAITING_SELECTION) {
                mdbController.cancelSession()
                setState(State.SCANNING)
            }
        }, 30_000L)
    }

    private fun showSuccess(data: StateData) {
        stopScanLineAnimation()
        stopPulse()
        layoutScanning.visibility = View.GONE
        layoutOverlay.visibility  = View.VISIBLE
        layoutOverlay.setBackgroundResource(R.drawable.bg_success)
        tvResultIcon.text  = "✓"
        tvResultTitle.text = data.userName?.let { getString(R.string.success_greeting, it) }
            ?: getString(R.string.success_message)
        tvResultSub.text   = getString(R.string.success_sub)
        animateSlideIn(layoutResult)
        layoutOverlay.postDelayed({ setState(State.SCANNING) }, RESULT_DISPLAY_MS)
    }

    private fun showCooldown(data: StateData) {
        stopScanLineAnimation()
        stopPulse()
        layoutScanning.visibility = View.GONE
        layoutOverlay.visibility  = View.VISIBLE
        layoutOverlay.setBackgroundResource(R.drawable.bg_cooldown)
        tvResultIcon.text  = "⏱"
        tvResultTitle.text = getString(R.string.cooldown_message)
        tvResultSub.text   = getString(R.string.cooldown_sub)
        animateSlideIn(layoutResult)
        layoutOverlay.postDelayed({ setState(State.SCANNING) }, RESULT_DISPLAY_MS)
    }

    private fun showError(data: StateData) {
        stopScanLineAnimation()
        stopPulse()
        layoutScanning.visibility = View.GONE
        layoutOverlay.visibility  = View.VISIBLE
        layoutOverlay.setBackgroundResource(R.drawable.bg_error)
        tvResultIcon.text  = "✕"
        tvResultTitle.text = data.errorMessage ?: getString(R.string.error_message)
        tvResultSub.text   = data.errorSub ?: getString(R.string.error_sub)
        animateShake(tvResultIcon)
        layoutOverlay.postDelayed({ setState(State.SCANNING) }, RESULT_DISPLAY_MS)
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  QR DETECTION
    // ══════════════════════════════════════════════════════════════════════════

    private fun onQRDetected(raw: String) {
        if (isProcessing || state != State.SCANNING) return
        if (!raw.startsWith("volt://")) return
        val token = raw.removePrefix("volt://")
        if (token.isBlank()) return
        if (!mdbReady) {
            appendLog("Scan ignore - MDB pas encore pret")
            return
        }

        isProcessing = true
        setState(State.PROCESSING)

        apiClient.validateToken(token) { result ->
            when (result.status) {
                VoltApiClient.ValidationStatus.APPROVED -> {
                    val userName = result.userName
                    setState(State.WAITING_SELECTION, StateData(userName = userName))

                    val outcome: (Boolean) -> Unit = { ok ->
                        pendingVendOutcome = null
                        if (ok) setState(State.SUCCESS, StateData(userName = userName))
                        else    setState(State.ERROR, StateData(
                            errorMessage = getString(R.string.vend_failed_message),
                            errorSub     = getString(R.string.vend_failed_sub)
                        ))
                    }

                    if (readerEnabled) {
                        appendLog("Lecteur deja actif -> BEGIN SESSION")
                        mdbController.beginSession(outcome)
                    } else {
                        appendLog("Credit valide - attente lecteur machine...")
                        pendingVendOutcome = outcome
                        clockHandler.postDelayed({
                            if (pendingVendOutcome != null) {
                                pendingVendOutcome = null
                                appendLog("Timeout 90s - credit expire")
                                setState(State.SCANNING)
                            }
                        }, 90_000L)
                    }
                }
                VoltApiClient.ValidationStatus.COOLDOWN ->
                    setState(State.COOLDOWN, StateData())
                VoltApiClient.ValidationStatus.BLOCKED ->
                    setState(State.ERROR, StateData(
                        errorMessage = getString(R.string.blocked_message),
                        errorSub     = getString(R.string.blocked_sub)
                    ))
                else ->
                    setState(State.ERROR, StateData(
                        errorMessage = getString(R.string.error_message),
                        errorSub     = when (result.reason) {
                            "NOT_SUBSCRIBED"        -> getString(R.string.error_not_subscribed)
                            "QR_EXPIRED_OR_INVALID" -> getString(R.string.error_expired)
                            else                    -> getString(R.string.error_sub)
                        }
                    ))
            }
        }
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  CAMERA
    // ══════════════════════════════════════════════════════════════════════════

    private fun startCamera() {
        ProcessCameraProvider.getInstance(this).also { future ->
            future.addListener({
                try {
                    val provider = future.get()
                    val preview  = Preview.Builder().build().also {
                        it.setSurfaceProvider(previewView.surfaceProvider)
                    }
                    val analysis = ImageAnalysis.Builder()
                        .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
                        .build()
                        .also { it.setAnalyzer(cameraExecutor, ::analyzeImage) }
                    provider.unbindAll()
                    provider.bindToLifecycle(this, CameraSelector.DEFAULT_FRONT_CAMERA, preview, analysis)
                } catch (e: Exception) { Log.e(TAG, "Camera: ${e.message}") }
            }, ContextCompat.getMainExecutor(this))
        }
    }

    @androidx.camera.core.ExperimentalGetImage
    private fun analyzeImage(proxy: ImageProxy) {
        val img = proxy.image ?: run { proxy.close(); return }
        val input = InputImage.fromMediaImage(img, proxy.imageInfo.rotationDegrees)
        BarcodeScanning.getClient().process(input)
            .addOnSuccessListener { codes ->
                codes.firstOrNull { it.format == Barcode.FORMAT_QR_CODE }
                    ?.rawValue?.let { onQRDetected(it) }
            }
            .addOnCompleteListener { proxy.close() }
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  ANIMATIONS
    // ══════════════════════════════════════════════════════════════════════════

    private fun startScanLineAnimation() {
        viewScanLine.post {
            val frameH = (viewScanLine.parent as? View)?.height ?: return@post
            val lineH  = viewScanLine.height.coerceAtLeast(1)
            scanLineAnimator?.cancel()
            scanLineAnimator = ObjectAnimator.ofFloat(viewScanLine, "translationY",
                0f, (frameH - lineH).toFloat()).apply {
                duration = 2000L
                repeatCount = ObjectAnimator.INFINITE
                repeatMode = ObjectAnimator.REVERSE
                interpolator = AccelerateDecelerateInterpolator()
                start()
            }
        }
    }

    private fun stopScanLineAnimation() {
        scanLineAnimator?.cancel()
        scanLineAnimator = null
    }

    private fun startPulse() {
        viewPulse.visibility = View.VISIBLE
        pulseAnimator?.cancel()
        pulseAnimator = ObjectAnimator.ofFloat(viewPulse, "alpha", 0f, 1f, 0f).apply {
            duration = 1000L
            repeatCount = ObjectAnimator.INFINITE
            interpolator = AccelerateDecelerateInterpolator()
            start()
        }
    }

    private fun stopPulse() {
        pulseAnimator?.cancel()
        pulseAnimator = null
        viewPulse.alpha = 0f
    }

    private fun flashQrCorners() {
        viewQrCorners.animate().cancel()
        ObjectAnimator.ofFloat(viewQrCorners, "alpha", 0.75f, 1f, 0.75f, 1f, 0.85f).apply {
            duration = 600L
            start()
        }
    }

    private fun animatePulse(v: View) {
        ObjectAnimator.ofPropertyValuesHolder(v,
            PropertyValuesHolder.ofFloat("scaleX", 1f, 1.2f, 1f),
            PropertyValuesHolder.ofFloat("scaleY", 1f, 1.2f, 1f)
        ).apply {
            duration = 800
            repeatCount = ObjectAnimator.INFINITE
            interpolator = AccelerateDecelerateInterpolator()
        }.start()
    }

    private fun animateSlideIn(v: View) {
        v.translationY = 80f
        v.alpha = 0f
        v.animate().translationY(0f).alpha(1f).setDuration(350)
            .setInterpolator(AccelerateDecelerateInterpolator()).start()
    }

    private fun animateShake(v: View) {
        ObjectAnimator.ofFloat(v, "translationX", 0f, -24f, 24f, -16f, 16f, -8f, 8f, 0f).apply {
            duration = 500
        }.start()
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  HELPERS
    // ══════════════════════════════════════════════════════════════════════════

    private fun bindViews() {
        previewView    = findViewById(R.id.previewView)
        layoutOverlay  = findViewById(R.id.layoutOverlay)
        layoutScanning = findViewById(R.id.layoutScanning)
        layoutResult   = findViewById(R.id.layoutResult)
        layoutDiag     = findViewById(R.id.layoutDiag)
        tvResultIcon   = findViewById(R.id.tvResultIcon)
        tvResultTitle  = findViewById(R.id.tvResultTitle)
        tvResultSub    = findViewById(R.id.tvResultSub)
        tvVoltLogo     = findViewById(R.id.tvVoltLogo)
        viewQrCorners  = findViewById(R.id.viewQrCorners)
        viewScanLine   = findViewById(R.id.viewScanLine)
        viewPulse      = findViewById(R.id.viewPulse)
        viewMdbDot     = findViewById(R.id.viewMdbDot)
        tvMdbStatus    = findViewById(R.id.tvMdbStatus)
        tvScanHint     = findViewById(R.id.tvScanHint)
        tvDiagTime     = findViewById(R.id.tvDiagTime)
        tvDiagMdb      = findViewById(R.id.tvDiagMdb)
        tvDiagClear    = findViewById(R.id.tvDiagClear)
        scrollDiag     = findViewById(R.id.scrollDiag)
        tvDiagClear.setOnClickListener { logLines.clear(); tvDiagMdb.text = "--- Journal effacé ---" }
    }

    data class StateData(
        val userName: String?     = null,
        val errorMessage: String? = null,
        val errorSub: String?     = null
    )
}
