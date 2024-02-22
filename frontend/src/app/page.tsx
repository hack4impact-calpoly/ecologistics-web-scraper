import { ProposalTable } from "../components/proposalTable";
import { useSession } from "next-auth/react";

export default async function Home() {
  return (
    <main>
      <div
        className="flex flex-col items-center justify-center text-center mx-auto py-3"
        style={{ maxWidth: "550px" }}
      >
        <h1>Home</h1>
        <div className="bg-gray-200 mx-auto py-3">
          <div className="font-bold">
            <h1>Ecologistics Proposal Table</h1>
          </div>
          <p>
            Development Project Approval Milestones that Trigger Document
            Publication in Local/State Systems
          </p>
        </div>
        <ProposalTable />
      </div>
    </main>
  );
}
