import { getCigarettes } from "@/lib/prisma";
import { NextResponse } from "next/server";

export default async function GET() {
  try {
    const data = await getCigarettes();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
