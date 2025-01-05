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

    if (!campagin?.upload)
      return NextResponse.json(
        {
          success: false,
          message: "No Prospects registered Yet!",
        },
        { status: 200 }
      );

    const { rows, cols, mapping } = campagin?.upload;

    const firstRow = rows?.length ? rows[0] : null;
    return NextResponse.json(
      {
        success: true,
        upload: {
          firstRow,
          cols,
          mapping,
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
    const { campaignId, upload } = body;
    const { fileRows } = upload;

    const notFoundFields: string[] = [];

    if (!campaignId) {
      notFoundFields.push("campaignId");
    }
    if (fileRows?.length < 2) {
      notFoundFields.push("File should contain at least one row and col");
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

    const cols = fileRows[0];
    const rows = fileRows.slice(1);
    const firstRow = fileRows[1];
    await CampaignModel.findByIdAndUpdate(
      campaignId,
      {
        upload: {
          rows,
          cols,
        },
      },
      { upsert: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Prospects registerd in campaign",
        upload: {
          cols,
          firstRow,
        },
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
