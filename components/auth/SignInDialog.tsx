"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export function SignInDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign In</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in to continue</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-neutral-400 mt-2 mb-6">
          Your information is only used to display your name and profile
          picture.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => signIn("github")}
            variant={"default"}
            className="w-full sm:w-auto"
          >
            <FaGithub className="mr-2 h-4 w-4" /> Sign in with GitHub
          </Button>
          <Button
            onClick={() => signIn("google")}
            variant={"outline"}
            className="w-full sm:w-auto"
          >
            <FaGoogle className="mr-2 h-4 w-4" /> Sign in with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
