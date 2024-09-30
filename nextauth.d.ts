import { DefaultSession } from "next-auth";

// Extend the DefaultSession["user"] type with accessToken
export type ExtendedUser = DefaultSession["user"] & {
    accessToken: string;
}

declare module "next-auth" {
    // Extend the User interface with accessToken
    interface User {
        token: string;
    }

    // Extend the Session interface with the extended User
    interface Session {
        user: ExtendedUser;
    }
}
