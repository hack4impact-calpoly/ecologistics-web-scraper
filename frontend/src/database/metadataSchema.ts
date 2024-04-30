import mongoose, { Schema } from "mongoose";

const metadataSchema = new Schema({
  lastRan: Date,
  totalHearingsScraped: Number,
  totalProjectsScraped: Number,
  totalSCHProjectsScraped: Number,
});

export default mongoose.models.scraperMetadata ||
  mongoose.model("scraperMetadata", metadataSchema);
