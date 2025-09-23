"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const BASE_URL = "http://localhost:8860";

const createTransaction = async (
    newTransaction: Transaction
): Promise<Transaction> => {
    const response = await fetch(`${BASE_URL}/transactions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create transaction");
    }

    return response.json();
};

export function useTransactions() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const [transactions, setTransactions] = useState<Transaction[] | null>(
        null
    );

    const mutation = useMutation<Transaction, Error, Transaction>({
        mutationFn: createTransaction,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
            setTransactions((prevTransactions) => {
                const newData = {
                    ...data,
                    timestamp: new Date().toISOString(),
                };
                if (prevTransactions) {
                    return [...prevTransactions, newData];
                }
                return [newData];
            });
            toast({
                variant: "success",
                title: "Transaction Successful",
                description: `Successfully transferred $${data.amount} from account ${data.source_account_id} to ${data.destination_account_id}.`,
            });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Transaction Failed",
                description: error.message,
            });
        },
    });

    return {
        transactions,
        createTransaction: mutation.mutate,
        isLoading: mutation.isPending,
    };
}
