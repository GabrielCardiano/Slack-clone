import { api } from "@/_generated/api";
import { Id } from "@/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useCallback, useMemo, useState } from "react";

type RequestType = { name: string, id: Id<"channels"> };
type ResponseType = Id<"channels"> | null;

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  thorwError?: boolean;
}

type StatusType = "success" | "error" | "settled" | "pending" | null;


export const useUpdateChannel = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState<Error | null>(null)
  const [status, setStatus] = useState<StatusType>(null);

  const mutation = useMutation(api.channels.update);

  const isPending = useMemo(() => status === "pending", [status]);
  const isSuccess = useMemo(() => status === "success", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);

  const mutate = useCallback(async (values: RequestType, options?: Options) => {
    try {
      setData(null);
      setError(null);

      setStatus("pending");

      const response = await mutation(values);
      options?.onSuccess?.(response);
      return response;
    } catch (error) {
      setStatus("error");
      options?.onError?.(error as Error);

      if (options?.thorwError) {
        throw error;
      }
    } finally {
      setStatus("settled");
      options?.onSettled?.();
    }
  }, [mutation]);

  return { mutate, data, error, isPending, isSuccess, isError, isSettled };
}