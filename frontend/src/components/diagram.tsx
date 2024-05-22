import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import DiagramImage from "../../public/WebScrapingApproachDiagram.jpg";

export default function Diagram() {
  return (
    <Collapsible>
      <div className="w-full flex justify-center mt-5">
        <CollapsibleTrigger>
          <Button className="bg-secondary" onClick={() => {}}>
            Diagram
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <Image src={DiagramImage} alt="Web Scraping Approach Diagram" />
      </CollapsibleContent>
    </Collapsible>
  );
}
