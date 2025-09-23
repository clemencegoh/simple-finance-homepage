"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Account } from "@/lib/types";
import { Header } from "@/components/header";
import { AccountCreator } from "@/components/account-creator";
import { TransactionForm } from "@/components/transaction-form";
import { AccountList } from "@/components/account-list";

export default function Home() {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<Account[]>([
    { id: "ACC-001", balance: 1000 },
    { id: "ACC-002", balance: 500 },
  ]);

  const handleCreateAccount = (initialBalance: number) => {
    const newId = `ACC-${String(accounts.length + 1).padStart(3, "0")}`;
    const newAccount: Account = {
      id: newId,
      balance: initialBalance,
    };
    setAccounts((prev) => [...prev, newAccount]);
    toast({
      title: "Account Created",
      description: `Account ${newId} created with a balance of $${initialBalance.toFixed(
        2
      )}.`,
    });
  };

  const handleExecuteTransaction = (
    sourceAccountId: string,
    destinationAccountId: string,
    amount: number
  ) => {
    setAccounts((prevAccounts) => {
      const sourceAccount = prevAccounts.find(
        (acc) => acc.id === sourceAccountId
      );
      const destinationAccount = prevAccounts.find(
        (acc) => acc.id === destinationAccountId
      );

      if (!sourceAccount || !destinationAccount) {
        toast({
          variant: "destructive",
          title: "Transaction Failed",
          description: "Invalid source or destination account.",
        });
        return prevAccounts;
      }

      if (sourceAccount.balance < amount) {
        toast({
          variant: "destructive",
          title: "Transaction Failed",
          description: "Insufficient funds.",
        });
        return prevAccounts;
      }

      const newAccounts = prevAccounts.map((acc) => {
        if (acc.id === sourceAccountId) {
          return { ...acc, balance: acc.balance - amount };
        }
        if (acc.id === destinationAccountId) {
          return { ...acc, balance: acc.balance + amount };
        }
        return acc;
      });

      toast({
        title: "Transaction Successful",
        description: `$${amount.toFixed(
          2
        )} transferred from ${sourceAccountId} to ${destinationAccountId}.`,
      });

      return newAccounts;
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1 flex flex-col gap-8">
            <AccountCreator onCreateAccount={handleCreateAccount} />
            <TransactionForm
              accounts={accounts}
              onExecuteTransaction={handleExecuteTransaction}
            />
          </div>
          <div className="lg:col-span-2">
            <AccountList accounts={accounts} />
          </div>
        </div>
      </main>
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with Next.js and ShadCN UI.
          </p>
        </div>
      </footer>
    </div>
  );
}
