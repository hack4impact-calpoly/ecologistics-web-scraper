import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import pottingPlantImage from "./../../../docs/images/LadiesPottingPlant.png";

const NotFound = () => {
  return (
    <div
      style={{
        display: "block",
        justifyContent: "center",
        verticalAlign: "middle",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={pottingPlantImage}
          alt="Girls potting plant"
          style={{ width: "30%" }}
        />
        <div>
          <h1 className="scroll-m-20 text-6xl font-extrabold tracking-tight lg:text-7xl padding-bottom: 35px">
            404
          </h1>
          <h2 style={{ fontWeight: "bold" }}>
            Oops, this page doesn&#39;t exist!
          </h2>
          <p>
            We looked everywhere for this page.
            <br />
            Are you sure the website URL is correct? <br />
          </p>
          <div style={{ textAlign: "center", paddingTop: "15px" }}>
            <Button variant="outline">
              <Link href="/">Go Back Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
