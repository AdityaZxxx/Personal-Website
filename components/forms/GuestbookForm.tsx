"use client";

import { addGuestbookEntry } from "@/app/actions/guestbook";
import { SignInDialog } from "@/components/auth/SignInDialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Helper function for abbreviation (since it's not in your lib/utils)
const getAbbreviation = (name: string) => {
  if (!name) return "";
  const words = name.split(" ");
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  return (
    words[0].charAt(0).toUpperCase() +
    words[words.length - 1].charAt(0).toUpperCase()
  );
};

const guestbookFormSchema = z.object({
  message: z.string().min(1, {
    message: "Message cannot be empty.",
  }),
});

export function GuestbookForm({ session }: { session: any }) {
  const form = useForm<z.infer<typeof guestbookFormSchema>>({
    resolver: zodResolver(guestbookFormSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof guestbookFormSchema>) => {
    const formData = new FormData();
    formData.append("message", values.message);
    formData.append("authorEmail", session.user.email);

    const result = await addGuestbookEntry(formData);
    if (result.success) {
      toast.success("Message signed successfully!");
      form.reset();
    } else {
      toast.error(result.error || "Something went wrong.");
    }
  };

  if (session?.user) {
    const defaultImage = session.user.name.charAt(0).toUpperCase();

    return (
      <>
        <p className="text-sm text-neutral-400 mb-4">
          Welcome, {session.user.name}! Leave a message below.
        </p>
        <div className="flex gap-3">
          <div className="">
            <Image
              src={session.user.image ?? defaultImage}
              alt={session.user.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Leave a message..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-4 flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => signOut()}
                  disabled={form.formState.isSubmitting}
                >
                  Sign Out
                </Button>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </>
    );
  }

  return <SignInDialog />;
}
