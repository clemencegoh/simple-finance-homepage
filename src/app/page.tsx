"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Account } from "@/lib/types";
import { Header } from "@/components/header";
import { AccountCreator } from "@/components/account-creator";
import { TransactionForm } from "@/components/transaction-form";
import { AccountList } from "@/components/account-list";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function Home() {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 1, balance: 1000 },
    { id: 2, balance: 500 },
  ]);
  const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] =
    useState(false);

  const handleCreateAccount = (id: number, initialBalance: number) => {
    if (accounts.some((acc) => acc.id === id)) {
      toast({
        variant: "destructive",
        title: "Account Creation Failed",
        description: `An account with ID ${id} already exists.`,
      });
      return;
    }

    const newAccount: Account = {
      id,
      balance: initialBalance,
    };
    setAccounts((prev) => [...prev, newAccount]);
    toast({
      title: "Account Created",
      description: `Account ${id} created with a balance of $${initialBalance.toFixed(
        2
      )}.`,
    });
    setIsCreateAccountModalOpen(false);
  };

  const handleExecuteTransaction = (
    sourceAccountId: number,
    destinationAccountId: number,
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
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3 flex flex-col gap-8">
            <AccountList
              accounts={accounts}
              onOpenCreateAccountModal={() => setIsCreateAccountModalOpen(true)}
            />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-8">
            <TransactionForm
              accounts={accounts}
              onExecuteTransaction={handleExecuteTransaction}
            />
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
      <Dialog
        open={isCreateAccountModalOpen}
        onOpenChange={setIsCreateAccountModalOpen}
      >
        <DialogContent>
          <AccountCreator onCreateAccount={handleCreateAccount} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
