import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { clientsCsv, type ClientEvent } from "@/lib/client-export";
export async function POST(request: Request) {
  const guard = await requireAdmin(request);
  if (!guard.ok) return guard.response;
  const body = await request.json().catch(()=>({}));
  const exporting = body?.export === true;
  const days = [1,7,30,90].includes(body?.days) ? body.days : 7;
  const since = new Date(Date.now()-days*86400000).toISOString();
  const events = [];
  for (let offset=0;offset<50000;offset+=1000) {
    let query = guard.supabase.from("analytics_events").select("*").order("created_at",{ascending:false}).order("id").range(offset,offset+999);
    if (!exporting) query = query.gte("created_at",since);
    const {data,error} = await query;
    if(error) return NextResponse.json({error:"Аналітика недоступна. Виконайте supabase/analytics.sql у базі."},{status:503});
    events.push(...(data || []));
    if(!data || data.length<1000) break;
  }
  if (exporting && events.length >= 50000) return NextResponse.json({error:"База завелика для цього експорту. Потрібен окремий повний експорт; неповний файл не створено."},{status:422});
  const {data:cars}=await guard.supabase.from("cars").select("id,brand,model");
  if (exporting && !cars) return NextResponse.json({error:"Не вдалося завантажити назви автомобілів."},{status:503});
  if (exporting) return NextResponse.json({csv:clientsCsv(events as ClientEvent[],cars || [])}, {headers:{"Cache-Control":"no-store"}});
  return NextResponse.json({events,cars:cars || [],truncated:events.length>=50000}, {headers:{"Cache-Control":"no-store"}});
}
