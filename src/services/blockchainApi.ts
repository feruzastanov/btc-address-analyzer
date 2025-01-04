import type { BlockCypherAddressResponse, BlockCypherTransaction } from '../types/api';
import type { AddressInfo, AddressRelationship, Transaction } from '../types/blockchain';

const BLOCKCYPHER_TOKEN = import.meta.env.VITE_BLOCKCYPHER_TOKEN;
const BASE_URL = 'https://api.blockcypher.com/v1/btc/main';

export async function getAddressInfo(address: string): Promise<AddressInfo> {
  const response = await fetch(
    `${BASE_URL}/addrs/${address}/full?token=${BLOCKCYPHER_TOKEN}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch address information');
  }
  const data: BlockCypherAddressResponse = await response.json();
  return {
    address: data.address,
    total_received: data.total_received,
    total_sent: data.total_sent,
    balance: data.balance,
    unconfirmed_balance: data.unconfirmed_balance,
    final_balance: data.final_balance,
    n_tx: data.n_tx,
    transactions: []
  };
}

function processTransaction(
  tx: BlockCypherTransaction,
  address1: string,
  address2: string
): Transaction & { exchangedAmount: number } {
  const outputs = tx.outputs || [];
  const inputs = tx.inputs || [];
  let exchangedAmount = 0;
  
  if (inputs.some(input => input.addresses?.includes(address1))) {
    outputs.forEach(output => {
      if (output.addresses?.includes(address2)) {
        exchangedAmount += output.value || 0;
      }
    });
  }
  
  if (inputs.some(input => input.addresses?.includes(address2))) {
    outputs.forEach(output => {
      if (output.addresses?.includes(address1)) {
        exchangedAmount += output.value || 0;
      }
    });
  }

  return {
    hash: tx.hash,
    confirmed: !!tx.confirmed,
    total: tx.total || 0,
    exchangedAmount,
    fees: tx.fees || 0,
    received: tx.received,
    confirmations: tx.confirmations || 0
  };
}

export async function analyzeAddressRelationship(
  address1: string,
  address2: string
): Promise<AddressRelationship> {
  const info1 = await getAddressInfo(address1);
  const response = await fetch(
    `${BASE_URL}/addrs/${address1}/full?token=${BLOCKCYPHER_TOKEN}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch address information');
  }
  
  const data: BlockCypherAddressResponse = await response.json();
  const transactions = data.txs || [];

  const relatedTransactions = transactions.filter((tx) => {
    const outputs = tx.outputs || [];
    const inputs = tx.inputs || [];
    
    return outputs.some((output) => output.addresses?.includes(address2)) ||
           inputs.some((input) => input.addresses?.includes(address2));
  });

  let totalExchanged = 0;
  const processedTransactions = relatedTransactions.map(tx => {
    const processed = processTransaction(tx, address1, address2);
    totalExchanged += processed.exchangedAmount;
    return processed;
  });

  const confirmedTxs = processedTransactions.filter((tx) => tx.confirmed);

  return {
    addressInfo: info1,
    totalExchanged,
    transactionCount: processedTransactions.length,
    averageValue: totalExchanged / (processedTransactions.length || 1),
    confirmedCount: confirmedTxs.length,
    unconfirmedCount: processedTransactions.length - confirmedTxs.length,
    transactions: processedTransactions
  };
}