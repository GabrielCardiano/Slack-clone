import { FormEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { GoEyeClosed, GoEye } from "react-icons/go";


import { useAuthActions } from "@convex-dev/auth/react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "../types";
import { TriangleAlert } from "lucide-react";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignInCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [hidePassword, setHidePassword] = useState(false);

  const onPasswordSignIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    signIn("password", { email, password, flow: "signIn" })
      .catch(() => setError("Invalid email or password"))
      .finally(() => setPending(false));
  }

  const onProviderSignIn = (value: 'github' | 'google') => {
    setPending(true);
    signIn(value)
      .finally(() => setPending(false));
  }

  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use you email or another service to continue
        </CardDescription>
      </CardHeader>

      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSignIn} className="space-y-2.5">
          <Input
            onChange={(e) => setEmail(e.target.value)}
            disabled={pending}
            value={email}
            placeholder="Email"
            type="email"
            required
            className="border-slack-gray-1 rounded-[12px]"
          />
          <div className="relative">
            <Input
              onChange={(e) => setPassword(e.target.value)}
              disabled={pending}
              value={password}
              placeholder="Password"
              type={!!hidePassword ? "text" : "password"}
              required
              className="border-slack-gray-1 rounded-[12px]"
            />
            {!!hidePassword ? (
              <GoEye
                onClick={() => setHidePassword(!hidePassword)}
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer active:bg-slack-gray-1 active:rounded-full"
              />) : (
              <GoEyeClosed
                onClick={() => setHidePassword(!hidePassword)}
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer active:bg-slack-gray-1 active:rounded-full"
              />
            )}
          </div>

          <Button type="submit" size="lg" disabled={pending} variant="primary" className="w-full
           rounded-[12px] font-medium text-base">
            Sign In With Email
          </Button>
        </form>

        <Separator />

        <div className="flex flex-col gap-y-2.5">
          <Button
            onClick={() => onProviderSignIn("google")}
            disabled={pending}
            variant="outline"
            size="lg"
            className="w-full border-[2px] border-slack-gray-1 rounded-[12px] font-medium text-base flex gap-3"
          >
            <FcGoogle className="size-5" />
            <span>Sign In With Google</span>
          </Button>

          <Button
            onClick={() => onProviderSignIn("github")}
            disabled={pending}
            variant="outline"
            size="lg"
            className="w-full border-[2px] border-slack-gray-1 rounded-[12px] font-medium text-base flex gap-3"
          >
            <FaGithub className="size-5" />
            <span>Sign In With Github</span>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?
          <span
            onClick={() => setState("signUp")}
            className="text-sky-700 hover:underline cursor-pointer"> Sign up</span>
        </p>
      </CardContent>
    </Card>
  );
};
