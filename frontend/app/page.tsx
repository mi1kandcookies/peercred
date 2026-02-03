"use client";

import { useAccount } from "wagmi";
import { WalletConnect } from "@/components/WalletConnect";
import { AttestationForm } from "@/components/AttestationForm";
import { AddressSearch } from "@/components/AddressSearch";
import Link from "next/link";

export default function Home() {
  const { isConnected, address } = useAccount();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">PeerCred</h1>
          <WalletConnect />
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Issue verifiable on-chain attestations to recognize peers for their
          contributions, expertise, and collaboration.
        </p>

        {/* Search */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Search Attestations</h2>
          <AddressSearch />
        </div>

        {/* Main Content */}
        {isConnected ? (
          <div className="space-y-8">
            {/* Quick Links */}
            <div className="flex gap-4">
              <Link
                href={`/profile/${address}`}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                View My Profile
              </Link>
            </div>

            {/* Attestation Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Issue Attestation</h2>
              <AttestationForm />
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              Connect your wallet to issue attestations
            </p>
            <WalletConnect />
          </div>
        )}
      </div>
    </main>
  );
}
