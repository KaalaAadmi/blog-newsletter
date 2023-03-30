import mongoose from "mongoose";

const newsletterSchema = mongoose.Schema(
  {
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Newsletter", newsletterSchema);
