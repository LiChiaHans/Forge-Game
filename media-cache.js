// Cache only this game's content-addressed media; never cache pages, code, APIs or saves.
const MEDIA_CACHE='forge-master-media-v1',MEDIA_PREFIX=new URL('assets/',self.registration.scope).href,mediaInFlight=new Map();
function isGameMediaRequest(request){
 const url=new URL(request.url);return request.method==='GET'&&url.href.startsWith(MEDIA_PREFIX)&&!url.search&&!request.headers.has('range')&&/\.[a-f0-9]{12}\.(webp|jpg|mp3)$/.test(url.pathname);
}
function validMediaResponse(response){return response?.ok&&/^(image\/(webp|jpeg)|audio\/(mpeg|mp3))(;|$)/i.test(response.headers.get('content-type')||'');}
async function gameMediaResponse(request){
 let cache=null;try{cache=await caches.open(MEDIA_CACHE);const hit=await cache.match(request.url);if(validMediaResponse(hit))return hit;if(hit)await cache.delete(request.url);}catch(e){}
 // Visible requests go straight to cache/network, independent of the paced background queue.
 let job=mediaInFlight.get(request.url);
 if(!job){job=(async()=>{const response=await fetch(request);if(cache&&validMediaResponse(response))try{await cache.put(request.url,response.clone());}catch(e){}return response;})();mediaInFlight.set(request.url,job);}
 try{return (await job).clone();}finally{if(mediaInFlight.get(request.url)===job)mediaInFlight.delete(request.url);}
}
self.addEventListener('install',event=>event.waitUntil(self.skipWaiting()));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{if(isGameMediaRequest(event.request))event.respondWith(gameMediaResponse(event.request));});
