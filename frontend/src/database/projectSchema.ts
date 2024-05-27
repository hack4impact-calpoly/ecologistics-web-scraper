import mongoose, { Schema } from "mongoose";

//typescript Interface
export type IProject = {
  county_file_number: string;
  hearing_date: string;
  review_status: string;
  location: string;
  apn: string;
  date_accepted: string;
  requesting_party?: string;
  sch_number?: number;
  title?: string;
  public_hearing_agenda_link: string;
  sch_page_link?: string;
  additional_notes?: string;
};

//mongoose schema
export const projectSchema = new Schema<IProject>({
  county_file_number: { type: String, required: true },
  hearing_date: { type: String, required: true },
  review_status: { type: String, required: true },
  location: { type: String, required: true },
  apn: { type: String, required: true },
  date_accepted: { type: String, required: true },
  requesting_party: { type: String, required: false, default: "N/A" },
  sch_number: { type: Number, required: false, default: -1 },
  title: { type: String, required: false, default: "N/A" },
  public_hearing_agenda_link: { type: String, required: true },
  sch_page_link: { type: String, required: false, default: "N/A" },
  additional_notes: { type: String, required: false, default: "N/A" },
});

// defining the collection and model and creating one if doesn't exist

const Project =
  mongoose.models["projects"] || mongoose.model("projects", projectSchema);

export default Project;
