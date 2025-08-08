"use client";

import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { deleteMessage } from "../../app/actions/delete-message";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface GuestbookEntryProps {
  entry: {
    _id: string;
    _createdAt: string;
    authorName: string;
    authorImage: string;
    authorEmail: string;
    message: string;
  };
}

export function GuestbookEntry({ entry }: GuestbookEntryProps) {
  const { data: session } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteMessage(entry._id);
    if (result.success) {
      toast.success("Message deleted successfully!");
      router.refresh();
    } else {
      toast.error("Failed to delete message.");
    }
    setIsDeleting(false);
  };

  return (
    <div className="flex items-start gap-4 py-4">
      <Image
        src={entry.authorImage}
        alt={entry.authorName}
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-slate-50">{entry.authorName}</p>
            <time className="text-xs text-neutral-500">
              {new Date(entry._createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </time>
          </div>
          {session?.user?.email === entry.authorEmail && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  disabled={isDeleting}
                  className="text-neutral-500 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your message.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
        <p className="mt-1 text-neutral-300">{entry.message}</p>
      </div>
    </div>
  );
}
