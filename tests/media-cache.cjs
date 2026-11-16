const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),base='https://game.test/Forge-Game/';
module.exports=(async()=>{
 const source=fs.readFileSync(__dirname+'/../src/workers/media-cache.js','utf8');assert.equal(source,fs.readFileSync(__dirname+'/../media-cache.js','utf8'));
 const data=new Map(),events=new Map();let calls=0,skip=0,claim=0;
 const cache={async match(url){return data.get(url)?.clone()},async put(url,response){data.set(url,response.clone())},async delete(url){data.delete(url)}};
 const c={URL,Map,caches:{async open(name){assert.equal(name,'forge-master-media-v1');return cache}},self:{registration:{scope:base},addEventListener:(name,fn)=>events.set(name,fn),skipWaiting(){skip++;return Promise.resolve()},clients:{claim(){claim++;return Promise.resolve()}}},fetch:async req=>{calls++;await Promise.resolve();return new Response('media',{headers:{'content-type':'image/webp'}})}};vm.createContext(c);vm.runInContext(source,c);
 const request=new Request(base+'assets/items/ore.123456789abc.webp');assert.equal(c.isGameMediaRequest(request),true);
 for(const req of [new Request(base+'index.html'),new Request(base+'game.js?v=123'),new Request('https://api.example/leaderboard'),new Request('https://game.test/Other/assets/x.123456789abc.webp'),new Request(request.url,{method:'POST'}),new Request(request.url,{headers:{range:'bytes=0-100'}}),new Request(request.url+'?v=1')])assert.equal(c.isGameMediaRequest(req),false);
 const responses=await Promise.all([c.gameMediaResponse(request),c.gameMediaResponse(request)]);assert.equal(calls,1);assert.equal(await responses[0].text(),'media');assert.equal(await responses[1].text(),'media');await c.gameMediaResponse(request);assert.equal(calls,1);
 // A different content hash is a new file, while existing hashes stay cache-first.
 await c.gameMediaResponse(new Request(base+'assets/items/ore.abcdef123456.webp'));assert.equal(calls,2);
 data.set(request.url,new Response('<html>error</html>',{headers:{'content-type':'text/html'}}));await c.gameMediaResponse(request);assert.equal(calls,3);assert.equal(data.get(request.url).headers.get('content-type'),'image/webp');
 const missing=new Request(base+'assets/items/missing.123456789abc.webp');c.fetch=async()=>new Response('missing',{status:404});assert.equal((await c.gameMediaResponse(missing)).status,404);assert.equal(data.has(missing.url),false);
 c.caches.open=async()=>{throw Error('denied')};c.fetch=async()=>new Response('direct',{headers:{'content-type':'image/webp'}});assert.equal(await(await c.gameMediaResponse(request)).text(),'direct');
 let intercepted=false;events.get('fetch')({request:new Request(base+'game.js'),respondWith(){intercepted=true}});assert.equal(intercepted,false);events.get('fetch')({request,respondWith(){intercepted=true}});assert.equal(intercepted,true);
 events.get('install')({waitUntil(){}});events.get('activate')({waitUntil(){}});assert.equal(skip,1);assert.equal(claim,1);
 console.log('PASS: media-only cache-first worker, scoped hashes, request deduplication, changed versions, invalid/404 responses, storage denial, range bypass, immediate activation and untouched pages/code/APIs.');
})();
