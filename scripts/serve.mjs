import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('out');
const port=Number(process.env.PORT||3000);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.txt':'text/plain; charset=utf-8','.svg':'image/svg+xml','.ico':'image/x-icon','.woff2':'font/woff2','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp'};
try{await stat(path.join(root,'index.html'));}catch{console.error('Production output is missing. Run npm run build first.');process.exit(1);}
const server=createServer(async(req,res)=>{
 try{
  if(!['GET','HEAD'].includes(req.method||'')){res.writeHead(405,{'Allow':'GET, HEAD'});res.end();return;}
  const pathname=decodeURIComponent(new URL(req.url||'/', 'http://localhost').pathname);
  let file=path.resolve(root,`.${pathname}`);
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end('Forbidden');return;}
  let code=200;
  try{const info=await stat(file);if(info.isDirectory())file=path.join(file,'index.html');await stat(file);}catch{file=path.join(root,'404.html');code=404;}
  const data=await readFile(file);
  res.writeHead(code,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Content-Length':data.length,'X-Content-Type-Options':'nosniff'});
  res.end(req.method==='HEAD'?undefined:data);
 }catch{res.writeHead(400);res.end('Bad request');}
});
server.on('error', error=>{console.error(`Preview server could not start: ${error.code || error.message}`);process.exit(1);});
server.listen(port,'127.0.0.1',()=>console.log(`APEX production preview: http://127.0.0.1:${port}`));
