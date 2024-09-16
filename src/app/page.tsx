"use client";

import { UserButton } from "@/features/auth/components/user-button";

export default function Home() {   
   return (
      <div className="flex flex-col justify-center  items-center min-h-screen gap-4">
         <UserButton />
      </div>

   )
}
