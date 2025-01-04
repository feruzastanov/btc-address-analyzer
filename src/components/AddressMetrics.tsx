import { Wallet, ArrowUpDown, CircleDollarSign, History } from "lucide-react";
import { formatBTC } from "../utils/formatters";

interface AddressMetricsProps {
  address: string;
  totalReceived: number;
  totalSent: number;
  balance: number;
  transactionCount: number;
  unconfirmedBalance: number;
}

export function AddressMetrics({
  totalReceived,
  totalSent,
  balance,
  transactionCount,
  unconfirmedBalance,
}: AddressMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg dark:shadow-gray-900/30">
        <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-500 mb-4">
          <Wallet className="w-6 h-6" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Current Balance
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Final balance in BTC
            </p>
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {formatBTC(balance)}
        </p>
        {unconfirmedBalance > 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Pending: {formatBTC(unconfirmedBalance)}
          </p>
        )}
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg dark:shadow-gray-900/30">
        <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-500 mb-4">
          <ArrowUpDown className="w-6 h-6" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Total Received
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              All time incoming BTC
            </p>
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {formatBTC(totalReceived)}
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg dark:shadow-gray-900/30">
        <div className="flex items-center space-x-2 text-red-600 dark:text-red-500 mb-4">
          <CircleDollarSign className="w-6 h-6" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Total Sent
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              All time outgoing BTC
            </p>
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {formatBTC(totalSent)}
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg dark:shadow-gray-900/30">
        <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-500 mb-4">
          <History className="w-6 h-6" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Transaction Count
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Number of transactions
            </p>
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {transactionCount}
        </p>
      </div>
    </div>
  );
}
