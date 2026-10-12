const CACHE='stock-analyst-v2';
const CORE=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./icon-maskable-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  // Live market data: always network, never cached
  if(/yahoo|nseindia|bseindia/.test(url.hostname))return;
  // Excel reader library: cache after first load
  if(url.hostname==='cdn.jsdelivr.net'){
    e.respondWith(caches.open(CACHE).then(c=>c.match(req).then(h=>h||fetch(req).then(r=>{if(r.ok)c.put(req,r.clone());return r;}))));
    return;
  }
  if(url.origin!==location.origin)return;
  // App files: network first, fall back to cache when offline
  e.respondWith(fetch(req).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(req,cp));return r;}).catch(()=>caches.match(req).then(h=>h||caches.match('./index.html'))));
});
