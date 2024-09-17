"use client";

import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";
import { useEffect, useState } from "react";

export const Modals = () => {
  const [mounted, setMounted] = useState(false);

  // Ensure that a modal will only render in a client side rendering, preventing an hydration error.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

return (
  <>
    <CreateWorkspaceModal />
  </>
);
};