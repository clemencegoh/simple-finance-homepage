export type Account = {
  account_id: number;
  balance: string;
};


export type NewAccount = {
  account_id: number;
  initial_balance: string;
};

export type Transaction = {
  source_account_id: number;
  destination_account_id: number;
  amount: string;
  timestamp?: string;
};