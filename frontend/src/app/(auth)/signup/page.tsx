"use client";
import { useState } from "react";
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
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const router = useRouter();

  const togglePasswordShown = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSignUp = async () => {
    // CHANGE THIS TO NAVIGATE TO NEW PAGE
    console.log("Email", email);
    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const jsonResponse = await resUserExists.json();
      const user = jsonResponse.user;

      if (user) {
        // user exists so return
        console.log("User already exists");
        return;
      }
      // calling the registration api
      await fetch("api/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      router.push("/login");
    } catch (error) {
      console.log("Error during registration:", error);
    }
  };

  return (
    <Card className="w-[370px] p-6 mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-700 pb-1 text-center">
          Sign Up
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
                // text = show password, password = no show password
                type={passwordShown ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="text-xs text-gray-500">
                Password must be at least 8 characters long and contain a
                number.
              </span>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type={passwordShown ? "text" : "password"}
                placeholder="Confirm Password"
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
        <Button onClick={handleSignUp} className="w-full">
          Sign Up
        </Button>
        <Link href="/login" className="text-xs hover:text-gray-300">
          Already have an account? Log In
        </Link>
      </CardFooter>
    </Card>
  );
}
