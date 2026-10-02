import { writeFile, mkdir } from 'node:fs/promises';
const url='https://choujiang-radar.catdontbiteme.chatgpt.site/api/giveaways';
const response=await fetch(url,{signal:AbortSignal.timeout(30000)});
if(!response.ok)throw new Error(`Public catalog returned ${response.status}`);
const rows=await response.json();
if(!Array.isArray(rows)||!rows.length)throw new Error('Public catalog is empty or invalid');
const keys=['slug','title','organizer','organizerType','region','prize','action','requiresPurchase','costNote','nextDeadline','nextDeadlineLabel','sourceUrl','sourceType','verifiedAt','warning'];
const items=rows.map(row=>{
 const item=Object.fromEntries(keys.filter(k=>row[k]!==undefined).map(k=>[k,row[k]]));
 if(!/^[a-z0-9-]+$/.test(item.slug)||typeof item.title!=='string'||!Number.isFinite(Date.parse(item.nextDeadline)))throw new Error('Invalid public activity');
 const source=new URL(item.sourceUrl);if(source.protocol!=='https:'||source.username||source.password)throw new Error('Unsafe public source');
 item.eligibility=Array.isArray(row.eligibility)?row.eligibility.filter(x=>typeof x==='string'):[];
 item.milestones=(row.milestones||[]).map(({type,date,note})=>({type,date,note}));
 item.prizes=(row.prizes||[]).map(({name,category,quantity,valueTwd,note})=>Object.fromEntries(Object.entries({name,category,quantity,valueTwd,note}).filter(([,v])=>v!==undefined)));
 return item;
});
await mkdir(new URL('./public/',import.meta.url),{recursive:true});
await writeFile(new URL('./public/catalog.json',import.meta.url),JSON.stringify({exportedAt:new Date().toISOString(),items}));
console.log(`Exported ${items.length} public activities; no account or database fields.`);
