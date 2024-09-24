"use client";

import { WorkspaceHeader } from "./workspace-header";
import { SidebarItem } from "./sidebar-item";

import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id"

import { AlertTriangleIcon, LoaderIcon, MessageSquareTextIcon, SendHorizonal } from "lucide-react";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const { data: member, isLoading: memberIsLoading } = useCurrentMember({ workspaceId });
  const { data: workspace, isLoading: workspaceIsLoading } = useGetWorkspace({ id: workspaceId });

  if (workspaceIsLoading || memberIsLoading) {
    return (
      <div className="flex flex-col bg-slack-purple-1 h-full items-center justify-center">
        <LoaderIcon className="size-8 animate-spin text-white" />
      </div>
    )
  };

  if (!workspace || !member) {
    return (
      <div className="flex flex-col bg-slack-purple-1 h-full items-center justify-center">
        <AlertTriangleIcon className="size-8 text-white" />
        <p className="text-white text-sm">Workspace not found</p>
      </div>
    )
  };

  return (
    <div className="flex flex-col bg-slack-purple-1 h-full">
      <WorkspaceHeader workspace={workspace} isAdmin={member.role === "admin"} />

      <div className="flex flex-col px-2 mt-3 gap-1.5">
        <SidebarItem
          label="Threads"
          icon={MessageSquareTextIcon}
          id="threads"
        />
        <SidebarItem
          label="Drafts & Sent"
          icon={SendHorizonal}
          id="drafts"
        />
      </div>
    </div>
  )
}
