/* ============================================================
   VOLT. — "Le test" : quiz 4 questions → 1 produit recommandé
   Produits : performance · antioxidant · immune · reload
   ============================================================ */
(function(){
  var PRODUITS = {
    performance:{nom:"PERFORMANCE",arome:"Ananas · Guarana",accent:"#0057FF",img:"images/tropical-twist.webp",pos:"50% 22%",
      desc:"Ton carburant avant l'effort. Boostée au guarana, au calcium et au magnésium pour révéler ta pleine puissance.",
      tags:["Guarana naturel","Énergie","Calcium + Magnésium"]},
    antioxidant:{nom:"ANTIOXIDANT",arome:"Citron · Orange",accent:"#F0922B",img:"images/citrus-burst.webp",pos:"50% 45%",
      desc:"La fraîcheur acidulée au quotidien. Pleine d'antioxydants, de vitamine E, de zinc et de sélénium.",
      tags:["Antioxydants","Vitamine E","Fraîcheur"]},
    immune:{nom:"IMMUNE SUPPORT",arome:"Fraise · Sureau",accent:"#E5484D",img:"images/berry-boost.webp",pos:"50% 38%",
      desc:"Ton bouclier au fil des saisons. Fraise et sureau, complexe B, zinc et sélénium pour soutenir l'immunité.",
      tags:["Sureau","Complexe B","Immunité"]},
    reload:{nom:"RELOAD",arome:"Mangue · Magnésium",accent:"#F2B705",img:"images/tropical-twist.webp",pos:"30% 80%",
      desc:"La récupération en douceur. Mangue, magnésium et zinc pour recharger les batteries après l'effort.",
      tags:["Magnésium","Récupération","Zinc"]}
  };

  var QUESTIONS = [
    { q:"Ton objectif n°1 avec VOLT. ?", w:2, opts:[
      {t:"Un boost d'énergie avant l'effort", e:"⚡", p:"performance"},
      {t:"Bien récupérer après ma séance", e:"🔋", p:"reload"},
      {t:"Renforcer mes défenses naturelles", e:"🛡️", p:"immune"},
      {t:"M'hydrater fraîchement, sans sucre", e:"💧", p:"antioxidant"}
    ]},
    { q:"Quel profil de goût te tente le plus ?", w:2, opts:[
      {t:"Ananas exotique", e:"🍍", p:"performance"},
      {t:"Agrumes acidulés — citron & orange", e:"🍋", p:"antioxidant"},
      {t:"Fraise gourmande", e:"🍓", p:"immune"},
      {t:"Mangue douce & ensoleillée", e:"🥭", p:"reload"}
    ]},
    { q:"À quel moment bois-tu ton eau vitaminée ?", w:1, opts:[
      {t:"Juste avant de m'entraîner", e:"🏋️", p:"performance"},
      {t:"Après l'effort, pour récupérer", e:"🧊", p:"reload"},
      {t:"En période de fatigue ou en hiver", e:"❄️", p:"immune"},
      {t:"Tout au long de la journée", e:"☀️", p:"antioxidant"}
    ]},
    { q:"Ce qui compte le plus pour toi ?", w:1, opts:[
      {t:"Un vrai coup de fouet (caféine/guarana)", e:"🚀", p:"performance"},
      {t:"Du magnésium pour mes muscles", e:"💪", p:"reload"},
      {t:"Vitamine C, zinc & sureau", e:"🍊", p:"immune"},
      {t:"Antioxydants & légèreté", e:"🌿", p:"antioxidant"}
    ]}
  ];

  var root = document.getElementById('quiz');
  if(!root) return;

  function vmix(hex,t,amt){hex=hex.replace('#','');var r=parseInt(hex.substr(0,2),16),g=parseInt(hex.substr(2,2),16),b=parseInt(hex.substr(4,2),16);var tr=(t>>16)&255,tg=(t>>8)&255,tb=t&255;r=Math.round(r+(tr-r)*amt);g=Math.round(g+(tg-g)*amt);b=Math.round(b+(tb-b)*amt);return '#'+[r,g,b].map(function(x){return ('0'+x.toString(16)).slice(-2)}).join('');}

  function voltCan(p,h){
    var a=p.accent, id=p.id||p.nom.toLowerCase().replace(/[^a-z]/g,''), nom=p.nom;
    var bt=vmix(a,0xffffff,0.20), bb=vmix(a,0x000000,0.06);
    var FR={performance:'pineapple',antioxidant:'citrus',immune:'strawberry',reload:'mango'};
    var fr=FR[id]||'citrus';
    function fruit(t,x,y,s,r){
      var g='<g transform="translate('+x+' '+y+') scale('+s+') rotate('+(r||0)+')'+'">';
      if(t==='pineapple'){g+='<path d="M0 -30 L-6 -13 L-13 -23 L-9 -9 L-19 -15 L-10 -3 Z" fill="#36A85B"/><path d="M0 -30 L6 -13 L13 -23 L9 -9 L19 -15 L10 -3 Z" fill="#36A85B"/><path d="M0 -33 L-4 -7 L4 -7 Z" fill="#43C977"/><ellipse cx="0" cy="7" rx="16" ry="22" fill="#F4C234"/><path d="M-13 -3 L1 7 M-14 7 L2 19 M-3 -11 L13 1 M-5 3 L11 15" stroke="#D79A1F" stroke-width="1.3" fill="none" opacity=".55"/><ellipse cx="0" cy="7" rx="16" ry="22" fill="none" stroke="#D79A1F" stroke-width="1.4" opacity=".5"/>';}
      else if(t==='citrus'){g+='<circle r="20" fill="#EE8E2E"/><circle r="15.5" fill="#FFD79A"/><path d="M0 0 L0 -14 M0 0 L9.9 -9.9 M0 0 L14 0 M0 0 L9.9 9.9 M0 0 L0 14 M0 0 L-9.9 9.9 M0 0 L-14 0 M0 0 L-9.9 -9.9" stroke="#F2A94D" stroke-width="1.5"/><circle r="3" fill="#FFEAC6"/>';}
      else if(t==='strawberry'){g+='<path d="M0 17 C-14 8 -18 -5 -10 -12 C-4 -18 4 -18 10 -12 C18 -5 14 8 0 17 Z" fill="#E5484D"/><g fill="#FBD46B"><ellipse cx="-6" cy="-4" rx="1.5" ry="2.2"/><ellipse cx="2" cy="-6" rx="1.5" ry="2.2"/><ellipse cx="7" cy="-1" rx="1.5" ry="2.2"/><ellipse cx="-2" cy="2" rx="1.5" ry="2.2"/><ellipse cx="-8" cy="4" rx="1.5" ry="2.2"/><ellipse cx="4" cy="5" rx="1.5" ry="2.2"/><ellipse cx="0" cy="9" rx="1.5" ry="2.2"/></g><path d="M0 -10 L-9 -17 L-3 -11 L-10 -8 L-2 -8 L0 -16 L2 -8 L10 -8 L3 -11 L9 -17 Z" fill="#36A85B"/>';}
      else{g+='<path d="M-5 -16 C12 -19 21 -3 16 11 C12 22 -5 23 -13 12 C-21 1 -18 -13 -5 -16 Z" fill="#F4A93C"/><ellipse cx="-4" cy="-5" rx="11" ry="12" fill="#E8612C" opacity=".45"/><path d="M-5 -16 C-11 -23 -1 -26 4 -21 C0 -19 -3 -17 -5 -16 Z" fill="#36A85B"/>';}
      return g+'</g>';
    }
    return '<div class="vcan" style="height:'+h+'px;--acc:'+a+'">'+
      '<span class="b b1"></span><span class="b b2"></span><span class="b b3"></span>'+
      '<svg class="vcan-svg" viewBox="0 0 300 470" xmlns="http://www.w3.org/2000/svg">'+
        '<defs>'+
          '<linearGradient id="bd-'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+bt+'"/><stop offset="1" stop-color="'+bb+'"/></linearGradient>'+
          '<clipPath id="bc-'+id+'"><rect x="96" y="104" width="108" height="296" rx="34"/></clipPath>'+
        '</defs>'+
        '<ellipse cx="150" cy="432" rx="66" ry="12" fill="rgba(10,15,30,.10)"/>'+
        fruit(fr,66,254,1.4,-12)+
        '<rect x="132" y="84" width="36" height="26" rx="4" fill="#1B2236"/>'+
        '<rect x="126" y="62" width="48" height="26" rx="9" fill="#26314C"/>'+
        '<rect x="145" y="48" width="10" height="16" rx="3" fill="#26314C"/>'+
        '<rect x="96" y="104" width="108" height="296" rx="34" fill="url(#bd-'+id+')" stroke="rgba(10,15,30,.08)"/>'+
        '<g clip-path="url(#bc-'+id+')"><rect x="110" y="126" width="14" height="250" rx="7" fill="rgba(255,255,255,.30)"/><rect x="128" y="126" width="6" height="250" rx="3" fill="rgba(255,255,255,.18)"/></g>'+
        '<rect x="100" y="202" width="100" height="86" rx="9" fill="#ffffff" opacity="0.96"/>'+
        fruit(fr,150,221,0.44,0)+
        '<text x="150" y="251" text-anchor="middle" font-family="Barlow Condensed,sans-serif" font-weight="900" font-size="23" letter-spacing="-0.5" fill="#0A0F1E">VOLT<tspan fill="'+a+'">.</tspan></text>'+
        '<rect x="126" y="259" width="48" height="3.5" rx="1.75" fill="'+a+'"/>'+
        '<text x="150" y="278" text-anchor="middle" font-family="Barlow Condensed,sans-serif" font-weight="800" font-size="13" letter-spacing="0.4" fill="'+a+'" textLength="80" lengthAdjust="spacingAndGlyphs">'+nom+'</text>'+
        fruit(fr,232,150,1.15,10)+
        fruit(fr,226,356,1.0,16)+
      '</svg>'+
    '</div>';
  }
  var step = 0;
  var answers = [];
  var order = ["performance","antioxidant","immune","reload"];

  function progress(){
    var pct = Math.round((step/QUESTIONS.length)*100);
    return '<div class="qz-prog"><div class="qz-prog-bar"><i style="width:'+pct+'%"></i></div>'+
           '<div class="qz-prog-lbl">'+(step<QUESTIONS.length?('Question '+(step+1)+' / '+QUESTIONS.length):'Résultat')+'</div></div>';
  }

  function renderQuestion(){
    var Q = QUESTIONS[step];
    var opts = Q.opts.map(function(o,i){
      return '<button class="qz-opt" data-p="'+o.p+'" style="--d:'+(i*0.05)+'s">'+
        '<span class="qz-emo">'+o.e+'</span><span class="qz-opt-t">'+o.t+'</span>'+
        '<span class="qz-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>'+
      '</button>';
    }).join('');
    root.innerHTML =
      progress()+
      '<div class="qz-card" key="'+step+'">'+
        '<div class="qz-step">0'+(step+1)+'</div>'+
        '<h2 class="qz-q">'+Q.q+'</h2>'+
        '<div class="qz-opts">'+opts+'</div>'+
        (step>0?'<button class="qz-back">← Précédent</button>':'')+
      '</div>';
    root.querySelectorAll('.qz-opt').forEach(function(btn){
      btn.addEventListener('click', function(){
        answers[step] = btn.getAttribute('data-p');
        root.querySelectorAll('.qz-opt').forEach(function(b){b.classList.remove('on')});
        btn.classList.add('on');
        setTimeout(function(){ step++; (step<QUESTIONS.length)?renderQuestion():renderResult(); window.scrollTo({top:0,behavior:'smooth'}); }, 260);
      });
    });
    var back = root.querySelector('.qz-back');
    if(back) back.addEventListener('click', function(){ step--; renderQuestion(); });
  }

  function compute(){
    var score = {performance:0,antioxidant:0,immune:0,reload:0};
    answers.forEach(function(p,i){ if(p) score[p]+= QUESTIONS[i].w; });
    var best=order[0];
    order.forEach(function(k){ if(score[k]>score[best]) best=k; });
    return best;
  }

  function renderResult(){
    var key = compute();
    var p = PRODUITS[key];
    try{ localStorage.setItem('volt_test', key); }catch(e){}
    var tags = p.tags.map(function(t){return '<span class="rs-tag">'+t+'</span>';}).join('');
    root.innerHTML =
      progress()+
      '<div class="qz-result" style="--acc:'+p.accent+'">'+
        '<div class="rs-media"><div class="rs-strip"></div>'+voltCan(p,360)+'<div class="rs-arome">'+p.arome+'</div></div>'+
        '<div class="rs-body">'+
          '<div class="rs-eyebrow">⚡ Ton match VOLT.</div>'+
          '<h2 class="rs-name">VOLT. <em>'+p.nom+'</em></h2>'+
          '<p class="rs-desc">'+p.desc+'</p>'+
          '<div class="rs-tags">'+tags+'</div>'+
          '<div class="rs-actions">'+
            '<a href="saveurs.html#'+key+'" class="btn-primary">Voir la fiche produit →</a>'+
            '<a href="index.html#pricing" class="btn-outline">S\'abonner</a>'+
          '</div>'+
          '<button class="rs-redo">↻ Refaire le test</button>'+
        '</div>'+
      '</div>';
    var redo = root.querySelector('.rs-redo');
    if(redo) redo.addEventListener('click', function(){ step=0; answers=[]; renderQuestion(); window.scrollTo({top:0,behavior:'smooth'}); });
  }

  renderQuestion();
})();