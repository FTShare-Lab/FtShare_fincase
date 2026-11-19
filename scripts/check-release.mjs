import {execFileSync} from 'node:child_process';
import {readFile,lstat} from 'node:fs/promises';
const files=[...new Set(execFileSync('git',['ls-files','--cached','--others','--exclude-standard','-z'],{encoding:'utf8'}).split('\0').filter(Boolean))];
for(const file of files){
 let stat;try{stat=await lstat(file);}catch(e){if(e.code==='ENOENT')continue;throw e;}
 if(!stat.isFile()||stat.isSymbolicLink())throw Error('Unsupported source: '+file);
 if(file.startsWith('cases/vix/')&&file!=='cases/vix/README.md')throw Error('VIX source is not selected for this release: '+file);
 if(/(^|\/)(node_modules|dist|\.local|\.wrangler|private|releases|\.openai)(\/|$)/.test(file))throw Error('Runtime file selected: '+file);
 if(/(^|\/)(\.env(?:\..*)?|\.dev\.vars(?:\..*)?|[^/]+\.(key|pem|log))$/.test(file)&&!file.endsWith('.env.example')&&!file.endsWith('.dev.vars.example'))throw Error('Environment file selected: '+file);
 if(/\.(png|jpg|jpeg|webp)$/.test(file))continue;
 const text=await readFile(file,'utf8');
 if(/ftshare_sk_[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{50,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(text))throw Error('Credential selected: '+file);
 if(/\/Users\/[a-zA-Z0-9][^\s"']*|\/var\/folders\//.test(text))throw Error('Machine path selected: '+file);
}
console.log('Source boundary checked: '+files.length+' candidate files; VIX product entry only.');
