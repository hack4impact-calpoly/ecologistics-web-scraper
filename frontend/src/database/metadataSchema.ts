import mongoose, { Schema } from "mongoose";

const MetadataSchema = new Schema({
  lastRan: Date,
  totalHearingsScraped: Number,
  totalProjectsScraped: Number,
  totalSCHProjectsScraped: Number,
});

export default mongoose.models.ScraperMetadata ||
  mongoose.model("ScraperMetadata", MetadataSchema);