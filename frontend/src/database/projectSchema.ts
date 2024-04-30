import mongoose, { Schema } from "mongoose";

//typescript Interface
export type IProject = {
  countyFileNumber: string;
  hearingDate: Date;
  reviewStatus: string;
  location: string;
  apn: string;
  dateAccepted: Date;
  requestingParty?: string;
  schNumber?: number;
  title?: string;
  publicHearingAgenda: string;
  schLink?: string;
  additionalNotes?: string;
};

//mongoose schema
export const projectSchema = new Schema<IProject>({
  countyFileNumber: { type: String, required: true },
  hearingDate: { type: Date, required: true },
  reviewStatus: { type: String, required: true },
  location: { type: String, required: true },
  apn: { type: String, required: true },
  dateAccepted: { type: Date, required: true },
  requestingParty: { type: String, required: false, default: "N/A" },
  schNumber: { type: Number, required: false, default: -1 },
  title: { type: String, required: false, default: "N/A" },
  publicHearingAgenda: { type: String, required: true },
  schLink: { type: String, required: false, default: "N/A" },
  additionalNotes: { type: String, required: false, default: "N/A" },
});

// defining the collection and model and creating one if doesn't exist

const Proposal =
  mongoose.models["projects"] || mongoose.model("projects", projectSchema);

export default Proposal;
