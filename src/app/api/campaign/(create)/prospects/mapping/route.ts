import { connectDB } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import CampaignModel from "@/models/campaign.model";
import ProspectModel from "@/models/prospects.model";
import { TOKEN_KEY } from "@/config";
import { getDataFromToken } from "@/utils/api/auth";

connectDB();

const converToJSON = (
  mapping: string[][],
  rows: string[][],
  user: string,
  campaign: string
) => {
  const jsonDataPool: any[] = [];
  let jsonRow: any = {};

  rows.forEach((row) => {
    for (let [index, col] of mapping) {
      jsonRow[col] = row[index as any];
    }
    jsonRow.user = user;
    jsonRow.campaign = campaign;
    jsonDataPool.push(jsonRow);
    jsonRow = {};
  });
  return jsonDataPool;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = request.cookies.get(TOKEN_KEY)?.value!;
    const { mapping, campaignId } = body ?? {};

    const user = await getDataFromToken(token);

    if (!mapping || !campaignId)
      return NextResponse.json(
        {
          success: false,
          message: "Required fields are missing either mapping or campaignId",
        },
        { status: 400 }
      );

    let campaign = await CampaignModel.findById(campaignId);

    const prospects = converToJSON(
      mapping,
      campaign.upload.rows,
      user._id,
      campaign._id
    );

    campaign = await CampaignModel.findByIdAndUpdate(
      campaignId,
      {
        $set: {
          "upload.mapping": mapping,
        },
      },
      {
        new: true,
      }
    );

    await ProspectModel.insertMany(prospects);

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
