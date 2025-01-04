import { TOKEN_KEY } from "@/config";
import { connectDB } from "@/config/db";
import { getDataFromToken } from "@/utils/api/auth";
import { NextRequest, NextResponse } from "next/server";
import CamapignModel from "@/models/campaign.model";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(TOKEN_KEY)?.value!;

    const { id }: any = await getDataFromToken(token);

    const campaigns = await CamapignModel.find({ user: id });

    return NextResponse.json(
      {
        success: false,
        campaigns,
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
