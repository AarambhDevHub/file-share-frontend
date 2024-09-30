"use client";

import { ColumnDef } from "@tanstack/react-table"

export type UploadColumnsType = {
    file_id: string;
    file_name: string;
    recipient_email: string;
    expiration_date: string;
    created_at: string;
};

export const UploadColumns: ColumnDef<UploadColumnsType>[] = [
    {
        accessorKey: "file_id",
        header: 'ID',
    },
    {
        accessorKey: 'file_name',
        header: 'File Name',
    },
    {
        accessorKey: 'recipient_email',
        header: 'Recipient Email',
    },
    {
        accessorKey: 'expiration_date',
        header: 'Expiration Date',
        cell: ({ row }) => {
            const date = new Date(row.original.expiration_date);
            return date.toLocaleDateString('en-US', {
              weekday: 'short', // Short name for the day (e.g., "Fri")
              day: '2-digit',   // Two-digit day (e.g., "27")
              month: 'short',   // Short name for the month (e.g., "Sep")
              year: 'numeric',   // Full numeric year (e.g., "2024")
            });
          },
    },
    {
        accessorKey: 'created_at',
        header: 'Created At',
        cell: ({ row }) => {
            const date = new Date(row.original.created_at);
            return date.toLocaleDateString('en-US', {
              weekday: 'short', // Short name for the day (e.g., "Fri")
              day: '2-digit',   // Two-digit day (e.g., "27")
              month: 'short',   // Short name for the month (e.g., "Sep")
              year: 'numeric',   // Full numeric year (e.g., "2024")
            });
          },
    }
]

