import { useParams } from "next/navigation";
import { Id } from "@/_generated/dataModel";

export const useWorkspaceId = () => {
  const params = useParams();
  return params.workspaceId as Id<"workspaces">;
};