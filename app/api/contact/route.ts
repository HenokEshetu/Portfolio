import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  // TODO: Replace this with your real email sending logic (e.g., Resend, Nodemailer, EmailJS, etc.)
  // Example: Use Resend (https://resend.com/) or any transactional email API
  // For demonstration, we'll just log and return success
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Simulate sending email (replace with real implementation)
  console.log("Contact form submission:", { name, email, message });

  // Example: await resend.emails.send({ ... })

  return NextResponse.json({ success: true });
}
