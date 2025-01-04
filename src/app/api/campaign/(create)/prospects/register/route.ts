import { TOKEN_KEY } from "@/config";
import { connectDB } from "@/config/db";
import { getDataFromToken } from "@/utils/api/auth";
import { NextRequest, NextResponse } from "next/server";
import CampaignModel from "@/models/campaign.model";
import { getURLSearchParams } from "@/utils/api";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(TOKEN_KEY)?.value!;
    const user = await getDataFromToken(token);
    const searchParams = getURLSearchParams(request.url);
    const campaignId = searchParams.get("campaignId");

    if (!user)
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );

    const notFoundFields: string[] = [];

    if (!campaignId) {
      notFoundFields.push("campaignId");
    }

    const campagin = await CampaignModel.findOne({ _id: campaignId });

    if (!campagin?.prospects)
      return NextResponse.json(
        {
          success: false,
          message: "No Prospects registered Yet!",
        },
        { status: 200 }
      );

    return NextResponse.json(
      {
        success: true,
        prospects: {
          cols: campagin.prospects.cols,
          firstRow: campagin.prospects.rows[0],
        },
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

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(TOKEN_KEY)?.value!;
    const user = await getDataFromToken(token);

    if (!user)
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );

    const body = await request.json();
    const { campaignId, prospects } = body;
    const { rows, cols } = prospects;

    const notFoundFields: string[] = [];

    if (!campaignId) {
      notFoundFields.push("campaignId");
    }
    if (!cols?.length) {
      notFoundFields.push("File should contain at least one column");
    }
    if (!rows?.length) {
      notFoundFields.push("File should contain at least one row");
    }

    if (notFoundFields?.length) {
      return NextResponse.json(
        {
          success: false,
          message: `Required Fields : ${notFoundFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    await CampaignModel.findByIdAndUpdate(
      campaignId,
      {
        prospects,
      },
      { upsert: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Prospects registerd in campaign",
      },
      { status: 201 }
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
