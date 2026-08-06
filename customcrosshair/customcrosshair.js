/** Back-compat: prefer loader.js */
(function(){
  if (window.NxCrosshair) return;
  var s=document.createElement('script');
  s.src=(document.currentScript&&document.currentScript.src||'').replace(/[^/]+$/,'')+'loader.js';
  document.head.appendChild(s);
})();
