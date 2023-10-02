import { recordResultAction } from "@/lib/action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const res = await recordResultAction(data);
  if (res.message !== "ok") throw new Error(res.message);

  return NextResponse.json({ message: "ok" });
}
