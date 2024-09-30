"use server";

import { withActionHandler } from "@/components/utils/ActionUtils";
import { GlobalApiCall } from "@/components/utils/GlobalApiCall"

const API_BASE_URL = process.env.API_BASE_URL;

export const getMe = async () => {
    return withActionHandler(async() => {
        const response = await GlobalApiCall({
            url: `${API_BASE_URL}/users/me`,
            options: {
                method: 'get',
                cache: 'no-store'
            }
        })

        return response;
    })
}

export const updateUserName = async ({ name }: { name: string; }) => {
    return withActionHandler(async () => {
        const response = await GlobalApiCall({
            url: `${API_BASE_URL}/users/name`,
            options: {
                method: 'put',
                body: JSON.stringify({name}),
                cache: 'no-store'
            }
        })

        return response;
    })
}

export const updateUserPassword = async ({ old_password, new_password, new_password_confirm }: { old_password: string; new_password: string; new_password_confirm: string; }) => {
    return withActionHandler(async () => {
        const response = await GlobalApiCall({
            url: `${API_BASE_URL}/users/password`,
            options: {
                method: 'put',
                body: JSON.stringify({old_password, new_password, new_password_confirm}),
                cache: 'no-store'
            }
        })

        return response;
    })
}