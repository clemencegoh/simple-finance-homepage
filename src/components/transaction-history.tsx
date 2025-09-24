import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { History } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { Transaction } from "@/lib/types";

export type Props = {
    transactions: Transaction[] | null;
};

export function TransactionHistory({ transactions }: Readonly<Props>) {
    const transactionsPresent = !!transactions && transactions.length > 0;

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    <div className="grid gap-1">
                        <CardTitle>Transaction History</CardTitle>
                        <CardDescription>
                            A log of all transfers between accounts.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {transactionsPresent ? (
                    <ScrollArea className="h-64 overflow-auto">
                        <div className="border rounded-md">
                            <Table data-testid="transaction-history-table">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Source</TableHead>
                                        <TableHead>Destination</TableHead>
                                        <TableHead className="text-right">
                                            Amount
                                        </TableHead>
                                        <TableHead>Time</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions?.map((transaction, index) => (
                                        <TableRow
                                            key={transaction?.timestamp}
                                            data-testid={
                                                "row-transaction-history"
                                            }
                                        >
                                            <TableCell
                                                className="font-medium"
                                                data-testid="cell-source-account-id"
                                            >
                                                {transaction.source_account_id}
                                            </TableCell>
                                            <TableCell
                                                className="font-medium"
                                                data-testid="cell-destination-account-id"
                                            >
                                                {
                                                    transaction.destination_account_id
                                                }
                                            </TableCell>
                                            <TableCell
                                                className="text-right font-mono"
                                                data-testid="cell-amount"
                                            >
                                                ${transaction.amount}
                                            </TableCell>
                                            <TableCell data-testid="cell-datetime">
                                                {transaction.timestamp}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </ScrollArea>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border border-dashed rounded-md h-full">
                        <History className="w-10 h-10 mb-4" />
                        <p className="font-semibold">No transactions yet.</p>
                        <p>Your transaction history will appear here.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
