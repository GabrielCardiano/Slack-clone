import Link from "next/link";
import { cn } from "@/lib/utils";
import { Id } from "@/_generated/dataModel"
import { cva, VariantProps } from "class-variance-authority";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"

import { useWorkspaceId } from "@/hooks/use-workspace-id";

const userItemVariants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active: "text-[#481349] bg-white/90 hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface UserItemProps {
  id: Id<"members">;
  label?: string;
  image?: string;
  variant?: VariantProps<typeof userItemVariants>["variant"];
};

export const UserItem = ({ id, image, label = "Member", variant }: UserItemProps) => {
  const workspaceId = useWorkspaceId();
  const avatarFallback = label.charAt(0).toUpperCase();

  return (
    <Button
      asChild
      variant="transparent"
      className={cn(userItemVariants({ variant }))}
      size="sm"
    >
      <Link href={`/workspace/${workspaceId}/member/${id}}`}>
        <Avatar className="size-5 rounded-full mr-1">
          <AvatarImage className="rounded-full" src={image} />
          <AvatarFallback className="rounded-full bg-white hover:bg-white/80 text-slack-purple-3 font-semibold">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  )
}
