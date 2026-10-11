import { NextResponse } from "next/server";
import { verifyTelegramInitData } from "@/lib/telegram-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
export async function POST(request: Request) {
  let user;
  try { user = verifyTelegramInitData(request.headers.get("x-telegram-init-data") || ""); }
  catch { return NextResponse.json({}, { status: 503 }); }
  if (!user) return NextResponse.json({}, { status: 401 });
  const b = await request.json().catch(() => null);
  if (!b || !["visit","page","click","request_review","contact"].includes(b.event)
    || typeof b.path !== "string" || !/^\/[a-zA-Z0-9/_-]*$/.test(b.path)
    || typeof b.session !== "string" || !/^[0-9a-f-]{36}$/.test(b.session)) return NextResponse.json({}, {status:400});
  // Ілля requested that his visits count; exclude other admins and admin pages.
  const excludedAdmin = user.id !== 580108182 && (process.env.ADMIN_TELEGRAM_IDS || "").split(",").map(v=>v.trim()).includes(String(user.id));
  if (b.path.startsWith("/admin") || excludedAdmin) return NextResponse.json({ok:true});
  const db = getSupabaseAdmin();
  if (!db) return NextResponse.json({}, {status:503});
  const {error} = await db.from("analytics_events").insert({telegram_id:user.id,first_name:user.first_name,username:user.username || null,session_id:b.session,event:b.event,path:b.path.slice(0,160),label:typeof b.label === "string" ? b.label.slice(0,120) : "",target:typeof b.target === "string" ? b.target.split("?")[0].slice(0,160) : ""});
  return NextResponse.json({ok:!error},{status:error?503:200});
}
