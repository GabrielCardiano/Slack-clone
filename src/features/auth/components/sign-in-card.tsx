import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

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

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignInCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleProviderSignIn = (value: 'github' | 'google') => {
    signIn(value);
  }

  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use you email or another service to continue
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5">
          <Input
            onChange={(e) => setEmail(e.target.value)}
            disabled={false}
            value={email}
            placeholder="Email"
            type="email"
            required
            className="border-slack-gray-1 rounded-[12px]"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            disabled={false}
            value={password}
            placeholder="Password"
            type="password"
            required
            className="border-slack-gray-1 rounded-[12px]"
          />
          <Button type="submit" size="lg" disabled={false} variant="primary" className="w-full
           rounded-[12px] font-medium text-base">
            Sign In With Email
          </Button>
        </form>

        <Separator />

        <div className="flex flex-col gap-y-2.5">
          <Button
            onClick={() => handleProviderSignIn("google")}
            disabled={false}
            variant="outline"
            size="lg"
            className="w-full border-[2px] border-slack-gray-1 rounded-[12px] font-medium text-base flex gap-3"
          >
            <FcGoogle className="size-5" />
            <span>Sign In With Google</span>
          </Button>

          <Button
            onClick={() => handleProviderSignIn("github")}
            disabled={false}
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
