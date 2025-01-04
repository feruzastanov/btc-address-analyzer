import { useState } from "react";
import { Calculator } from "lucide-react";
import { useBTCPrice } from "../hooks/useBTCPrice";

export function BTCCalculator() {
  const [amount, setAmount] = useState<string>("1");
  const { price, loading, error } = useBTCPrice();

  const usdValue = price ? (parseFloat(amount) || 0) * price : 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg dark:shadow-purple-500/5 hover:shadow-xl dark:hover:shadow-purple-500/10 transition-all duration-300">
      <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 mb-4">
        <Calculator className="w-6 h-6" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          BTC to USD Calculator
        </h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Amount (BTC)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full h-12 px-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Enter BTC amount"
            step="0.00000001"
          />
        </div>
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">
              Current BTC Price:
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {loading ? (
                "Loading..."
              ) : error ? (
                <span className="text-red-600 dark:text-red-400">
                  Error fetching price
                </span>
              ) : (
                `$${price?.toLocaleString()}`
              )}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-600 dark:text-gray-400">
              Value in USD:
            </span>
            <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
              {loading
                ? "..."
                : error
                ? "-"
                : `$${usdValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
