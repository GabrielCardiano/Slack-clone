import { api } from "@/_generated/api";
import { Id } from "@/_generated/dataModel";
import { useQuery } from "convex/react";

interface UseGetWorkspaceInfoProps {
  id: Id<"workspaces">;
};

export const useGetWorkspaceInfo = ({ id }: UseGetWorkspaceInfoProps) => {
  const data = useQuery(api.workspaces.getInfoById, { id });
  const isLoading = data === undefined;
  return { data, isLoading };
};