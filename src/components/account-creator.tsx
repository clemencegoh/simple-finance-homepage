"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coins } from "lucide-react";

const formSchema = z.object({
  balance: z.coerce
    .number({ invalid_type_error: "Please enter a number." })
    .min(0, "Initial balance must be non-negative."),
});

type AccountCreatorProps = {
  onCreateAccount: (initialBalance: number) => void;
};

export function AccountCreator({ onCreateAccount }: AccountCreatorProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      balance: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onCreateAccount(values.balance);
    form.reset();
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Create New Account</CardTitle>
        <CardDescription>
          Start by creating a new account with an initial balance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Balance</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Coins className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="number" placeholder="0.00" className="pl-9" step="0.01" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Enter the starting balance for the new account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Creating...' : 'Create Account'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
