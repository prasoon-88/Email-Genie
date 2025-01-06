import mongoose from "mongoose";

const ProspectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    company: String,
    company_address: String,
    result: {
      subjectLine: String,
      emailBody: String,
      isGenerated: {
        type: Boolean,
        default: false,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "A prospect must associated with a user"],
    },
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "A prospect must associated with a campaign"],
    },
  },
  {
    timestamps: true,
  }
);

const ProspectModel =
  mongoose?.models?.prospects || mongoose.model("prospects", ProspectSchema);

export default ProspectModel;
