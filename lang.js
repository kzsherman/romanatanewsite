function applyLangClass(el, lang){
  if(!el) return;
  var classes = el.className.split(/\s+/).filter(function(c){
    return c && !/^lang-(en|ru)$/.test(c);
  });
  classes.push('lang-' + lang);
  el.className = classes.join(' ');
}

function setLang(lang){
  applyLangClass(document.documentElement, lang);
  applyLangClass(document.body, lang);
  document.documentElement.lang = lang;
  var btns = document.querySelectorAll('.lang-switch button');
  for(var i=0;i<btns.length;i++){
    btns[i].classList.toggle('active', btns[i].getAttribute('data-lang') === lang);
  }
  try{ localStorage.setItem('romanata-lang', lang); }catch(e){}
}

(function(){
  try{
    var saved = localStorage.getItem('romanata-lang');
    if(saved === 'ru') setLang('ru');
  }catch(e){}
})();

/* ---- mobile hamburger menu ---- */
function setMobileMenu(open){
  document.body.classList.toggle('menu-open', open);
  var btn = document.getElementById('nav-toggle');
  if(btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

function toggleMobileMenu(){
  setMobileMenu(!document.body.classList.contains('menu-open'));
}

function closeMobileMenu(){
  setMobileMenu(false);
}

document.addEventListener('keydown', function(e){
  if(e.key === 'Escape') closeMobileMenu();
});

document.addEventListener('DOMContentLoaded', function(){
  var logos = document.querySelectorAll('.logo span');
  for(var l=0;l<logos.length;l++) if(logos[l].textContent.trim() === '.') logos[l].remove();
  var languageMenu = document.querySelector('.dropdown-menu');
  if(languageMenu && !languageMenu.querySelector('[href="french.html"]')){
    var addedLanguages = [['french.html','🇫🇷','French','Французский'],['czech.html','🇨🇿','Czech','Чешский'],['turkish.html','🇹🇷','Turkish','Турецкий']];
    for(var a=0;a<addedLanguages.length;a++){
      var languageLink = document.createElement('a'); languageLink.href = addedLanguages[a][0];
      languageLink.innerHTML = '<span class="flag">' + addedLanguages[a][1] + '</span><span class="en">' + addedLanguages[a][2] + '</span><span class="ru">' + addedLanguages[a][3] + '</span>';
      languageMenu.appendChild(languageLink);
    }
  }
  var nav = document.querySelector('.nav-links');
  if(nav && !nav.querySelector('[href="study-abroad.html"]')){
    var studyNav = document.createElement('a');
    studyNav.href = 'study-abroad.html';
    studyNav.innerHTML = '<span class="en">Study Abroad</span><span class="ru">Учёба за рубежом</span>';
    nav.appendChild(studyNav);
  }
  if(!document.querySelector('.mobile-menu')){
    var right = document.querySelector('.nav-right');
    if(right){
      var toggle = document.createElement('button');
      toggle.className = 'nav-toggle'; toggle.id = 'nav-toggle'; toggle.type = 'button';
      toggle.setAttribute('aria-label', 'Menu'); toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('onclick', 'toggleMobileMenu()'); toggle.innerHTML = '<span></span><span></span><span></span>';
      right.appendChild(toggle);
      var overlay = document.createElement('div'); overlay.className = 'mobile-menu-overlay'; overlay.setAttribute('onclick', 'closeMobileMenu()'); document.body.appendChild(overlay);
      var menu = document.createElement('div'); menu.className = 'mobile-menu';
      menu.innerHTML = '<div class="mobile-menu-head"><span class="logo">ROMANATA<span>.</span></span><button class="mobile-menu-close" onclick="closeMobileMenu()" aria-label="Close menu">&times;</button></div><nav><a class="mm-link" href="index.html"><span class="en">Home</span><span class="ru">Главная</span></a><a class="mm-link" href="teachers.html"><span class="en">Teachers</span><span class="ru">Преподаватели</span></a><a class="mm-link" href="translation.html"><span class="en">Translation</span><span class="ru">Переводы</span></a><a class="mm-link" href="pricing.html"><span class="en">Pricing</span><span class="ru">Цены</span></a><a class="mm-link" href="news.html"><span class="en">News</span><span class="ru">Новости</span></a><a class="mm-link" href="/blog"><span class="en">Blog</span><span class="ru">Блог</span></a><a class="mm-link" href="videos.html"><span class="en">Videos</span><span class="ru">Видео</span></a><a class="mm-link" href="study-abroad.html"><span class="en">Study Abroad</span><span class="ru">Учёба за рубежом</span></a></nav>';
      document.body.appendChild(menu);
    }
  }
  var mobileNav = document.querySelector('.mobile-menu nav');
  if(mobileNav){
    var extraPages = [
      ['english.html','English','Английский'],['german.html','German','Немецкий'],['italian.html','Italian','Итальянский'],['japanese.html','Japanese','Японский'],
      ['chinese.html','Chinese','Китайский'],['korean.html','Korean','Корейский'],['russian.html','Russian for Foreigners','Русский для иностранцев'],['arabic.html','Arabic','Арабский'],['french.html','French','Французский'],['czech.html','Czech','Чешский'],['turkish.html','Turkish','Турецкий'],
      ['/blog','Blog','Блог'],['videos.html','Videos','Видео'],['study-abroad.html','Study Abroad','Учёба за рубежом'],['index.html#contact','Contact','Контакты']
    ];
    for(var p=0;p<extraPages.length;p++){
      if(!mobileNav.querySelector('[href="' + extraPages[p][0] + '"]')){
        var pageLink = document.createElement('a'); pageLink.className = 'mm-link'; pageLink.href = extraPages[p][0];
        pageLink.innerHTML = '<span class="en">' + extraPages[p][1] + '</span><span class="ru">' + extraPages[p][2] + '</span>';
        mobileNav.appendChild(pageLink);
      }
    }
  }
  var links = document.querySelectorAll('.mobile-menu .mm-link, .mobile-menu .mm-sub a, .mobile-menu .call-btn');
  for(var i=0;i<links.length;i++){
    links[i].addEventListener('click', closeMobileMenu);
  }
  var footLinks = document.querySelector('.foot-links');
  if(footLinks && !footLinks.querySelector('[href="videos.html"]')){
    var videoLink = document.createElement('a');
    videoLink.href = 'videos.html';
    videoLink.innerHTML = '<span class="en">Videos</span><span class="ru">Видео</span>';
    footLinks.insertBefore(videoLink, footLinks.firstChild);
  }
  if(footLinks && !footLinks.querySelector('[href="study-abroad.html"]')){
    var studyLink = document.createElement('a');
    studyLink.href = 'study-abroad.html';
    studyLink.innerHTML = '<span class="en">Study Abroad</span><span class="ru">Учёба за рубежом</span>';
    footLinks.insertBefore(studyLink, footLinks.firstChild);
  }
  var footerRow = document.querySelector('.foot-row');
  if(footerRow && !footerRow.querySelector('.social-links')){
    var social = document.createElement('div');
    social.className = 'social-links';
    social.innerHTML = '<a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5.25-3.4a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1Z"/></svg></a><a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.6 5.2a5.8 5.8 0 0 0 3.4 1.1V9a8.5 8.5 0 0 1-3.4-.7v6.1a6.1 6.1 0 1 1-5.3-6v2.8a3.4 3.4 0 1 0 2.5 3.3V2h2.8c0 1.2.4 2.3 1 3.2Z"/></svg></a>';
    footerRow.appendChild(social);
  }
  var carousel = document.getElementById('academy-carousel');
  if(carousel){
    var track = carousel.querySelector('.carousel-track'), slides = carousel.querySelectorAll('.carousel-slide'), dots = carousel.querySelectorAll('.carousel-dot'), current = 0;
    function showSlide(index){ current = (index + slides.length) % slides.length; track.style.transform = 'translateX(-' + (current * 100) + '%)'; for(var d=0;d<dots.length;d++) dots[d].classList.toggle('active', d === current); }
    carousel.querySelector('.prev').addEventListener('click', function(){ showSlide(current - 1); });
    carousel.querySelector('.next').addEventListener('click', function(){ showSlide(current + 1); });
    for(var c=0;c<dots.length;c++) (function(index){ dots[index].addEventListener('click', function(){ showSlide(index); }); })(c);
    setInterval(function(){ showSlide(current + 1); }, 6000);
  }
});
