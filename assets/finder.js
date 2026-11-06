// FilterCrossRef size finder — client-side only, no tracking.
// Links are relative to the hub page (index.html), the only page that loads this script.
(function(){
  var SHIPPED = {"16x25x1":"sizes/16x25x1/index.html","20x25x1":"sizes/20x25x1/index.html"};
  var PLANNED = {"16x25x5":"this week (brand actual-size table)"};
  var f=document.getElementById('finder'); if(!f) return;
  var out=document.getElementById('finder-out');
  function num(v){v=String(v||'').trim();
    // accept 15.5, 15 1/2, 15-1/2, 15½ style input
    v=v.replace('½',' 1/2').replace('¼',' 1/4').replace('¾',' 3/4').replace('⅛',' 1/8').replace('⅜',' 3/8').replace('⅝',' 5/8').replace('⅞',' 7/8');
    var m=v.match(/^(\d+(?:\.\d+)?)(?:[\s-]+(\d+)\/(\d+))?$/); if(!m) return NaN;
    var n=parseFloat(m[1]); if(m[2]) n+=parseInt(m[2],10)/parseInt(m[3],10); return n;}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var mode=(f.querySelector('input[name=mode]:checked')||{}).value||'label';
    var w=num(f.w.value),l=num(f.l.value),d=num(f.d.value);
    if(!(w>0&&l>0&&d>0)){out.innerHTML='<div class="callout">Enter all three numbers (width, length, depth) in inches. Fractions like <code>15 1/2</code> work.</div>';return;}
    var a=Math.min(w,l),b=Math.max(w,l),key,msg='';
    if(mode==='label'){
      key=Math.round(a)+'x'+Math.round(b)+'x'+Math.round(d);
    } else {
      // Rule of thumb only: common 1" filters run ~1/2" under nominal on the face.
      key=Math.ceil(a-0.01)+'x'+Math.ceil(b-0.01)+'x'+Math.max(1,Math.round(d));
      msg='<p class="meta">You entered measured (actual) numbers. Rounding up gives a <em>likely</em> nominal size of <code>'+esc(key)+'</code>. This is a rule of thumb, not a guarantee — brands undercut by different amounts, and thick 4–5″ media filters often follow their cabinet maker’s part number instead. Read <a href="guides/nominal-vs-actual/index.html">nominal vs actual</a> before you order.</p>';
      if(Math.abs(a-Math.round(a))<0.13&&Math.abs(b-Math.round(b))<0.13){msg+='<p class="meta">Your numbers are within ⅛″ of whole inches. If that is the <strong>slot</strong> measurement, the nominal size is probably the whole-inch number. If it is the <strong>old filter</strong>, you may have a custom or near-nominal size.</p>';}
    }
    if(SHIPPED[key]){out.innerHTML='<div class="note"><strong>'+esc(key)+'</strong> — we have a page for this size. <a href="'+SHIPPED[key]+'">Open the '+esc(key)+' page →</a></div>'+msg;}
    else if(PLANNED[key]){out.innerHTML='<div class="card"><strong>'+esc(key)+'</strong> — page planned for '+esc(PLANNED[key])+'. Until then, use the <a href="guides/nominal-vs-actual/index.html#checklist">fit checklist</a>.</div>'+msg;}
    else {out.innerHTML='<div class="card"><strong>'+esc(key)+'</strong> — no page for this size yet. We add one useful page per night. Meanwhile, the <a href="guides/nominal-vs-actual/index.html#checklist">measure-before-you-buy checklist</a> works for any size.</div>'+msg;}
  });
})();
