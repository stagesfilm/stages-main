import { NextRequest, NextResponse } from "next/server";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdeIMWjmED6kjqlgWCX_4unBxMotKmY0R-40jEoIXgbLjDkWg/formResponse";
const ENTRY_ID = "entry.1435793376";

export async function POST(req: NextRequest) {
  let email: string;
  try {
    const body = await req.json();
    email = (body.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    const res = await fetch(FORM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `${ENTRY_ID}=${encodeURIComponent(email)}`,
    });

    if (!res.ok) throw new Error(`Form responded ${res.status}`);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 502 });
  }
}
