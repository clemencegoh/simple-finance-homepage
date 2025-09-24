"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Account, NewAccount } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { addOrMergeAccounts } from "@/lib/utils";

// We hit our own NextJS Api route
const BASE_URL = "http://localhost:9002/api";

const getAccount = async (accountId: number): Promise<Account[]> => {
    const response = await fetch(`${BASE_URL}/account/${accountId}}`);
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

    const [accounts, setAccounts] = useState<Account[]>([]);

    const updateAccount = useMutation<Account, Error, number>({
        mutationFn: async (accountId: number) => {
            const response = await fetch(`${BASE_URL}/accounts/${accountId}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to fetch account");
            }
            return response.json();
        },
        onSuccess: (data) => {
            setAccounts((prevAccounts) => {
                if (prevAccounts) {
                    return addOrMergeAccounts(prevAccounts, data);
                }
                return [data];
            });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Failed to retrieve account",
                description: error.message,
            });
        },
    });

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
        accounts: accounts,
        isLoading: mutation.isPending,
        createAccount: mutation.mutate,
        updateAccount: updateAccount.mutate,
    } as const;
}
