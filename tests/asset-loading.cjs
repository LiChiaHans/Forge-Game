const assert=require('node:assert/strict'),runtime=require('./harness.cjs'),file=__dirname+'/../.build/combined.html',base='https://game.test/Forge-Game/',absolute=url=>new URL(url,base).href;
function cacheStore(){const data=new Map();return {data,async match(url){return data.get(absolute(url))?.clone()},async put(url,response){data.set(absolute(url),response.clone())},async delete(url){return data.delete(typeof url==='string'?absolute(url):url.url)},async keys(){return [...data.keys()].map(url=>({url}))}};}
function setup(cache=cacheStore()){
 const rt=runtime(file),{c,els,run}=rt,objects=new Map(),stats={calls:0,active:0,max:0,revoked:0},title=els.get('title'),other=els.get('help');title.inert=false;other.inert=true;c.document.baseURI=base;c.document.body.children=[els.get('assetLoader'),title,other];
 c.setTimeout=setTimeout;c.clearTimeout=clearTimeout;c.AbortController=AbortController;c.URL=class extends URL{static createObjectURL(blob){const url='blob:test-'+objects.size;objects.set(url,blob);return url}static revokeObjectURL(url){objects.delete(url);stats.revoked++}};
 c.Image=class{async decode(){if(this.src.startsWith('data:'))return;const b=objects.get(this.src);if(!b||await b.text()==='corrupt')throw Error('bad image')}};
 c.caches={async open(){return cache}};c.fetch=async url=>{stats.calls++;stats.active++;stats.max=Math.max(stats.max,stats.active);await Promise.resolve();stats.active--;return new Response('valid',{headers:{'content-type':url.endsWith('.mp3')?'audio/mpeg':'image/webp'}})};
 return {...rt,cache,stats,objects,state:()=>run('gameAssetLoading')};
}
module.exports=(async()=>{
 const one=setup(),{c,els,run}=one,expected=JSON.parse(require('node:fs').readFileSync(__dirname+'/../src/assets-manifest.json')),storage=JSON.stringify([...one.storage]),game=run('JSON.stringify({day,coins,skills,bag,kitchen})');
 // All catalog media is covered, including music and optional endgame art.
 const entries=c.collectGameAssets();assert.deepEqual(Array.from(entries,e=>e.url).sort(),expected.map(e=>e.url).sort());assert.equal(entries.length,258);
 one.cache.data.set(absolute('assets/obsolete.webp'),new Response('old'));one.cache.data.set('https://game.test/unrelated.webp',new Response('leave'));
 const job=c.beginGameAssetLoading();assert.equal(els.get('title').inert,true);c.finishGameAssetLoading(false);assert.equal(one.state().active,true);c.beginGameAssetLoading();await job;
 assert.equal(one.stats.calls,258);assert.ok(one.stats.max<=6);assert.equal(one.state().complete,true);assert.equal(els.get('assetLoader').hidden,true);assert.equal(els.get('title').inert,false);assert.equal(els.get('help').inert,true);assert.equal(els.get('assetLoadProgress').value,258);
 assert.ok(one.state().entries.every(e=>e.group[e.id].startsWith('blob:')));assert.equal(one.cache.data.has(absolute('assets/obsolete.webp')),false);assert.equal(one.cache.data.has('https://game.test/unrelated.webp'),true);assert.equal(JSON.stringify([...one.storage]),storage);assert.equal(run('JSON.stringify({day,coins,skills,bag,kitchen})'),game);
 // A later visit uses persistent cache without downloading any media again.
 const cached=setup(one.cache);await cached.c.beginGameAssetLoading();assert.equal(cached.stats.calls,0);assert.equal(cached.state().complete,true);
 // Only the changed/missing content-addressed item downloads; a corrupt cached image is repaired.
 one.cache.data.delete(absolute(entries[0].url));one.cache.data.set(absolute(entries[1].url),new Response('corrupt',{headers:{'content-type':'image/webp'}}));const partial=setup(one.cache);await partial.c.beginGameAssetLoading();assert.equal(partial.stats.calls,2);assert.equal(partial.stats.revoked,1);assert.equal(partial.state().complete,true);
 // Offline startup is bounded, gives a retry choice, and never claims a complete preload.
 const offline=setup();offline.c.fetch=async()=>{offline.stats.calls++;throw Error('offline')};await offline.c.beginGameAssetLoading();assert.ok(offline.stats.calls<=12);assert.equal(offline.state().active,true);assert.equal(offline.state().complete,false);assert.equal(offline.els.get('assetLoadActions').hidden,false);assert.ok(offline.els.get('assetLoadStatus').textContent.includes('258'));
 offline.c.finishGameAssetLoading(false);assert.equal(offline.state().complete,false);assert.equal(offline.els.get('assetLoader').hidden,true);
 // Retry retains already loaded files, replacing only the failed item.
 const retry=setup(),fetch=retry.c.fetch;let failed=false;retry.c.fetch=async url=>{if(!failed){failed=true;throw Error('fixture')}return fetch(url)};await retry.c.beginGameAssetLoading();assert.equal(retry.state().loaded.size,257);assert.equal(retry.state().failed.length,1);const calls=retry.stats.calls;await retry.c.beginGameAssetLoading();assert.equal(retry.stats.calls,calls+1);assert.equal(retry.state().complete,true);
 // Private mode/quota failures fall back to in-memory blobs, without blocking the game.
 const noCache=setup();noCache.c.caches={async open(){throw Error('denied')}};await noCache.c.beginGameAssetLoading();assert.equal(noCache.state().complete,true);
 const quota=setup();quota.cache.put=async()=>{throw Error('quota')};await quota.c.beginGameAssetLoading();assert.equal(quota.state().complete,true);assert.equal(quota.state().cache,null);
 // Standalone exports already contain media: no network downloads or map replacement.
 const embedded=setup();embedded.c.collectGameAssets=()=>[{group:{x:'data:image/webp;base64,AA=='},id:'x',url:'data:image/webp;base64,AA==',audio:false},{group:{x:'data:audio/mpeg;base64,AA=='},id:'x',url:'data:audio/mpeg;base64,AA==',audio:true}];await embedded.c.beginGameAssetLoading();assert.equal(embedded.stats.calls,0);assert.equal(embedded.state().complete,true);
 console.log('PASS: complete 258-media coverage, six-worker preload/decode, local blob URLs, cache reuse/update/corruption repair, bounded offline failure, retry/optional entry, denied storage/quota fallback, standalone no-network mode and unchanged gameplay/storage.');
})();
