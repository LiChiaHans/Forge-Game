const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),hash=s=>crypto.createHash('sha256').update(s).digest('hex');
function write(p,s){const f=path.join(root,p);fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,s);}
function load(){
 const order=JSON.parse(read('src/build-order.json'));assert.equal(order.version,1);
 for(const [kind,files]of Object.entries({scripts:order.scripts,styles:order.styles})){assert.ok(files.length);assert.equal(new Set(files).size,files.length,'Duplicate '+kind);for(const p of files)assert.ok(/^src\/(js|styles)\/[\w/.-]+$/.test(p)&&!p.includes('..'),'Invalid source path '+p);}
 const js=order.scripts.map(read).join(''),css=order.styles.map(read).join(''),template=read('src/index.template.html');new vm.Script(js,{filename:'game.js'});
 for(const token of ['<!-- GAME_STYLES -->','<!-- GAME_SCRIPT -->'])assert.equal(template.split(token).length,2,token);
 return {order,js,css,template};
}
function build(){
 const {order,js,css,template}=load(),jsHash=hash(js),cssHash=hash(css);
 for(const file of order.workers||[]){assert.ok(/^src\/workers\/[\w-]+\.js$/.test(file));const worker=read(file);new vm.Script(worker,{filename:file});write(path.basename(file),worker);}
 const html=template.replace('<!-- GAME_STYLES -->','<link rel="stylesheet" href="game.css?v='+cssHash.slice(0,16)+'">').replace('<!-- GAME_SCRIPT -->','<script src="game.js?v='+jsHash.slice(0,16)+'"></script>');
 write('game.js',js);write('game.css',css);write('index.html',html);
 // Local regression harness consumes one inline HTML; no embedded pictures or music.
 write('.build/combined.html',template.replace('<!-- GAME_STYLES -->',()=>'<style>'+css+'</style>').replace('<!-- GAME_SCRIPT -->',()=>'<script>'+js+'</script>'));
 const index=['name\tfile\tline'];for(const file of order.scripts){const source=read(file);for(const m of source.matchAll(/^(?:async )?function\s+(\w+)\s*\(/gm))index.push(m[1]+'\t'+file+'\t'+((source.slice(0,m.index).match(/\n/g)||[]).length+1));}
 write('docs/function-index.tsv',index.join('\n')+'\n');
 const report={htmlBytes:Buffer.byteLength(html),javascriptBytes:Buffer.byteLength(js),cssBytes:Buffer.byteLength(css),javascriptSha256:jsHash,stylesSha256:cssHash,scriptFiles:order.scripts.length,styleFiles:order.styles.length};write('.build/report.json',JSON.stringify(report,null,2)+'\n');return report;
}
if(require.main===module)console.log(JSON.stringify(build()));module.exports={root,read,write,hash,load,build};
