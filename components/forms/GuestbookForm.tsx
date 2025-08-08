"use client";

import { addGuestbookEntry } from "@/app/(website)/actions/guestbook";
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
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const guestbookFormSchema = z.object({
  message: z.string().min(1, {
    message: "Message cannot be empty.",
  }),
});

export function GuestbookForm({ session }: { session: any }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof guestbookFormSchema>>({
    resolver: zodResolver(guestbookFormSchema),
    defaultValues: {
      message: "",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    form.reset();
  }, [session, form]);

  const onSubmit = async (values: z.infer<typeof guestbookFormSchema>) => {
    if (!session?.user?.email) {
      toast.error("You must be signed in to leave a message.");
      return;
    }

    const formData = new FormData();
    formData.append("message", values.message);
    formData.append("authorEmail", session.user.email);

    const result = await addGuestbookEntry(formData);
    if (result.success) {
      toast.success("Message signed successfully!");
      form.reset();
      router.refresh();
    } else {
      toast.error(result.error || "Something went wrong.");
    }
  };

  if (session?.user) {
    const defaultImage = session.user.name.charAt(0).toUpperCase();

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-neutral-400">
            Welcome, {session.user.name}! Leave a message below.
          </p>
        </div>
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
                <Button type="reset" variant="ghost" onClick={() => signOut()}>
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
      </div>
    );
  }

  return <SignInDialog />;
}
