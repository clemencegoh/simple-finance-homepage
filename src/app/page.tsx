'use client';

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Transaction } from "@/lib/types";
import { Header } from "@/components/header";
import { AccountCreator } from "@/components/account-creator";
import { TransactionForm } from "@/components/transaction-form";
import { AccountList } from "@/components/account-list";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TransactionHistory } from "@/components/transaction-history";
import { useAccounts } from "@/hooks/use-accounts";
import { useTransactions } from "@/hooks/use-transactions";

export default function Home() {
  const { toast } = useToast();
  const { accounts, createAccount, setAccounts } = useAccounts();
  const { addTransaction } = useTransactions();
  const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] =
    useState(false);

  const handleCreateAccount = (id: number, initialBalance: number) => {
    createAccount(id, initialBalance);
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
        variant: "success",
        title: "Transaction Successful",
        description: `$${amount.toFixed(
          2
        )} transferred from ${sourceAccountId} to ${destinationAccountId}.`,
      });

      const newTransaction: Transaction = {
        sourceAccountId,
        destinationAccountId,
        amount,
        timestamp: new Date(),
      };
      addTransaction(newTransaction);

      return newAccounts;
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="grid gap-4 lg:grid-cols-5">
          <div className="lg:col-span-3 flex flex-col gap-4">
            <AccountList
              onOpenCreateAccountModal={() => setIsCreateAccountModalOpen(true)}
            />
            <TransactionHistory />
          </div>
          <div className="lg:col-span-2 h-full justify-center flex flex-col gap-4">
            <TransactionForm
              accounts={accounts}
              onExecuteTransaction={handleExecuteTransaction}
            />
          </div>
        </div>
      </main>
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
