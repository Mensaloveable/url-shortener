import mongoose from "mongoose";
import shortid from "shortid";

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, default: shortid.generate },
});

export default mongoose.model("Url", urlSchema);
