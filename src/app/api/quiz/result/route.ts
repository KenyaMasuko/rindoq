import { recordResultAction } from "@/lib/action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const res = await recordResultAction(data);
    const { id } = res;
    return NextResponse.json({ id });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
}
