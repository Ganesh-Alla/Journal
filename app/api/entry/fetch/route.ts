import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const entries = await prisma.entry.findMany({
            orderBy: {
              createdAt: 'desc',
            },
          });
          return NextResponse.json({ message: 'Success', status: 200, entries: entries });
    } catch (error) {
      console.error("Failed to delete entry", error);
      return NextResponse.json({ error: 'Failed to delete entry' }, { status: 500 });  }
  }