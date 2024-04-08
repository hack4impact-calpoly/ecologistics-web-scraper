import mongoose, { Schema } from "mongoose";

//typescript Interface
export type IProposal = {
  name: string;
  link: string;
  date_approved: Date;
  date_closed: Date;
  review_status: string;
  flag_status: string;
  location: string;
  meeting_date: Date;
  public_comment_end_date: Date;
};

//mongoose schema
export const proposalSchema = new Schema<IProposal>({
  name: { type: String, required: true },
  link: { type: String, required: true },
  date_approved: { type: Date, required: false, default: new Date() },
  date_closed: { type: Date, required: false, default: new Date() },
  review_status: { type: String, required: true },
  flag_status: { type: String, required: true },
  location: { type: String, required: true },
  meeting_date: { type: Date, required: false, default: new Date() },
  public_comment_end_date: { type: Date, required: false, default: new Date() },
});

// defining the collection and model and creating one if doesn't exist

const Proposal =
  mongoose.models["proposals"] || mongoose.model("proposals", proposalSchema);

export default Proposal;
