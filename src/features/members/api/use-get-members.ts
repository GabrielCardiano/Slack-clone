import { useQuery } from "convex/react"
import { api } from "@/_generated/api"
import { Id } from "@/_generated/dataModel";

interface UseGetMemberProps {
  workspaceId: Id<"workspaces">;
};

export const useGetMember = ({ workspaceId }: UseGetMemberProps) => {
  const data = useQuery(api.members.get, { workspaceId });
  const isLoading = data === undefined;
  return { data, isLoading };
};
