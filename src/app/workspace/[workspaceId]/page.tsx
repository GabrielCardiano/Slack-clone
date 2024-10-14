"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Loader, TriangleAlert } from "lucide-react";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useCurrentMember } from "@/features/members/api/use-current-member";

const WorkspaceIdPage = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useCreateChannelModal();

  const { data: member, isLoading: memberIsLoading } = useCurrentMember({ workspaceId });
  const { data: workspace, isLoading: workspaceIsLoading } = useGetWorkspace({ id: workspaceId });
  const { data: channels, isLoading: channelsIsLoading } = useGetChannels({ workspaceId });

  const channelId = useMemo(() => channels?.[0]?._id, [channels]);
  const isAdmin = useMemo(() => member?.role === "admin", [member?.role]);

  useEffect(() => {
    if (workspaceIsLoading || channelsIsLoading || memberIsLoading || !member || !workspace) return;

    if (channelId) {
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    } else if (!open && isAdmin) {
      setOpen(true);
    }
  }, [
    isAdmin,
    channelId,
    workspaceIsLoading,
    channelsIsLoading,
    memberIsLoading,
    member,
    workspace,
    open,
    setOpen]);


  if (workspaceIsLoading || channelsIsLoading || memberIsLoading) {
    return (
      <div className="h-full flex items-center justify-center flex-col gap-2">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  };

  if (!workspace || !member) {
    return (
      <div className="h-full flex items-center justify-center flex-col gap-2">
        <TriangleAlert className="size-6 animate-spin text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Workspace not found
        </span>
      </div>
    )
  };

  return (
    <div className="h-full flex items-center justify-center flex-col gap-2">
      <TriangleAlert className="size-6 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">
        No channel found
      </span>
    </div>
  );
}

export default WorkspaceIdPage;