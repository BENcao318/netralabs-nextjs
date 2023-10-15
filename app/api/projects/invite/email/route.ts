import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sendEmail } from "@/app/libs/aws-ses";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  console.log("123");

  sendEmail("netralabs.system@gmail.com", "Ben");

  return NextResponse.json({});
}
