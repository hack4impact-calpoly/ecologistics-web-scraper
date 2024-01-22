import React from "react";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex flex-col gap-5">
      This is an example page
      <div>
        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          This button does nothing
        </Button>
      </div>
    </div>
  );
}
