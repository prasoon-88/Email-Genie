import { connectDB } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "@/config";
import { TokenPayload } from "@/types/auth";

connectDB();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

if (!TOKEN_SECRET) throw new Error("TOKEN_SECRET NOT IN ENV");

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "email and password is mandetory" },
        { status: 400 }
      );
    }

    const validPassword = await user.comparePassword(password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "email and password is mandetory" },
        { status: 400 }
      );
    }

    const tokenData: TokenPayload = {
      id: user._id,
      email,
    };

    const token = jwt.sign(tokenData, TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Logged in success",
      success: true,
    });

    response.cookies.set(TOKEN_KEY, token, {
      httpOnly: true,
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
