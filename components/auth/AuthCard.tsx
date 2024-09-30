"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonHref: string;
  backButtonLabel: string;
  className?: string;
}

export const AuthCard = ({
  backButtonHref,
  backButtonLabel,
  children,
  headerLabel,
  className
}: AuthCardProps) => {
  return (
    <Card className={cn("w-[400px] shadow-md",  className)}>
      <CardHeader>
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
          <h1 className="text-3xl font-semibold">🔐SecureShare</h1>
          <p className="text-muted-foreground text-sm">{headerLabel}</p>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Button variant="link" className="font-normal w-full" size="sm" asChild>
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
