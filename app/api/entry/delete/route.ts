import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const {searchParams} = req.nextUrl
    const id= searchParams.get('id')!
    await prisma.entry.delete({ where: { id } });
    return NextResponse.json({ message: 'Success' },{status:200});
  } catch (error) {
    console.error("Failed to delete entry", error);
    return NextResponse.json({ error: 'Failed to delete entry' }, { status: 500 });  }
}