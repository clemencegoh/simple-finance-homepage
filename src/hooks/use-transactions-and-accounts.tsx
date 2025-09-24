import { useAccounts } from "./use-accounts";
import { useTransactions } from "./use-transactions";

export function useTransactionsAndAccounts() {
    const { accounts, createAccount, isLoading, updateAccount } = useAccounts();
    const { transactions, createTransaction } = useTransactions(updateAccount);

    return {
        accounts,
        createAccount,
        isLoading,
        transactions,
        createTransaction,
    } as const;
}
