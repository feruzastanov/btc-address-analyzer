import React, { useState } from "react";
import { Search, X } from "lucide-react";

interface AddressFormProps {
  onAnalyze: (address1: string, address2: string) => void;
  isLoading: boolean;
}

export function AddressForm({ onAnalyze, isLoading }: AddressFormProps) {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address1 && address2) {
      onAnalyze(address1, address2);
    }
  };

  const clearInput = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter("");
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg dark:shadow-purple-500/5 hover:shadow-xl dark:hover:shadow-purple-500/10 transition-all duration-300">
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            placeholder="Enter first Bitcoin address"
            className="w-full h-14 px-6 pr-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            disabled={isLoading}
          />
          {address1 && (
            <button
              type="button"
              onClick={() => clearInput(setAddress1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="flex-1 relative">
          <input
            type="text"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            placeholder="Enter second Bitcoin address"
            className="w-full h-14 px-6 pr-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            disabled={isLoading}
          />
          {address2 && (
            <button
              type="button"
              onClick={() => clearInput(setAddress2)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading || !address1 || !address2}
          className="h-14 px-8 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 dark:disabled:bg-purple-800 text-white rounded-xl transition-all duration-200 ease-in-out disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[200px] shadow-lg hover:shadow-purple-500/50"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
          ) : (
            <>
              <Search className="w-5 h-5" />
              Analyze
            </>
          )}
        </button>
      </form>
    </div>
  );
}
