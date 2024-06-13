"use client";
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Ecologistics from "../../public/ecologistics-logo.svg";
import "@/styles/globals.css";

export default function Navbar() {
  const { data: session } = useSession();
  // const [user, setUser] = useState("Karen");

  const handleSignOut = async () => {
    await signOut();
  };

  const user = session?.user?.email;
  return (
    <div className="flex bg-secondary px-16 h-16 items-center justify-between">
      <div>
        <Link href="/" className="flex items-left">
          <Image src={Ecologistics} alt="Ecologistics Logo" />
        </Link>
      </div>
      <div className="flex flex-row gap-10">
        {/* <div className="text-center  text-primary">
          <h3>Signed in as {user}</h3>
        </div> */}
        <div>
          <Link href="/about">About</Link>
        </div>
        <div>
          {session ? (
            <button onClick={handleSignOut}>Logout</button>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
}
