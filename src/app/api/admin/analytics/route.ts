import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
export async function POST(request: Request) {
  const guard = await requireAdmin(request);
  if (!guard.ok) return guard.response;
  const body = await request.json().catch(()=>({}));
  const days = [1,7,30,90].includes(body.days) ? body.days : 7;
  const since = new Date(Date.now()-days*86400000).toISOString();
  const events = [];
  for (let offset=0;offset<50000;offset+=1000) {
    const {data,error} = await guard.supabase.from("analytics_events").select("*").gte("created_at",since).order("created_at",{ascending:false}).order("id").range(offset,offset+999);
    if(error) return NextResponse.json({error:"Аналітика недоступна. Виконайте supabase/analytics.sql у базі."},{status:503});
    events.push(...(data || []));
    if(!data || data.length<1000) break;
  }
  const {data:cars}=await guard.supabase.from("cars").select("id,brand,model");
  return NextResponse.json({events,cars:cars || [],truncated:events.length>=50000});
}
