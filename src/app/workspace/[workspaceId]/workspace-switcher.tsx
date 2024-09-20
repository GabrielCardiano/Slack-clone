"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader, PlusIcon } from "lucide-react";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useRouter } from "next/navigation";

export const WorkspaceSwitcher = () => {
  const [_open, setOpen] = useCreateWorkspaceModal();

  const router = useRouter();

  const workspaceId = useWorkspaceId();
  const { data: workspace, isLoading: workspaceIsLoading } = useGetWorkspace({ id: workspaceId });
  const { data: allWorkspaces, isLoading: allWorkspacesIsLoading } = useGetWorkspaces();

  const filteredWorkspaces = allWorkspaces?.filter((workspace) => workspace._id !== workspaceId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="
          size-9
          relative 
          overflow-hidden
          bg-white
          hover:bg-white/80
          text-slack-purple-3
          font-semibold
          text-xl
          rounded-full"
        >
          {workspaceIsLoading ?
            (<Loader className="size-5 animate-spin shrink-0" />) : (workspace?.name.charAt(0).toUpperCase())
          }
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="start" className="w-64">
        <DropdownMenuItem
          onClick={() => router.push(`/workspace/${workspaceId}`)}
          className="cursor-pointer flex-col justify-start items-start capitalize font-extrabold">
          {workspace?.name}
          <span className="text-xs text-muted-foreground font-normal">Active workspace</span>
        </DropdownMenuItem>

        {filteredWorkspaces?.map((workspace) => (
          <DropdownMenuItem
            key={workspace._id}
            onClick={() => router.push(`/workspace/${workspace._id}`)}
            className="cursor-pointer capitalize"
          >
            <div className="
              shrink-0
              size-9 
              relative 
              overflow-hidden
              bg-slack-gray-4 
              text-white 
              font-semibold
              text-lg
              rounded-md
              flex
              items-center
              justify-center
              mr-2"
            >
              {workspace.name.charAt(0).toUpperCase()}
            </div>
            <p className="truncate">{workspace.name}</p>
          </DropdownMenuItem>
        ))}

        <DropdownMenuItem onClick={() => setOpen(true)} className="cursor-pointer">
          <div
            className="
              size-9 
              relative 
              overflow-hidden
              bg-slack-gray-3
              text-slate-800 
              font-semibold text-lg
              rounded-md
              flex
              items-center
              justify-center
              mr-2"
          >
            <PlusIcon />
          </div>
          Create a new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
