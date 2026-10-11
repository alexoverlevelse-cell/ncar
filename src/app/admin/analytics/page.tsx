"use client";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { apiFetch } from "@/lib/telegram";
import { useRole } from "@/lib/use-role";
type Event = {id:string;created_at:string;telegram_id:number;first_name:string;username:string|null;session_id:string;event:string;path:string;label:string;target:string};
type Data = {events:Event[];cars:{id:string;brand:string;model:string}[];truncated:boolean};
const names:Record<string,string>={visit:"Вхід",page:"Перегляд",click:"Натискання",request_review:"Ознайомлення з умовами заявки",contact:"Перехід у Telegram"};
export default function AnalyticsPage(){
  const {role,loading}=useRole();
  const [days,setDays]=useState(7),[data,setData]=useState<Data|null>(null),[error,setError]=useState(""),[busy,setBusy]=useState(false),[query,setQuery]=useState("");
  const [exporting,setExporting]=useState(false);
  async function downloadClients(){
    setExporting(true);
    const result=await apiFetch("/api/admin/analytics",{method:"POST",body:{export:true}});
    if(!result.ok){setError(result.error);setExporting(false);return;}
    const {csv}=result.data as {csv:string};
    const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));
    const link=document.createElement("a");link.href=url;link.download=`Oleh-DK-clients-${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);setExporting(false);
  }
  useEffect(()=>{
    if(role!=="admin")return;
    let active=true;
    async function load(){setBusy(true);const r=await apiFetch("/api/admin/analytics",{method:"POST",body:{days}});if(!active)return;if(r.ok){setData(r.data as Data);setError("");}else setError(r.error);setBusy(false);}
    void load();return()=>{active=false;};
  },[role,days]);
  const events=data?.events || [];
  const people=[...new Set(events.map(e=>e.telegram_id))].map(id=>events.filter(e=>e.telegram_id===id));
  function label(e:Event){const car=data?.cars.find(c=>e.path===`/cars/${c.id}`);return car?`${car.brand} ${car.model}`:e.label || e.path;}
  function ranking(prefix:string){const counts=new Map<string,number>();events.filter(e=>e.event==="page"&&e.path.startsWith(prefix)&&e.path!==prefix.slice(0,-1)).forEach(e=>{const title=label(e);counts.set(title,(counts.get(title)||0)+1);});return [...counts].sort((a,b)=>b[1]-a[1]);}
  const card="rounded-2xl border border-white/15 bg-surface p-4";
  if(loading)return <main className="p-5">Перевіряємо доступ…</main>;
  if(role!=="admin")return <main className="p-5"><PageHeader title="Аналітика"/><p>Доступ лише адміністраторам через Telegram.</p></main>;
  return <main className="flex-1 pb-8"><PageHeader title="Аналітика" subtitle="Інтерес клієнтів та історія відвідувань"/><div className="space-y-4 px-5">
    <div className="flex gap-2">{[1,7,30,90].map(n=><button key={n} onClick={()=>setDays(n)} className={`flex-1 rounded-xl border border-white/20 py-2 text-sm ${days===n?"bg-accent font-bold":"bg-surface"}`}>{n===1?"24 год":`${n} днів`}</button>)}</div>
    <p className="text-sm">Облік починається після підключення аналітики. Відвідування Іллі враховуються, Олега — ні. Дії в адмін-панелі не записуються. Нік відображається, якщо він є у користувача.</p>
    <button type="button" disabled={exporting} onClick={downloadClients} className="w-full rounded-xl border border-white/20 bg-surface px-4 py-3 font-bold disabled:opacity-50">{exporting?"Готуємо файл…":"Завантажити базу клієнтів · CSV"}</button>
    <p className="text-xs">Усі відвідувачі за весь час збору статистики, по одному рядку на людину. Файл відкривається в Excel. Телефони у статистиці не зберігаються.</p>
    {busy&&<p role="status">Завантажуємо…</p>}{error&&<p role="alert" className={card}>{error}</p>}
    {data&&!busy&&!error&&<><div className="grid grid-cols-2 gap-3">{[["Відвідувачі",people.length],["Входи",new Set(events.map(e=>e.session_id)).size],["Перегляди",events.filter(e=>e.event==="page").length],["Натискання",events.filter(e=>["click","contact"].includes(e.event)).length],["Умови заявки",events.filter(e=>e.event==="request_review").length],["Перехід у Telegram",events.filter(e=>e.event==="contact").length]].map(([title,count])=><div className={card} key={title}><p className="text-sm">{title}</p><p className="mt-2 text-3xl font-bold">{count}</p></div>)}</div>
    {data.truncated&&<p>Показано останні 50 000 подій. Оберіть коротший період.</p>}
    {[["Популярні авто",ranking("/cars/")],["Популярні послуги",ranking("/services/")]].map(([title,rows])=><section className={card} key={title as string}><h2 className="mb-3 text-lg font-bold">{title as string}</h2>{(rows as [string,number][]).length?(rows as [string,number][]).map(([name,count])=><div key={name} className="flex justify-between gap-3 border-t border-white/10 py-2"><span>{name}</span><strong>{count}</strong></div>):<p>Поки немає переглядів.</p>}</section>)}
    <section className={card}><h2 className="text-lg font-bold">Відвідувачі</h2><input aria-label="Пошук відвідувача" placeholder="Ім’я, @нік або Telegram ID" value={query} onChange={e=>setQuery(e.target.value)} className="my-3 w-full rounded-xl border border-white/20 bg-surface-2 p-3"/>
    {people.filter(rows=>`${rows[0].first_name} ${rows[0].username||""} ${rows[0].telegram_id}`.toLowerCase().includes(query.replace(/^@/,"").toLowerCase())).map(rows=><details key={rows[0].telegram_id} className="border-t border-white/15 py-3"><summary className="cursor-pointer"><strong>{rows[0].first_name}</strong> {rows[0].username?`@${rows[0].username}`:"без ніка"}<span className="mt-1 block text-sm">{rows.length} дій · {new Date(rows[0].created_at).toLocaleString("uk-UA",{timeZone:"Europe/Copenhagen"})} · Розгорнути</span></summary><p className="mt-2 text-sm">ID: {rows[0].telegram_id}</p>{rows[0].username&&<a className="text-sky-400" href={`https://t.me/${rows[0].username}`} target="_blank" rel="noreferrer">Відкрити профіль →</a>}<ul className="mt-3 space-y-2">{rows.map(e=><li key={e.id} className="rounded-lg bg-black/20 p-2 text-sm"><strong>{names[e.event]}</strong> · {label(e)}<span className="block">{new Date(e.created_at).toLocaleString("uk-UA",{timeZone:"Europe/Copenhagen"})}</span></li>)}</ul></details>)}{!people.length&&<p>Поки немає відвідувачів.</p>}</section><p className="text-sm">Перехід у Telegram — натискання контакту, а не підтвердження відправленої заявки. Час: Данія.</p></>}
  </div></main>;
}
