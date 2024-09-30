import { z } from "zod";


export const loginSchema = z.object({
    email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),

    password: z.string()
    .min(6, { message: "Password should be at least 6 characters long" }),
})


export const registerSchema = z.object({
    email: z.string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
        
        name: z.string()
        .min(1, { message: "Name is required" }),
        
        password: z.string()
        .min(6, { message: "Password should be at least 6 characters long" }),
        
        passwordConfirm: z.string()
        .min(1, { message: "Password confirmation is required" }),
    }).refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords do not match",
    path: ["passwordConfirm"]
});
