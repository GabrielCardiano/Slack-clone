import { api } from "@/_generated/api";
import { Id } from "@/_generated/dataModel";
import { useQuery } from "convex/react";

interface UseGetWorkspaceProps {
  id: Id<"workspaces">;
};

export const useGetWorkspace = ({ id }: UseGetWorkspaceProps) => {
  const data = useQuery(api.workspaces.getById, { id });
  const isLoading = data === undefined;
  return { data, isLoading };
};