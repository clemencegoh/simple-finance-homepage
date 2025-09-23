"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { AccountCreator } from "@/components/account-creator";
import { TransactionForm } from "@/components/transaction-form";
import { AccountList } from "@/components/account-list";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TransactionHistory } from "@/components/transaction-history";
import { useAccounts } from "@/hooks/use-accounts";
import { useTransactions } from "@/hooks/use-transactions";

export default function Home() {
    const { accounts, createAccount } = useAccounts();
    const { createTransaction, transactions } = useTransactions();
    const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] =
        useState(false);

    const handleCreateAccount = (id: number, initialBalance: number) => {
        createAccount({
            account_id: id,
            initial_balance: String(initialBalance),
        });
        setIsCreateAccountModalOpen(false);
    };

    const handleExecuteTransaction = (
        sourceAccountId: number,
        destinationAccountId: number,
        amount: number
    ) => {
        createTransaction({
            source_account_id: sourceAccountId,
            destination_account_id: destinationAccountId,
            amount: String(amount),
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto p-4 md:p-8">
                <div className="grid gap-4 lg:grid-cols-5">
                    <div className="lg:col-span-3 flex flex-col gap-4">
                        <AccountList
                            onOpenCreateAccountModal={() =>
                                setIsCreateAccountModalOpen(true)
                            }
                        />
                        <TransactionHistory transactions={transactions} />
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
