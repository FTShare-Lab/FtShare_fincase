import {execFileSync} from 'node:child_process';
import {readFile,stat} from 'node:fs/promises';
import {resolve,dirname,relative} from 'node:path';
const root=process.cwd();
const files=execFileSync('git',['ls-files','--cached','--others','--exclude-standard','-z'],{encoding:'utf8'}).split('\0').filter(f=>f.endsWith('.md'));
let links=0;
function anchors(text){
 const found=new Set(),counts=new Map();
 for(const line of text.split('\n')){const m=/^#{1,6}\s+(.+?)(?:\s+#+)?$/.exec(line);if(!m)continue;const title=m[1].toLowerCase().replace(/<[^>]*>/g,'').replace(/[^\p{L}\p{N}\s_-]/gu,'').trim().replace(/\s/g,'-');const n=counts.get(title)||0;counts.set(title,n+1);found.add(title+(n?'-'+n:''));}
 for(const m of text.matchAll(/\bid=["']([^"']+)["']/g))found.add(m[1]);
 return found;
}
for(const file of files){
 const text=await readFile(file,'utf8'),prose=text.replace(/^\s*```[^\n]*\n[\s\S]*?^\s*```/gm,'');
 if(/cases\/(?:etf-dashboard|vix-dashboard)\b/.test(text))throw Error('Old case path: '+file);
 if(/github\.com\/FTShare-Lab\/FtShare_fincase\/(?:tree|blob)\/main\/(?:src|docs|config|tests|data|Dockerfile|package\.json|wrangler\.jsonc)(?:[\/#)]|$)/.test(text))throw Error('Old GitHub root path: '+file);
 for(const match of prose.matchAll(/!?\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)){
  const target=match[1].replace(/^<|>$/g,'');if(/^(?:[a-z]+:|\/\/)/i.test(target))continue;
  const [path,fragment]=decodeURIComponent(target).split('#');const dest=path?resolve(dirname(resolve(root,file)),path):resolve(root,file);
  if(!dest.startsWith(root+'/')&&dest!==root)throw Error('Link leaves repository: '+file+' -> '+target);
  let info;try{info=await stat(dest);}catch{throw Error('Broken link: '+file+' -> '+target);}
  if(fragment&&info.isFile()&&dest.endsWith('.md')&&!anchors(await readFile(dest,'utf8')).has(fragment))throw Error('Broken heading link: '+file+' -> '+target);
  links++;
 }
}
for(const file of ['.github/workflows/ci.yml','cases/etf/docs/examples/cloud-test-update.yml']){
 const text=await readFile(file,'utf8');
 if(!text.includes('working-directory: cases/etf')||!text.includes('cache-dependency-path: cases/etf/package-lock.json'))throw Error('ETF workflow directory missing: '+file);
 if(/^\s+path:\s+\.local\//m.test(text))throw Error('Old workflow artifact/cache path: '+file);
}
console.log('Documentation checked: '+files.length+' Markdown files, '+links+' local links and current case workflow paths.');
