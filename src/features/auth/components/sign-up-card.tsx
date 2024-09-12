import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

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

export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue</CardTitle>
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
          <Input
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={false}
            value={confirmPassword}
            placeholder="Confirm password"
            type="password"
            required
            className="border-slack-gray-1 rounded-[12px]"
          />
          <Button type="submit" size="lg" disabled={false} variant="primary" className="w-full rounded-[12px] font-medium text-base">
            Sign Up With Email
          </Button>
        </form>

        <Separator />

        <div className="flex flex-col gap-y-2.5">
          <Button
            onClick={() => { }}
            disabled={false}
            variant="outline"
            size="lg"
            className="w-full border-[2px] border-slack-gray-1 rounded-[12px] font-medium text-base flex gap-3"
          >
            <FcGoogle className="size-5" />
            <span>Sign Up With Google</span>
          </Button>

          <Button
            onClick={() => { }}
            disabled={false}
            variant="outline"
            size="lg"
            className="w-full border-[2px] border-slack-gray-1 rounded-[12px] font-medium text-base flex gap-3"
          >
            <FaGithub className="size-5" />
            <span>Sign Up With Github</span>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Already have an account?
          <span
            onClick={() => setState("signIn")}
            className="text-sky-700 hover:underline cursor-pointer"> Sign in</span>
        </p>
      </CardContent>
    </Card>
  );
};
