import { useForm } from "react-hook-form";
import { UserDataProps } from "./Profile";
import { z } from "zod";
import { nameUpdateSchema } from "../schema/profileType";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { updateUserName } from "@/action/profileHandler";
import toast from "react-hot-toast";


export const Userprofile = ({ userData }: { userData: UserDataProps }) => {
    const [isPanding, startTransition] = useTransition();

    const form = useForm<z.infer<typeof nameUpdateSchema>>({
        resolver: zodResolver(nameUpdateSchema),
        defaultValues: {
            email: userData.email,
            name: userData.name,
        }
    })

    const onSubmit = (values: z.infer<typeof nameUpdateSchema>) => {
        startTransition(() => {
            updateUserName({ name: values.name })
                .then((response) => {
                    if (response.status === 400){
                        toast.error(response.message)
                    }

                    if (response.status == 'success') {
                        toast.success(`User name update Successful!`)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        })
    }

    return (
        <div className="p-4">
            <span className="text-center font-bold">
                Update User Name
            </span>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                            readOnly
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                       <FormField 
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field} 
                                            placeholder="John Doe"
                                            disabled={isPanding}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}