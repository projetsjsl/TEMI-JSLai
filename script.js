// Script dynamique de base
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('SW enregistré:', reg))
      .catch(err => console.error('SW échec:', err));
  });
}
