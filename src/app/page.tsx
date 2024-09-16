"use client";

import { UserButton } from "@/features/auth/components/user-button";
import { useAuthActions } from "@convex-dev/auth/react";

export default function Home() {
   const { signOut } = useAuthActions();
   
   return (
      <div className="flex flex-col justify-center  items-center min-h-screen gap-4">
         <h1>Logged in</h1>
         <UserButton />
      </div>

   )
}
