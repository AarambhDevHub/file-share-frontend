"use client";

import { searchEmail } from "@/action/fileHandler";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const emailFormSchema = z.object({
  recipient_email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  expiration_date: z
    .date()
    .refine(
      (val) => val >= new Date(),
      "Expiration date must be in the future"
    ),
  fileUpload: z
    .instanceof(File, { message: "Please select a file" })
    .refine(
      (file) =>
        file &&
        ["image/jpeg", "image/png", "image/jpg", "application/pdf"].includes(
          file.type
        ),
      "Only images (jpg, jpeg, png) and PDF files are allowed"
    ).refine(
      (file) => file && file.size <= 4 * 1024 * 1024, // 4MB in bytes
      { message: "File size must be less than or equal to 4MB" }
    ),
});

export const UploadNew = ({ token }: { token: string | null }) => {
  const [emailSuggestions, setEmailSuggestions] = useState<
    { email: string }[]
  >([]);
  const [isFetchingEmails, setIsFetchingEmails] = useState(false);
  const [isPanding, setIsPanding] = useState(false);
  const router = useRouter();

  const tomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  const form = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      recipient_email: "",
      password: "",
      expiration_date: tomorrowDate(),
    },
  });
  const recipient_email = form.watch("recipient_email");
  const password = form.watch("password");
  const expirationDate = form.watch("expiration_date");

  const isFormFilled = recipient_email && password && expirationDate;

  useEffect(() => {
    const fetchEmailSuggestions = async (query: string) => {
      if (!query) return;
      setIsFetchingEmails(true);
      try {
        const response = await searchEmail(query);
        setEmailSuggestions(response.emails || []);
      } catch (error) {
        console.error("Failed to fetch email suggestions:", error);
      } finally {
        setIsFetchingEmails(false);
      }
    };

    // Debounce API calls
    const delayDebounceFn = setTimeout(() => {
      if (recipient_email) {
        fetchEmailSuggestions(recipient_email);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [recipient_email]);

  const handleFileUplaod = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("fileUpload", file);
    }
  };

  const onSubmit = async (values: z.infer<typeof emailFormSchema>) => {
    setIsPanding(true);
        const formData = new FormData();

        formData.append('recipient_email', values.recipient_email);
        formData.append('password', values.password);
        formData.append('expiration_date', values.expiration_date.toISOString());
        formData.append('fileUpload', values.fileUpload);

        const response = await fetch(`http://localhost:8000/api/file/upload`,
            {
                method: 'post',
                body: formData,
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            }
        )

      const result = await response.json();
      if(result.status == "success") {
        toast.success(result.message);
        router.push('/upload')
      }else{
        toast.error(result.message)
      }
    setIsPanding(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload new File</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-4">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="recipient_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Email</FormLabel>
                  <FormControl>
                    <Select 
                        onValueChange={(value) => {
                            field.onChange(value);
                        }}
                        disabled={isPanding}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Type or select recipient's email" />
                      </SelectTrigger>
                      <SelectContent>
                        <Input placeholder="Type to search email" {...field} />
                        {isFetchingEmails ? (
                          <SelectItem value="1" disabled>
                            Loading...
                          </SelectItem>
                        ) : emailSuggestions.length > 0 ? (
                          emailSuggestions.map((email) => (
                            <SelectItem key={email.email} value={email.email}>
                              {email.email}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="2" disabled>
                            No emails found
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
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
                    <Input {...field} enablePasswordToggle  disabled={isPanding}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiration_date"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Expiration Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          disabled={isPanding}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fileUpload"
              render={({}) => (
                <FormItem>
                  <FormLabel>File Upload</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleFileUplaod}
                      disabled={!isFormFilled || isPanding}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" isLoading={isPanding}>
              Upload File
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
