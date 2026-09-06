import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const profile = await prisma.checkupProfile.findUnique({
    where: { userId: session.user.id },
  });

  return NextResponse.json({ profile });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const body = await request.json();
  const reminderFrequencyMonths: number = body.reminderFrequencyMonths ?? 6;
  const markCheckupDoneNow: boolean = body.markCheckupDoneNow ?? false;
  const remindersEnabled: boolean = body.remindersEnabled ?? true;

  const now = new Date();

  // Look up the existing profile first, so that changing JUST the frequency
  // (without re-marking a checkup as done) still recalculates the reminder
  // date correctly, based on the last known checkup date.
  const existing = await prisma.checkupProfile.findUnique({
    where: { userId: session.user.id },
  });

  const lastCheckupAt = markCheckupDoneNow ? now : existing?.lastCheckupAt ?? null;
  const remindAt = lastCheckupAt ? addMonths(lastCheckupAt, reminderFrequencyMonths) : null;

  const profile = await prisma.checkupProfile.upsert({
    where: { userId: session.user.id },
    create: {
      userId: session.user.id,
      reminderFrequencyMonths,
      remindersEnabled,
      lastCheckupAt,
      remindAt,
    },
    update: {
      reminderFrequencyMonths,
      remindersEnabled,
      lastCheckupAt,
      remindAt,
    },
  });

  return NextResponse.json({ profile });
}