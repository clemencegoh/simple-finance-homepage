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
import type { Account } from "@/lib/types";
import { Landmark } from "lucide-react";

type AccountListProps = {
  accounts: Account[];
};

export function AccountList({ accounts }: AccountListProps) {
  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <CardTitle>Account Balances</CardTitle>
        <CardDescription>
          A summary of all your accounts and their current balances.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {accounts.length > 0 ? (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account ID</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.id}</TableCell>
                    <TableCell className="text-right font-mono">
                      ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border border-dashed rounded-md h-full">
            <Landmark className="w-10 h-10 mb-4" />
            <p className="font-semibold">No accounts yet.</p>
            <p>Create an account to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
