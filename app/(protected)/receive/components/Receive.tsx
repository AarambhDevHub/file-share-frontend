"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useReceiveColumns, ReceiveColumnsType } from "./columns"
import { DataTable } from "@/components/ui/data-table";

interface ReceiveProps {
    data: ReceiveColumnsType[],
    total: number,
    token: string | null
}

export const Receive = ({ data, total, token }: ReceiveProps) => {
    const columes = useReceiveColumns({ token: token });
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Receive Files
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="p-4 space-y-4">
                <DataTable 
                    columns={columes} 
                    data={data}
                    totalCount={total} 
                />
            </CardContent>
        </Card>
    )
}