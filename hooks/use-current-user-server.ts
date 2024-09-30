import { auth } from "@/auth";

export const useCurrentUserServer = async () => {
    const session = await auth();

    return session?.user;
}