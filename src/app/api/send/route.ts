import { RESEND_KEY } from "@/constants/const";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import EmailContent from "./test-email";

const resend = new Resend(RESEND_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "Students <onboarding@resend.dev>",
      to: ["s.aibekkz@gmail.com"],
      subject: "Жана Хабар!",
      react: EmailContent({ name, email, message }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Method GET not allowed" },
    { status: 405 }
  );
}
