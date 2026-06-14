/* VOLT. — comportements partagés (nav, menu mobile, reveal au scroll) */
(function(){
  // Nav scroll shadow
  var nav = document.getElementById('nav');
  if(nav){
    window.addEventListener('scroll', function(){
      nav.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive:true });
  }
  // Menu mobile
  var ham = document.getElementById('hamburger');
  var links = document.getElementById('navLinks');
  if(ham && links){
    ham.addEventListener('click', function(){ links.classList.toggle('open'); });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ links.classList.remove('open'); });
    });
  }
  // Reveal au scroll
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold:.1, rootMargin:'0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(function(el){ obs.observe(el); });
  // Effets tactiles (cartes)
  document.querySelectorAll('.step, .ben, .flav').forEach(function(el){
    el.addEventListener('touchstart', function(){ el.classList.add('touched'); }, { passive:true });
    el.addEventListener('touchend', function(){ setTimeout(function(){ el.classList.remove('touched'); }, 300); }, { passive:true });
  });
})();