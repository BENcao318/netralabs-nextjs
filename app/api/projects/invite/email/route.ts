import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sendEmail } from "@/app/libs/sendinblue";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  await sendEmail();

  return NextResponse.json({});
}
