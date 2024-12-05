// service-worker.js

// Evento de instalação
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
          // Adicione outros arquivos que deseja armazenar em cache
            ]);
        })
    );
});
  
  // Evento de ativação
  self.addEventListener('activate', (event) => {
    // Limpe caches antigos, se necessário
  });
  
  // Intercepte as requisições e retorne do cache, se disponível
  self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
  
