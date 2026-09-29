import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export async function GET(request: Request) {
  const now = new Date();

  const dueProfiles = await prisma.checkupProfile.findMany({
    where: {
      remindersEnabled: true,
      remindAt: { lte: now },
    },
    include: { user: true },
  });

  let sentCount = 0;

  for (const profile of dueProfiles) {
    const email = profile.user.email;
    if (!email) continue;

        await resend.emails.send({
      from: "CareCompass <onboarding@resend.dev>",
      to: email,
      subject: "Your checkup reminder from CareCompass",
      html: `
      <!DOCTYPE html>
      <html>
        <body style="margin:0; padding:0; background-color:#f4f4f1; font-family: Georgia, 'Times New Roman', serif;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f1; padding: 40px 0;">
            <tr>
              <td align="center">
                <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; border:1px solid #e5e5e0;">

                  <!-- Header -->
                  <tr>
                    <td style="background-color:#0f4c4c; padding:28px 32px;">
                      <span style="color:#ffffff; font-size:22px; font-weight:bold; letter-spacing:0.3px;">CareCompass</span>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:36px 32px 8px 32px;">
                      <p style="font-size:16px; color:#1a1a1a; margin:0 0 20px 0;">
                        Hi ${profile.user.name ?? "there"},
                      </p>
                      <p style="font-size:15px; color:#333333; line-height:1.6; margin:0 0 20px 0;">
                        It's been about <strong>${profile.reminderFrequencyMonths} months</strong> since your last round of tests.
                        Regular checkups help catch small issues before they become bigger ones — and it only takes
                        a couple of minutes to see what's worth getting done this time.
                      </p>
                    </td>
                  </tr>

                  <!-- CTA button -->
                  <tr>
                    <td style="padding:8px 32px 32px 32px;" align="center">
                      <a href="https://care-compass-alpha.vercel.app"
                         style="display:inline-block; background-color:#0f4c4c; color:#ffffff; text-decoration:none;
                                padding:13px 28px; border-radius:6px; font-size:15px; font-weight:bold;">
                        Check what you need
                      </a>
                    </td>
                  </tr>

                  <!-- Divider -->
                  <tr>
                    <td style="padding:0 32px;">
                      <hr style="border:none; border-top:1px solid #e5e5e0; margin:0;" />
                    </td>
                  </tr>

                                    <!-- Footer -->
                  <tr>
                    <td style="padding:20px 32px 28px 32px;">
                      <p style="font-size:12px; color:#8a8a85; line-height:1.6; margin:0 0 8px 0;">
                        You're receiving this because you set a checkup reminder on CareCompass.
                        This is a screening aid, not a diagnosis — always confirm with a doctor.
                      </p>
                      <p style="font-size:12px; color:#8a8a85; margin:0;">
                        <a href="https://care-compass-alpha.vercel.app/unsubscribe?id=${profile.id}" style="color:#8a8a85;">
                          Turn off these reminders
                        </a>
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
      `,
    });

    await prisma.checkupProfile.update({
      where: { id: profile.id },
      data: {
        remindAt: addMonths(now, profile.reminderFrequencyMonths),
      },
    });

    sentCount++;
  }

  return NextResponse.json({ sent: sentCount });
}