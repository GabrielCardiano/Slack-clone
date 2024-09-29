import { FormEvent, useState } from "react";

import { useUpdateWorkspaces } from "@/features/workspaces/api/use-update-workspace";
import { useRemoveWorkspaces } from "@/features/workspaces/api/use-remove-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TrashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";

interface PreferencesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
}

export const PreferencesModal = ({ initialValue, open, setOpen }: PreferencesModalProps) => {
  const router = useRouter();

  const [value, setValue] = useState(initialValue);
  const [editOpen, setEditOpen] = useState(false);
  const [ConfirmDialog, confirm] = useConfirm("Are you sure?", "This action is irreversible");

  const workspaceId = useWorkspaceId();
  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } = useUpdateWorkspaces();
  const { mutate: removeWorkspace, isPending: isRemovingWorkspace } = useRemoveWorkspaces();

  const handleEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    updateWorkspace(
      { id: workspaceId, name: value },
      {
        onSuccess: () => {
          toast.success("Workspace updated");
          setEditOpen(false);
        },
        onError: () => {
          toast.error("Failed to update workspace");
        },
      },
    );
  };

  const handleRemove = async () => {
    const ok = await confirm();
    if (!ok) return;

    removeWorkspace(
      { id: workspaceId },
      {
        onSuccess: () => {
          toast.success("Workspace removed");
          router.replace("/");
        },
        onError: () => {
          toast.error("Failed to remove workspace");
        },
      },
    )
  }

  return (
    <>
      <ConfirmDialog />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white p-0 overflow-hidden">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>
              {value}
            </DialogTitle>
          </DialogHeader>

          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-slack-gray-2/40">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">
                      Workspace name
                    </p>
                    <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                      Edit
                    </p>
                  </div>
                  <p className="text-sm ">{value}</p>
                </div>
              </DialogTrigger>

              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Rename this workspace</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleEdit} className="space-y-4">
                  <Input
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    disabled={isUpdatingWorkspace}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={80}
                    placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" disabled={isUpdatingWorkspace}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button variant="primary" disabled={isUpdatingWorkspace}>
                      Save
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <button
              onClick={handleRemove}
              disabled={isRemovingWorkspace}
              className="
              flex 
              items-center 
              gap-x-2 
              px-5 
              py-4 
              bg-white 
              rounded-lg 
              border 
              cursor-pointer 
              hover:bg-slack-gray-2/40
              text-rose-600"
            >
              <TrashIcon className="size-4" />
              <p className="text-sm font-semibold">
                Delete workspace
              </p>
            </button>
          </div>

        </DialogContent>
      </Dialog>
    </>
  )
}