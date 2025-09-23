"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Account, NewAccount } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const BASE_URL = "http://localhost:8860";

const getAccounts = async (): Promise<Account[]> => {
    const response = await fetch(`${BASE_URL}/accounts`);
    if (!response.ok) {
        throw new Error("Failed to fetch accounts");
    }
    return response.json();
};

const createAccount = async (newAccount: NewAccount): Promise<Account> => {
    const response = await fetch(`${BASE_URL}/accounts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(newAccount),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create account");
    }
    return response.json();
};

export function useAccounts() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const [accounts, setAccounts] = useState<Account[] | null>(null);

    const mutation = useMutation<Account, Error, NewAccount>({
        mutationFn: createAccount,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
            setAccounts((prevAccounts) => {
                if (prevAccounts) {
                    return [...prevAccounts, data];
                }
                return [data];
            });
            toast({
                variant: "success",
                title: "Account Created",
                description: `Account ${data.account_id} created with a balance of $${data.balance}.`,
            });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Account Creation Failed",
                description: error.message,
            });
        },
    });

    return {
        accounts: accounts ?? [],
        isLoading: mutation.isPending,
        createAccount: mutation.mutate,
    };
}
