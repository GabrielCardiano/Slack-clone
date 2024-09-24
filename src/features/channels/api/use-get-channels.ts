import { useQuery } from "convex/react"
import { api } from "@/_generated/api"
import { Id } from "@/_generated/dataModel";

interface UseGetChannelsProps {
  workspaceId: Id<"workspaces">;
};

export const UseGetChannels = ({ workspaceId }: UseGetChannelsProps) => {
  const data = useQuery(api.channels.get, { workspaceId });
  const isLoading = data === undefined;
  return { data, isLoading };
}; 