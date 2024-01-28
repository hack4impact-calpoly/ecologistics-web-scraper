"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordShown = () => {
    setPasswordShown(!passwordShown);
  };

  const handleLogin = () => {
    // CHANGE THIS TO NAVIGATE TO NEW PAGE
    console.log("Email", email);
  };

  return (
    <Card className="w-[370px] p-6 mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-700 pb-1 text-center">
          Log In
        </CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent className="pb-4">
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input
                id="name"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={passwordShown ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </form>
        <div className="flex items-center space-x-2 py-4">
          <input
            type="checkbox"
            id="hidePassword"
            onChange={togglePasswordShown}
            checked={passwordShown}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <Label htmlFor="hidePassword">Show Password</Label>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2">
        {/* <Button variant="outline">Cancel</Button> */}
        <Button onClick={handleLogin} className="w-full">
          Login
        </Button>
        <Link href="/signup" className="text-xs hover:text-gray-300">
          Create New Account
        </Link>
      </CardFooter>
    </Card>
  );
}
