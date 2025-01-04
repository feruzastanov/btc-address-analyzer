import { useState } from "react";
import { Bitcoin } from "lucide-react";
import { AddressForm } from "./components/AddressForm";
import { AddressMetrics } from "./components/AddressMetrics";
import { RelationshipMetrics } from "./components/RelationshipMetrics";
import { TransactionList } from "./components/TransactionList";
import { BTCPriceChart } from "./components/BTCPriceChart";
import { BTCCalculator } from "./components/BTCCalculator";
import { ThemeToggle } from "./components/ThemeToggle";
import { analyzeAddressRelationship } from "./services/blockchainApi";
import type { AddressRelationship } from "./types/blockchain";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [relationshipData, setRelationshipData] =
    useState<AddressRelationship | null>(null);
  const [addressInfo, setAddressInfo] = useState<any>(null);

  const handleAnalyze = async (address1: string, address2: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await analyzeAddressRelationship(address1, address2);
      setRelationshipData(data);
      setAddressInfo(data.addressInfo);
    } catch (err) {
      setError(
        "Failed to analyze addresses. Please check the addresses and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <ThemeToggle />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Bitcoin className="w-16 h-16 text-blue-600 dark:text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Bitcoin Address Analyzer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore the relationship between two Bitcoin addresses and discover
            their shared transaction history
          </p>
        </div>

        <AddressForm onAnalyze={handleAnalyze} isLoading={isLoading} />

        {error && (
          <div className="mt-4 bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {addressInfo && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Address Overview
            </h2>
            <AddressMetrics
              address={addressInfo.address}
              totalReceived={addressInfo.total_received}
              totalSent={addressInfo.total_sent}
              balance={addressInfo.balance}
              transactionCount={addressInfo.n_tx}
              unconfirmedBalance={addressInfo.unconfirmed_balance}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <BTCPriceChart />
          <BTCCalculator />
        </div>

        {relationshipData && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Relationship Analysis
            </h2>
            <RelationshipMetrics data={relationshipData} />
            <TransactionList transactions={relationshipData.transactions} />
          </div>
        )}
      </div>
    </div>
  );
}
