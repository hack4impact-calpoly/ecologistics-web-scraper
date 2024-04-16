import mongoose, { Schema } from "mongoose";

//typescript Interface
export type IProposal = {
  county_file_number: string;
  hearing_date: Date;
  review_status: string;
  location: string;
  apn: string;
  date_accepted: Date;
  requesting_party: string;
  sch_number: string;
  title: string;
  public_hearing_agenda_link: string;
  sch_page_link: string;
  additional_notes: string;
};

//mongoose schema
export const proposalSchema = new Schema<IProposal>({
  county_file_number: { type: String, required: true },
  hearing_date: { type: Date, required: true },
  review_status: { type: String, required: true },
  location: { type: String, required: true },
  apn: { type: String, required: true },
  date_accepted: { type: Date, required: true },
  requesting_party: { type: String, required: false },
  sch_number: { type: String, required: true },
  title: { type: String, required: true },
  public_hearing_agenda_link: { type: String, required: true },
  sch_page_link: { type: String, required: false },
  additional_notes: { type: String, required: true },
});

// defining the collection and model and creating one if doesn't exist

const Proposal =
  mongoose.models["proposals"] || mongoose.model("proposals", proposalSchema);

export default Proposal;
