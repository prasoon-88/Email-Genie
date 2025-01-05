import { TONES } from "@/config/campaign";
import mongoose, { mongo } from "mongoose";

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
    tone: {
      type: String,
      enum: {
        values: TONES.map((tone) => tone.value),
        message: "Invalid Tone {VALUE}",
      },
      required: [true, "Tone is Required"],
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
    upload: {
      cols: {
        type: [mongoose.Schema.Types.Mixed],
        default: null,
      },
      rows: {
        type: [mongoose.Schema.Types.Mixed],
        default: null,
      },
      mapping: {
        type: [mongoose.Schema.Types.Mixed],
        default: null,
      },
    },
    prospects: {
      type: [mongoose.Schema.Types.Mixed],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const CampaignModel =
  mongoose?.models?.campaign ?? mongoose.model("campaign", CampaignSchema);

export default CampaignModel;
