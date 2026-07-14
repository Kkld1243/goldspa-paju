const hd=document.getElementById('hd');
if(hd)addEventListener('scroll',()=>hd.classList.toggle('scrolled',scrollY>50),{passive:true});
// 라이트/다크 수동 토글 (기본값: 시스템 따라감, 선택 시 localStorage 저장)
(function(){var KEY='goldspa-theme';
var saved=null;try{saved=localStorage.getItem(KEY);}catch(e){}
if(saved==='light'||saved==='dark')document.documentElement.setAttribute('data-theme',saved);
document.querySelectorAll('.themetoggle').forEach(function(btn){
  btn.addEventListener('click',function(){
    var cur=document.documentElement.getAttribute('data-theme');
    if(!cur)cur=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';
    var next=cur==='dark'?'light':'dark';
    document.documentElement.setAttribute('data-theme',next);
    try{localStorage.setItem(KEY,next);}catch(e){}
  });
});})();
(function(){var tg=document.querySelector('.navtoggle'),mm=document.getElementById('mmenu');if(!tg||!mm)return;
function set(o){tg.classList.toggle('open',o);mm.classList.toggle('open',o);tg.setAttribute('aria-expanded',o);tg.setAttribute('aria-label',o?'메뉴 닫기':'메뉴 열기');document.body.style.overflow=o?'hidden':'';}
tg.addEventListener('click',function(){set(!mm.classList.contains('open'));});
mm.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){set(false);});});
var mmClose=mm.querySelector('.mmenu-close');if(mmClose)mmClose.addEventListener('click',function(){set(false);});
addEventListener('keydown',function(e){if(e.key==='Escape')set(false);});})();
// stagger groups: give siblings in a grid a small incremental delay (Emil: 30-80ms)
document.querySelectorAll('.fac-grid,.spec,.trust .band,.quotes,.figrow,.matrow,.gallery-cols').forEach(g=>{
  [...g.children].forEach((el,i)=>{el.style.transitionDelay=(i*55)+'ms'});
});
const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('.rise,.unveil').forEach(el=>io.observe(el));
(function(){
  const IMG={"hero":"images/p005.jpg","emotion":"images/p046.jpg","hygiene":"images/p048.jpg"}; const order=[];
  function setbg(el,key){
    if(!el||!key||!IMG[key])return;
    el.style.backgroundImage="url('"+IMG[key]+"')";
    el.style.backgroundSize="cover";el.style.backgroundPosition="center";el.style.backgroundColor="#eee";
    const p=el.querySelector(".plabel"); if(p)p.style.display="none";
    el.classList.add("in"); const u=el.closest(".unveil"); if(u)u.classList.add("in");
  }
  (function heroSlides(){
    var media=document.querySelector(".hero-media"); if(!media)return;
    var srcs=["images/p005.jpg","images/pajugold_032.jpg","images/pajugold_045.jpg"];
    var pl=media.querySelector(".plabel"); if(pl)pl.style.display="none";
    var slides=srcs.map(function(src,i){
      var d=document.createElement("div"); d.className="hero-slide"+(i===0?" on":"");
      d.style.backgroundImage="url('"+src+"')"; media.insertBefore(d,media.firstChild); return d;
    });
    media.classList.add("in"); var u=media.closest(".unveil"); if(u)u.classList.add("in");
    var bars=[].slice.call(document.querySelectorAll(".hero-prog .hp-bar"));
    var cur=0,timer=null,DUR=5000;
    function paint(){
      slides.forEach(function(s,i){s.classList.toggle("on",i===cur);});
      bars.forEach(function(b,i){
        b.classList.remove("active","done");
        if(i<cur)b.classList.add("done");
        else if(i===cur){void b.offsetWidth; b.classList.add("active");}
      });
    }
    function go(n){cur=(n+slides.length)%slides.length; paint();}
    function start(){ if(timer)clearInterval(timer);
      timer=setInterval(function(){go(cur+1);},DUR); }
    bars.forEach(function(b,i){b.addEventListener("click",function(){go(i);start();});});
    if(slides.length<2){paint();return;}
    paint(); start();
  })();
  setbg(document.querySelector(".emotion"),"emotion");
  document.querySelectorAll(".shot").forEach((el,i)=>setbg(el,order[i]));
})();
(function(){var t=document.querySelector('.foods-track');if(!t)return;
var prev=document.querySelector('.fprev'),next=document.querySelector('.fnext'),dotsWrap=document.querySelector('.foods-nav .dots');
var items=t.querySelectorAll('.food-tile');
function step(){var a=items[0].getBoundingClientRect(),b=items[1]?items[1].getBoundingClientRect():a;return (b.left-a.left)||a.width;}
function pages(){var st=step();return Math.max(1,Math.round((t.scrollWidth-t.clientWidth)/st)+1);}
function idx(){return Math.round(t.scrollLeft/step());}
function build(){dotsWrap.innerHTML='';for(var i=0;i<pages();i++)dotsWrap.appendChild(document.createElement('i'));sync();}
function sync(){var cur=idx(),ds=dotsWrap.children;for(var i=0;i<ds.length;i++)ds[i].classList.toggle('on',i===cur);
var max=t.scrollWidth-t.clientWidth-2;prev.disabled=t.scrollLeft<=2;next.disabled=t.scrollLeft>=max;}
function go(d){var max=t.scrollWidth-t.clientWidth-2;if(d>0&&t.scrollLeft>=max){t.scrollTo({left:0,behavior:'smooth'});}else{t.scrollBy({left:d*step(),behavior:'smooth'});}}
prev.onclick=function(){go(-1);hold();};
next.onclick=function(){go(1);hold();};
var timer=null,paused=false;
function hold(){if(timer)clearInterval(timer);timer=setInterval(function(){if(!paused)go(1);},3200);}
hold();
var wrap=t.closest('.foods-carousel');
wrap.addEventListener('mouseenter',function(){paused=true;});
wrap.addEventListener('mouseleave',function(){paused=false;});
t.addEventListener('scroll',sync,{passive:true});window.addEventListener('resize',build);build();})();
(function(){var b=document.getElementById('galMore');if(!b)return;
b.addEventListener('click',function(){
  var m=document.querySelector('.mosaic');var ex=m.classList.toggle('expanded');
  m.querySelectorAll('.mtile.more').forEach(function(t){t.classList.add('in')});
  b.textContent=ex?'접기':'갤러리 더보기';
});})();
(function(){var t=document.querySelector('.hy-track');if(!t)return;
var p=document.querySelector('.hprev'),n=document.querySelector('.hnext');
if(p)p.addEventListener('click',function(){t.scrollBy({left:-t.clientWidth*0.7,behavior:'smooth'})});
if(n)n.addEventListener('click',function(){t.scrollBy({left:t.clientWidth*0.7,behavior:'smooth'})});})();
(function(){var s=document.getElementById('splash');if(!s)return;
document.documentElement.style.overflow='hidden';
function done(){if(s.classList.contains('done'))return;s.classList.add('done');document.documentElement.style.overflow='';}
setTimeout(done,2900);
})();
(function(){var t=document.querySelector('.gal-track');if(!t)return;
function step(d){var it=t.querySelector('.gal-item');var w=it?it.getBoundingClientRect().width+16:t.clientWidth*0.8;t.scrollBy({left:d*w,behavior:'smooth'});}
var p=document.querySelector('.gprev'),n=document.querySelector('.gnext');
if(p)p.addEventListener('click',function(){step(-1)});
if(n)n.addEventListener('click',function(){step(1)});})();
