
// Backend runs write only to a disposable memory overlay, including layout templates and avatar preferences.
let sandboxSession=false,sandboxEpoch=0,sandboxProfile=null;
const sandboxStorage=new Map();
const gameStorage={
 getItem(key){if(sandboxSession&&sandboxStorage.has(key))return sandboxStorage.get(key);return localStorage.getItem(key);},
 setItem(key,value){if(sandboxSession){sandboxStorage.set(key,String(value));return;}localStorage.setItem(key,String(value));},
 removeItem(key){if(sandboxSession){sandboxStorage.set(key,null);return;}localStorage.removeItem(key);}
};
function gameTimeout(fn,ms,...args){const epoch=sandboxSession?sandboxEpoch:null;return window.setTimeout(()=>{if(epoch!==null&&(!sandboxSession||epoch!==sandboxEpoch))return;fn(...args);},ms);}