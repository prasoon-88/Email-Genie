import { connectDB } from "@/config/db";
import { NextResponse } from "next/server";

connectDB();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

if (!TOKEN_SECRET) throw new Error("TOKEN_SECRET NOT IN ENV");

export async function GET() {
  try {
    const response = NextResponse.json(
      {
        message: "Logout Success",
        success: true,
      },
      {
        status: 200,
      }
    );
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as any).message,
      },
      {
        status: 500,
      }
    );
  }
}
