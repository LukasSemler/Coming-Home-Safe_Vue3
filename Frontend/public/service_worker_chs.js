self.addEventListener('message', (event) => {
  //An den Client eine message senden!
  event.source.postMessage('Hello from the Service Worker!');
});
