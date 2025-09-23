import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { History } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { useTransactions } from "@/hooks/use-transactions";

export function TransactionHistory() {
  const { transactions } = useTransactions();
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
        {transactions.length > 0 ? (
          <ScrollArea className="h-48">
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction, index) => (
                    <TableRow key={transaction.timestamp.toISOString()} data-testid={`row-${transaction.timestamp.toISOString()}`}>
                      <TableCell className="font-medium" data-testid="cell-source-account-id">
                        {transaction.sourceAccountId}
                      </TableCell>
                      <TableCell className="font-medium" data-testid="cell-destination-account-id">
                        {transaction.destinationAccountId}
                      </TableCell>
                      <TableCell className="text-right font-mono" data-testid="cell-amount">
                        $
                        {transaction.amount.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell data-testid="cell-datetime">
                        {transaction.timestamp.toLocaleTimeString()}
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
