import { Activity, ArrowUpDown, Clock, Database } from "lucide-react";
import type { AddressRelationship } from "../types/blockchain";
import { formatBTC } from "../utils/formatters";

interface MetricsProps {
  data: AddressRelationship;
}

export function RelationshipMetrics({ data }: MetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-blue-500/5 hover:shadow-xl dark:hover:shadow-blue-500/10 transition-all duration-300">
        <div className="flex items-center space-x-3 text-blue-600 dark:text-blue-400 mb-4">
          <ArrowUpDown className="w-8 h-8" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Total Exchanged
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total BTC transferred between addresses
            </p>
          </div>
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {formatBTC(data.totalExchanged)}
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-green-500/5 hover:shadow-xl dark:hover:shadow-green-500/10 transition-all duration-300">
        <div className="flex items-center space-x-3 text-green-600 dark:text-green-400 mb-4">
          <Activity className="w-8 h-8" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Transaction Activity
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Number of transactions between addresses
            </p>
          </div>
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {data.transactionCount}
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-purple-500/5 hover:shadow-xl dark:hover:shadow-purple-500/10 transition-all duration-300">
        <div className="flex items-center space-x-3 text-purple-600 dark:text-purple-400 mb-4">
          <Database className="w-8 h-8" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Average Transaction
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Average value per transaction
            </p>
          </div>
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {formatBTC(data.averageValue)}
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-orange-500/5 hover:shadow-xl dark:hover:shadow-orange-500/10 transition-all duration-300">
        <div className="flex items-center space-x-3 text-orange-600 dark:text-orange-400 mb-4">
          <Clock className="w-8 h-8" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Confirmation Status
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Transaction confirmation breakdown
            </p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Confirmed</span>
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              {data.confirmedCount}
            </span>
          </div>
          <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 dark:bg-green-400 rounded-full"
              style={{
                width: `${
                  (data.confirmedCount /
                    (data.confirmedCount + data.unconfirmedCount)) *
                  100
                }%`,
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Pending</span>
            <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {data.unconfirmedCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
