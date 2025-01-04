export interface Transaction {
  hash: string;
  confirmed: boolean;
  total: number;
  exchangedAmount: number;
  fees: number;
  received: string;
  confirmations: number;
}

export interface AddressInfo {
  address: string;
  total_received: number;
  total_sent: number;
  balance: number;
  unconfirmed_balance: number;
  final_balance: number;
  n_tx: number;
  transactions: Transaction[];
}
export interface AddressRelationship {
  addressInfo: AddressInfo;
  totalExchanged: number;
  transactionCount: number;
  averageValue: number;
  confirmedCount: number;
  unconfirmedCount: number;
  transactions: Transaction[];
}