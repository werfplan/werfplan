/* WerfPlan: offline beschikbaar. Pas V aan bij een nieuwe versie van index.html zodat iedereen de update krijgt. */
const V='werfplan-v1',FILES=['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png','icon-maskable-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET'||new URL(r.url).origin!=location.origin)return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(c=>{const n=fetch(r).then(x=>{if(x&&x.ok){const cp=x.clone();caches.open(V).then(z=>z.put(r,cp))}return x}).catch(()=>c);return c||n}))});
