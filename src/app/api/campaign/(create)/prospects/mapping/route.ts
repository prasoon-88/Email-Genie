import { connectDB } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import CampaignModel from "@/models/campaign.model";

connectDB();

const converToJSON = (mapping: string[][], rows: string[][]) => {
  const jsonDataPool: any[] = [];
  let jsonRow: any = {};

  rows.forEach((row) => {
    for (let [index, col] of mapping) {
      jsonRow[col] = row[index as any];
    }
    jsonDataPool.push(jsonRow);
    jsonRow = {};
  });
  return jsonDataPool;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mapping, campaignId } = body ?? {};

    if (!mapping || !campaignId)
      return NextResponse.json(
        {
          success: false,
          message: "Required fields are missing either mapping or campaignId",
        },
        { status: 400 }
      );

    let campaign = await CampaignModel.findById(campaignId);

    const prospects = converToJSON(mapping, campaign.upload.rows);

    campaign = await CampaignModel.findByIdAndUpdate(
      campaignId,
      {
        $set: {
          "upload.mapping": mapping,
          prospects: prospects,
        },
      },
      {
        new: true,
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Prospects are Mapped successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
