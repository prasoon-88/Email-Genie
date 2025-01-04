import mongoose from "mongoose";

export const ALLOWED_CAMPAIGN_TYPE = ["job-application", "inquiry"];

const CampaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Campaign Name is Required"],
      minLength: [10, "Campaign Name must have 10 characters"],
      maxLength: [250, "Campaign Name must not have 250 characters"],
      trim: true,
    },
    category: {
      type: String,
      enum: {
        values: ALLOWED_CAMPAIGN_TYPE,
        message: "Camapign Category must be either job-application or inquiry",
      },
      required: [true, "Campaign Category is Required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "A Campaign must associated with a user"],
    },
    prospects: {
      cols: [String],
      rows: [mongoose.Schema.Types.Mixed],
      mapping: {
        type: Map,
        of: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const CampaignModel =
  mongoose?.models?.campaign ?? mongoose.model("campaign", CampaignSchema);

export default CampaignModel;
