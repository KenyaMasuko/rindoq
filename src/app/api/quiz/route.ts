import { createQuizAction, updateQuizAction } from "@/lib/action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const res = await createQuizAction(data);
  if (res.message !== "ok") throw new Error(res.message);

  return NextResponse.json({ message: "ok", id: res.id });
}

export async function PUT(req: Request) {
  const data = await req.json();
  const res = await updateQuizAction(data);
  if (res.message !== "ok") throw new Error(res.message);

  return NextResponse.json({ message: "ok" });
}
