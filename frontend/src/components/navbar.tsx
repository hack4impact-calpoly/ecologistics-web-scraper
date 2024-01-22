import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-secondary p-4">
      <div className="container flex justify-between items-center">
        <div className="font-semibold">
          <Link href="/">Ecologistics Web Scraper</Link>
        </div>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
