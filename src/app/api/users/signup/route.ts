import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import User from "@/models/user.model";
import { sendVerificationEmail } from "./helper";

connectDB(); // Ensure the database connection is established

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Create and save new user
    const newUser = new User(reqBody);
    const savedUser = await newUser.save();

    // Send verification email
    const success = await sendVerificationEmail(savedUser?._id);
    if (!success) {
      return NextResponse.json(
        { error: "Failed to send verification email" },
        { status: 500 }
      );
    }

    // Respond with success message
    return NextResponse.json(
      {
        email,
        message: "User Registered Successfully! Please verify your email.",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/users/signup:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: (error as any).message || error,
      },
      { status: 500 }
    );
  }
}
