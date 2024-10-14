import { useQuery } from "convex/react"
import { api } from "@/_generated/api"
import { Id } from "@/_generated/dataModel";

interface UseGetChannelByIdProps {
  id: Id<"channels">;
};

export const useGetChannelById = ({ id }: UseGetChannelByIdProps) => {
  const data = useQuery(api.channels.getById, { id });
  const isLoading = data === undefined;
  return { data, isLoading };
}; 