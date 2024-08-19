import { NextRequest, NextResponse } from "next/server";
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();
//create User
export async  function POST(req: NextRequest): Promise<Response> {
    try {
        const data = await req.json();
        const { name, email, password } = data;
        if (!name || !email || !password) throw new Error("Missing fields" );
        if (!prisma) throw new Error("Database not connected");
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
            },
        });
        if (!user) throw new Error("User not created");

        return NextResponse.json({ message: "Hello" });
    } catch (error: any) {
        return NextResponse.json(error.message, { status: 500 });
    }
}

