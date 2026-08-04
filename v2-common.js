(function(){
  // reveal-on-scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:0.15});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // nav current-page highlight
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-inner a').forEach(function(a){
    if(a.getAttribute('href') === path){
      a.classList.add('current');
    }
  });

  // copy email buttons (footer + hero, any element with this class)
  document.querySelectorAll('.copy-email-btn').forEach(function(copyBtn){
    copyBtn.addEventListener('click', function(){
      navigator.clipboard.writeText('debss@umich.edu').then(function(){
        var orig = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(function(){ copyBtn.textContent = orig; }, 1600);
      });
    });
  });

  // case-study scroll-spy sidebar
  var spyLinks = document.querySelectorAll('.cs-spy a');
  if(spyLinks.length){
    var sections = Array.prototype.map.call(spyLinks, function(a){
      return document.querySelector(a.getAttribute('href'));
    }).filter(Boolean);
    var spyIo = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          spyLinks.forEach(function(a){ a.classList.remove('active'); });
          var match = document.querySelector('.cs-spy a[href="#' + entry.target.id + '"]');
          if(match){ match.classList.add('active'); }
        }
      });
    }, {rootMargin:'-20% 0px -70% 0px'});
    sections.forEach(function(s){ spyIo.observe(s); });
  }

  // robust hash-anchor scrolling — browsers can silently fail to jump to a
  // fragment on a fresh page load when scroll-behavior:smooth is set, so we
  // do it ourselves once the page has fully settled.
  function jumpToHash(){
    if(!location.hash) return;
    var target;
    try{ target = document.querySelector(location.hash); }catch(e){ return; }
    if(target){ target.scrollIntoView({behavior:'smooth', block:'start'}); }
  }
  if(document.readyState === 'complete'){
    setTimeout(jumpToHash, 30);
  } else {
    window.addEventListener('load', function(){ setTimeout(jumpToHash, 30); });
  }
  window.addEventListener('hashchange', jumpToHash);
})();
