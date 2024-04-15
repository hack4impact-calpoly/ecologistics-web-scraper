import mongoose, { Schema } from "mongoose";

const metadataSchema = new Schema({
  date_run: Date,
});

export default mongoose.models.scraperMetadata ||
  mongoose.model("scraperMetadata", metadataSchema);
