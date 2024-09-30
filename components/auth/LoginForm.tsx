"use client";

import { useTransition } from "react";
import { AuthCard } from "./AuthCard";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "../schema/authType";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoginApi } from "@/action/authHandler";
import toast from "react-hot-toast";

export const LoginForm = () => {
    const [isPanding, startTransistion] = useTransition();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        startTransistion(() => {
            LoginApi(values)
                .then((response) => {
                    if(response?.error) {
                        toast.error(response.error);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        })
    }

    return(
        <AuthCard
            headerLabel="Welcome back"
            backButtonHref="/register"
            backButtonLabel="Don't have an account?"
        >
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
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
                    <Button type="submit" isLoading={isPanding} className="w-full">
                        Login
                    </Button>
                </form>
            </Form>

        </AuthCard>
    )
}