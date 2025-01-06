import { connectDB } from "@/config/db";
import { getURLSearchParams } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";
import ProspectModel from "@/models/prospects.model";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const searchParams = getURLSearchParams(request.url);
    const campaignId = searchParams.get("campaignId");

    if (!campaignId) {
      return NextResponse.json(
        {
          success: false,
          message: "Camapign Id is required",
        },
        {
          status: 400,
        }
      );
    }

    const prospects = await ProspectModel.find({ campaign: campaignId });

    if (!prospects) {
      return NextResponse.json(
        {
          message: "prospects Not Found",
          error: true,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        prospects: prospects ?? [],
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
      { status: 200 }
    );
  }
}
