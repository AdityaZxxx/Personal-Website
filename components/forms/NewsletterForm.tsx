"use client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { GradientButton } from "../ui/gradient-button";
import { Input } from "../ui/input";

const SubscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
  honeypot: z.string(),
});
type SubscribeType = z.infer<typeof SubscribeSchema>;

const NewsletterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubscribeType>({
    resolver: zodResolver(SubscribeSchema),
  });

  const onSubmit = async (data: SubscribeType) => {
    try {
      setIsSubmitting(true);
      setSubmitError("");
      setSubmitSuccess(false);

      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          honeypot: data.honeypot,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message");
      }

      setSubmitSuccess(true);
      reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to send message"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <div className="flex items-center gap-4 mt-6">
        <Input
          type="email"
          placeholder="Enter your email"
          className={cn(
            "max-w-[200px] bg-background",
            errors.email && "border-red-500"
          )}
          id="subscribe-email"
          {...register("email")}
        />
        <input
          type="text"
          {...register("honeypot")}
          className="hidden"
          aria-hidden="true"
        />
        <GradientButton
          type="submit"
          variant="variant"
          className="h-10 px-4 text-neutral-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </GradientButton>
      </div>
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}
      {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
      {submitSuccess && (
        <p className="text-green-500 text-sm">Subscription successful!</p>
      )}
    </form>
  );
};

export default NewsletterForm;
