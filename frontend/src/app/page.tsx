import { ProposalTable } from "../components/proposalTable";
import { useSession } from "next-auth/react";

export default async function Home() {
  return (
    <main>
      <h1>Home</h1>
      <ProposalTable />
    </main>
  );
}
