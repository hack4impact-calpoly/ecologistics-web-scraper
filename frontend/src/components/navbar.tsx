"use client";
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import "@/styles/globals.css";

export default function Navbar() {
  const { data: session } = useSession();
  // const [user, setUser] = useState("Karen");

  const handleSignOut = async () => {
    await signOut();
  };

  const user = session?.user?.email;
  return (
    <div className="bg-secondary p-4">
      <div className="container flex justify-between items-center">
        <div>
          <Link href="/" className="flex items-left">
            <div className="font-bold">ECOLO</div>
            <div className="text-primary">GISTICS Web Scraper</div>
          </Link>
        </div>

        <div className="text-center text-primary">
          <h3>Welcome {user}</h3>
        </div>

        <div className="flex items-center justify-between space-x-4">
          <div>
            <Link href="/about" className="flex items-center">
              <div className="text-primary">About</div>
            </Link>
          </div>
          <ul>
            <li className="flex items-center space-x-4">
              {session ? (
                <button onClick={handleSignOut}>Logout</button>
              ) : (
                <Link href="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
