"use client";

import { useTransition } from "react";
import { AuthCard } from "./AuthCard";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "../schema/authType";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RegisterApi } from "@/action/authHandler";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const [isPanding, startTransistion] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    startTransistion(() => {
      RegisterApi(values).then((response) => {
        if (response.status === 400) {
          toast.error(response.message);
        }

        if (response.status == "success") {
          toast.success(`${response.message}, Redirecting to login...`);
          router.push("/login");
        }
      });
    });
  };

  return (
    <AuthCard
      headerLabel="Create a Account"
      backButtonHref="/login"
      backButtonLabel="Already have an account?"
      className="w-[600px]"
    >
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-row flex-wrap gap-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="john doe"
                        type="text"
                        disabled={isPanding}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="john.doe@example.com"
                        type="email"
                        disabled={isPanding}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="********"
                        type="password"
                        disabled={isPanding}
                        enablePasswordToggle
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password Confirm</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="********"
                        type="password"
                        disabled={isPanding}
                        enablePasswordToggle
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" isLoading={isPanding} className="w-full">
            Create an account
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
};
