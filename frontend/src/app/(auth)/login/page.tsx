"use client";
import { FormEvent, SetStateAction, useState } from "react";
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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  // const router = useRouter();

  const togglePasswordShown = () => {
    setPasswordShown(!passwordShown);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        // user exists so try to sign in
        try {
          const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
          });

          if (res && res.error) {
            console.log("Invalid Credentials");
            setErrorMessage("Invalid Credentials");
            return;
          }
          router.push("/");
        } catch (error) {
          console.log(error);
        }
      } else {
        setErrorMessage("Account Doesn't Exist");
        return;
      }
    } catch (error) {
      console.log(error);
    }
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
        <form onSubmit={handleLogin}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input
                id="name"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage("");
                }}
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
          {errorMessage && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" variant={"secondary"}>
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2">
        {/* <Button variant="outline">Cancel</Button> */}
        <Link href="/signup" className="text-xs hover:text-gray-300">
          Create New Account
        </Link>
      </CardFooter>
    </Card>
  );
}
