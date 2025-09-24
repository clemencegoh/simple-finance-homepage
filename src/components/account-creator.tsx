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
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Coins, CreditCard } from "lucide-react";

const formSchema = z.object({
    id: z.coerce
        .number({ invalid_type_error: "ID must be a number." })
        .int("ID must be an integer.")
        .positive("ID must be positive."),
    balance: z.coerce
        .number({ invalid_type_error: "Please enter a number." })
        .min(0, "Initial balance must be non-negative."),
});

type AccountCreatorProps = {
    onCreateAccount: (id: number, initialBalance: number) => void;
};

export function AccountCreator({ onCreateAccount }: AccountCreatorProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            balance: 0,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        onCreateAccount(values.id, values.balance);
        form.reset();
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>Create New Account</DialogTitle>
                <DialogDescription>
                    Start by creating a new account with a numeric ID and
                    initial balance.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 pt-4"
                >
                    <FormField
                        control={form.control}
                        name="id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account ID</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="number"
                                            placeholder="12345"
                                            className="pl-9"
                                            {...field}
                                            data-testid="account-id-input"
                                        />
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    Enter a unique numeric identifier for the
                                    new account.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="balance"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Initial Balance</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Coins className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="number"
                                            placeholder="0.00"
                                            className="pl-9"
                                            step="0.01"
                                            {...field}
                                            data-testid="balance-input"
                                        />
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    Enter the starting balance for the new
                                    account.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        className="w-full"
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        data-testid="create-account-button"
                    >
                        {form.formState.isSubmitting
                            ? "Creating..."
                            : "Create Account"}
                    </Button>
                </form>
            </Form>
        </>
    );
}
