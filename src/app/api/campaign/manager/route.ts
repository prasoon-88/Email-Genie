import { TOKEN_KEY } from "@/config";
import { connectDB } from "@/config/db";
import { getDataFromToken } from "@/utils/api/auth";
import { NextRequest, NextResponse } from "next/server";
import CamapignModel from "@/models/campaign.model";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(TOKEN_KEY)?.value!;
    const body = await request.json();

    const { page = 1, limit = 10 } = body ?? {};

    const skip = (page - 1) * limit;

    const { id }: any = await getDataFromToken(token);

    const total = await CamapignModel.countDocuments({ user: id });

    const campaigns = await CamapignModel.find({ user: id })
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    return NextResponse.json(
      {
        success: false,
        campaigns,
        total,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
