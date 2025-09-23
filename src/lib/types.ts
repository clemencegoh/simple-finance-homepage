export type Account = {
  id: number;
  balance: number;
};

export type Transaction = {
  sourceAccountId: number;
  destinationAccountId: number;
  amount: number;
  timestamp: Date;
};
