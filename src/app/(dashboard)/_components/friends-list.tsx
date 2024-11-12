"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CheckIcon, MessageCircleCodeIcon, XIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function PrendingFriendsList() {
  const friends = useQuery(api.functions.friend.listPending);
  const updateStatus = useMutation(api.functions.friend.updateStatus);
  return (
    <div className="flex-col divide-y">
      <h2 className="text-sm font-medium text-muted-foreground p-2.5">
        Pending Friends
      </h2>
      {friends?.length === 0 && (
        <FriendListEmpty>You have no pending friends</FriendListEmpty>
      )}
      {friends?.map((friend, index) => (
        <FriendItem
          key={index}
          username={friend.user.username}
          image={friend.user.image}
        >
          <IconButton
            className="bg-green-100"
            icon={<CheckIcon />}
            title="Accept"
            onClick={() => updateStatus({ id: friend._id, status: "accepted" })}
          />
          <IconButton
            className="bg-red-100"
            icon={<XIcon />}
            title="Reject"
            onClick={() => updateStatus({ id: friend._id, status: "rejected" })}
          />
        </FriendItem>
      ))}
    </div>
  );
}

function FriendListEmpty({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 bg-muted/50 text-center text-sm text-muted-foreground">
      {children}
    </div>
  );
}

export function AcceptedFriendsList() {
  const friends = useQuery(api.functions.friend.listAccepted);
  const updateStatus = useMutation(api.functions.friend.updateStatus);
  return (
    <div className="flex-col divide-y">
      <h2 className="text-sm font-medium text-muted-foreground p-2.5">
        Accepted Friends
      </h2>
      {friends?.length === 0 && (
        <FriendListEmpty>No friends yet</FriendListEmpty>
      )}
      {friends?.map((friend, index) => (
        <FriendItem
          key={index}
          username={friend.user.username}
          image={friend.user.image}
        >
          <IconButton
            className="bg-green-100"
            icon={<MessageCircleCodeIcon />}
            title="Start DM"
            onClick={() => {}}
          />

          <IconButton
            title="Remove Friend"
            className="bg-red-100"
            icon={<XIcon />}
            onClick={() => updateStatus({ id: friend._id, status: "rejected" })}
          />
        </FriendItem>
      ))}
    </div>
  );
}

function IconButton({
  title,
  className,
  icon,
  onClick,
}: {
  title: string;
  className?: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className={cn("rounded-full", className)}
          variant="outline"
          size="icon"
          onClick={onClick}
        >
          {icon}
          <span className="sr-only">{title}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{title}</TooltipContent>
    </Tooltip>
  );
}

function FriendItem({
  username,
  image,
  children,
}: {
  username: string;
  image: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items center justify-between p-2.5 gap-2.5">
      <div className="flex items-center gap-2.5">
        <Avatar className="size-6">
          <AvatarImage src={image} />
          <AvatarFallback />
        </Avatar>
        <p className="text-sm font-medium">{username}</p>
      </div>
      <div className="flex items-center gap-1">{children}</div>
    </div>
  );
}
