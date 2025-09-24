"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { Account } from "@/lib/types";
import { ArrowLeftRight, Coins } from "lucide-react";

type TransactionFormProps = {
    accounts: Account[];
    onExecuteTransaction: (
        sourceAccountId: number,
        destinationAccountId: number,
        amount: number
    ) => void;
};

export function TransactionForm({
    accounts,
    onExecuteTransaction,
}: TransactionFormProps) {
    const FormSchema = z
        .object({
            sourceAccountId: z.coerce.number({
                required_error: "Please select a source account.",
            }),
            destinationAccountId: z.coerce.number({
                required_error: "Please select a destination account.",
            }),
            amount: z.coerce
                .number({ invalid_type_error: "Please enter a valid amount." })
                .positive("Amount must be positive."),
        })
        .refine((data) => data.sourceAccountId !== data.destinationAccountId, {
            message: "Source and destination accounts cannot be the same.",
            path: ["destinationAccountId"],
        })
        .refine(
            (data) => {
                const sourceAccount = accounts.find(
                    (acc) => acc.account_id === data.sourceAccountId
                );
                return sourceAccount
                    ? parseFloat(sourceAccount.balance) >= data.amount
                    : false;
            },
            {
                message: "Insufficient funds in the source account.",
                path: ["amount"],
            }
        );

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        onExecuteTransaction(
            data.sourceAccountId,
            data.destinationAccountId,
            data.amount
        );
    }

    const hasEnoughAccounts = accounts.length >= 2;

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Initiate Transaction</CardTitle>
                <CardDescription>
                    Transfer funds between two accounts.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {hasEnoughAccounts ? (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-2"
                        >
                            <FormField
                                control={form.control}
                                name="sourceAccountId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>From Account</FormLabel>
                                        <Select
                                            onValueChange={(value) =>
                                                field.onChange(Number(value))
                                            }
                                            defaultValue={String(field.value)}
                                        >
                                            <FormControl>
                                                <SelectTrigger data-testid="source-account-select">
                                                    <SelectValue placeholder="Select a source account" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {accounts.map((account) => (
                                                    <SelectItem
                                                        key={account.account_id}
                                                        value={String(
                                                            account.account_id
                                                        )}
                                                    >
                                                        {account.account_id} -
                                                        Balance: $
                                                        {parseFloat(
                                                            account.balance
                                                        ).toFixed(2)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="destinationAccountId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>To Account</FormLabel>
                                        <Select
                                            onValueChange={(value) =>
                                                field.onChange(Number(value))
                                            }
                                            defaultValue={String(field.value)}
                                        >
                                            <FormControl>
                                                <SelectTrigger data-testid="destination-account-select">
                                                    <SelectValue placeholder="Select a destination account" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {accounts.map((account) => (
                                                    <SelectItem
                                                        key={account.account_id}
                                                        value={String(
                                                            account.account_id
                                                        )}
                                                    >
                                                        {account.account_id}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Coins className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    type="number"
                                                    placeholder="0.00"
                                                    className="pl-9"
                                                    step="0.01"
                                                    {...field}
                                                    data-testid="amount-input"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="w-full"
                                type="submit"
                                disabled={
                                    form.formState.isSubmitting ||
                                    !hasEnoughAccounts
                                }
                                data-testid="transfer-funds-button"
                            >
                                {form.formState.isSubmitting
                                    ? "Transferring..."
                                    : "Transfer Funds"}
                                <ArrowLeftRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </Form>
                ) : (
                    <div className="text-center text-muted-foreground p-4 border border-dashed rounded-md">
                        You need at least two accounts to make a transaction.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
