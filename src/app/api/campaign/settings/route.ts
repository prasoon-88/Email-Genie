import { connectDB } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import CampaignModel, { ALLOWED_CAMPAIGN_TYPE } from "@/models/campaign.model";
import { getURLSearchParams } from "@/utils/api";

// Ensure DB is connected
connectDB();

export async function GET(request: NextRequest) {
  try {
    const searchParams = getURLSearchParams(request.url);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json(
        {
          success: false,
          message: "Id is required",
        },
        {
          status: 400,
        }
      );

    const camapign = await CampaignModel.findById(id);
    if (!camapign)
      return NextResponse.json(
        {
          success: false,
          message: "Camapign Not Found",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(
      {
        success: true,
        camapign,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, category, id } = body;

    // Validate required fields
    const notFoundFields: string[] = [];
    if (!name) {
      notFoundFields.push("name");
    }
    if (!category) {
      notFoundFields.push("category");
    }

    // If any required fields are missing, respond with an error
    if (notFoundFields?.length) {
      return NextResponse.json(
        {
          success: false,
          message:
            "The following fields are required: " + notFoundFields.join(", "),
        },
        { status: 400 }
      );
    }

    // Validate allowed campaign type
    if (!ALLOWED_CAMPAIGN_TYPE.includes(category)) {
      return NextResponse.json(
        {
          success: false,
          message: "Wrong Campaign Type",
        },
        { status: 400 }
      );
    }

    let savedCampaign;

    // If an ID is provided, attempt to update
    if (id) {
      savedCampaign = await CampaignModel.findOneAndUpdate(
        { _id: id }, // Find by the campaign ID
        { $set: body }, // Set the updated fields
        { new: true } // Return the updated document (if found)
      );

      if (!savedCampaign) {
        return NextResponse.json(
          {
            success: false,
            message: "Campaign not found",
          },
          { status: 404 }
        );
      }
    } else {
      // If no ID, create a new campaign
      const campaign = new CampaignModel(body);
      savedCampaign = await campaign.save();
    }

    // If no campaign is saved, return an error
    if (!savedCampaign) {
      return NextResponse.json(
        {
          success: false,
          message: "Campaign creation failed",
        },
        { status: 400 }
      );
    }

    // Respond with the saved campaign
    return NextResponse.json(
      {
        success: true,
        campaign: savedCampaign,
      },
      { status: id ? 200 : 201 } // Return 200 for update and 201 for creation
    );
  } catch (error: any) {
    // Log the error to help with debugging
    console.error("Error occurred:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
