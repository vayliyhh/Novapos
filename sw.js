const CACHE='novapos-v3-2026-09-23';
const ASSETS=['./','./index.html','./manifest.json','./sw.js'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('novapos-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET') return;
 event.respondWith(fetch(event.request).then(response=>{
   const copy=response.clone(); caches.open(CACHE).then(c=>c.put(event.request,copy)); return response;
 }).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html'))));
});