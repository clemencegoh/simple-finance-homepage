"use client";

import { useState } from "react";
import { Account } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const initialAccounts: Account[] = [
  { id: 1, balance: 1000 },
  { id: 2, balance: 500 },
  { id: 3, balance: 500 },
  { id: 4, balance: 500 },
  { id: 5, balance: 500 },
  { id: 6, balance: 500 },
  { id: 7, balance: 500 },
  { id: 8, balance: 500 },
  { id: 9, balance: 500 },
  { id: 0, balance: 500 },
  { id: 11, balance: 500 },
];

export function useAccounts() {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);

  const createAccount = (id: number, initialBalance: number) => {
    if (accounts.some((acc) => acc.id === id)) {
      toast({
        variant: "destructive",
        title: "Account Creation Failed",
        description: `Account with ID ${id} already exists.`,
      });
      return;
    }

    const newAccount: Account = {
      id,
      balance: initialBalance,
    };
    setAccounts((prev) => [...prev, newAccount]);
    toast({
      variant: "success",
      title: "Account Created",
      description: `Account ${id} created with a balance of $${initialBalance.toFixed(
        2
      )}.`,
    });
  };

  return { accounts, createAccount, setAccounts } as const;
}