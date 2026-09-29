import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    await prisma.checkupProfile.update({
      where: { id },
      data: { remindersEnabled: false },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }
}