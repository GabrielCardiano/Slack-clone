import { useQuery } from "convex/react"
import { api } from "@/_generated/api"
import { Id } from "@/_generated/dataModel";

interface UseGetChannelProps {
  id: Id<"channels">;
};

export const useGetChannel = ({ id }: UseGetChannelProps) => {
  const data = useQuery(api.channels.getById, { id });
  const isLoading = data === undefined;
  return { data, isLoading };
}; 