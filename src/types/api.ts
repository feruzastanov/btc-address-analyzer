export interface BlockCypherInput {
    addresses?: string[];
    value?: number;
  }
  
  export interface BlockCypherOutput {
    addresses?: string[];
    value?: number;
  }
  
  export interface BlockCypherTransaction {
    hash: string;
    confirmed: boolean;
    total: number;
    fees: number;
    received: string;
    confirmations: number;
    inputs: BlockCypherInput[];
    outputs: BlockCypherOutput[];
  }
  
  export interface BlockCypherAddressResponse {
    address: string;
    total_received: number;
    total_sent: number;
    balance: number;
    unconfirmed_balance: number;
    final_balance: number;
    n_tx: number;
    txs: BlockCypherTransaction[];
  }