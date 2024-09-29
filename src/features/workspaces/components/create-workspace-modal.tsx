"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"

import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { useCreateWorkspaces } from "../api/use-create-workspace";

export const CreateWorkspaceModal = () => {
  const router = useRouter();

  const [open, setOpen] = useCreateWorkspaceModal();
  const [name, setName] = useState("");

  const { mutate, isPending } = useCreateWorkspaces();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutate({ name }, {
      onSuccess(id) {
        toast.success("Workspace created")
        router.push(`/workspace/${id}`);
        handleClose();
      },
    });
  };

  const handleClose = () => {
    setOpen(false);

    // TODO: Clear form.
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            onChange={(e) => setName(e.target.value)}
            disabled={isPending}
            value={name}
            required
            autoFocus
            minLength={3}
            placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
            className="border-slack-gray-1 rounded-[12px]"
          />

          <div className="flex justify-end">
            <Button variant="primary" disabled={isPending}>
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}