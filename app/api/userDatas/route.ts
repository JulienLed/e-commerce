import { NextResponse } from "next/server";
import { getUserDatas } from "@/lib/prisma";

export const POST = async (req: Request) => {
  try {
    const { userID } = await req.json();
    const userDatas = await getUserDatas(userID);
    return NextResponse.json(userDatas);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
};
