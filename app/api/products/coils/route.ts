import { getCoils } from "@/lib/prisma";
import { NextResponse } from "next/server";

export default async function GET() {
  try {
    if
    const data = await getCoils();
    return NextResponse.json(data);
  } catch (error) {}
}
