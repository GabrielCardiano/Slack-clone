import { FormEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { GoEyeClosed, GoEye } from "react-icons/go";

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
import { useAuthActions } from "@convex-dev/auth/react";
interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [hidePassword, setHidePassword] = useState(false);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(false);


  const onPasswordSignUp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      // return;
    }

    // setPending(true);

    signIn("password", { email, password, flow: "signUp" })
      .catch(() => setError("Invalid email or password"))
      .finally(() => setPending(false));
  }

  const onProviderSignUp = (value: 'github' | 'google') => {
    setPending(true);
    signIn(value)
      .finally(() => setPending(false));
  }

  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue</CardTitle>
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
        <form onSubmit={onPasswordSignUp} className="space-y-2.5">
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
            {hidePassword ? (
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

          <div className="relative">
            <Input
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={pending}
              value={confirmPassword}
              placeholder="Confirm password"
              type={!!hideConfirmPassword ? "text" : "password"}
              required
              className="border-slack-gray-1 rounded-[12px]"
            />
            {hideConfirmPassword ? (
              <GoEye
                onClick={() => setHideConfirmPassword(!hideConfirmPassword)}
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer active:bg-slack-gray-1 active:rounded-full"
              />) : (
              <GoEyeClosed
                onClick={() => setHideConfirmPassword(!hideConfirmPassword)}
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer active:bg-slack-gray-1 active:rounded-full"
              />
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={pending}
            variant="primary"
            className="w-full rounded-[12px] font-medium text-base">
            Sign Up With Email
          </Button>
        </form>

        <Separator />

        <div className="flex flex-col gap-y-2.5">
          <Button
            onClick={() => onProviderSignUp("google")}
            disabled={pending}
            variant="outline"
            size="lg"
            className="w-full border-[2px] border-slack-gray-1 rounded-[12px] font-medium text-base flex gap-3"
          >
            <FcGoogle className="size-5" />
            <span>Sign Up With Google</span>
          </Button>

          <Button
            onClick={() => onProviderSignUp("github")}
            disabled={pending}
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
