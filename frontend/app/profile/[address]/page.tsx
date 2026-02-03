"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useAccount, useReadContract } from "wagmi";
import { isAddress } from "viem";
import Link from "next/link";
import { WalletConnect } from "@/components/WalletConnect";
import { AttestationList } from "@/components/AttestationList";
import { AddressSearch } from "@/components/AddressSearch";
import { CONTRACT_ADDRESS, PEER_CRED_ABI, ATTESTATION_TYPES } from "@/lib/contract";

function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function ProfilePage() {
  const params = useParams();
  const profileAddress = params.address as string;
  const { address: connectedAddress } = useAccount();
  const [activeTab, setActiveTab] = useState<"received" | "given">("received");
  const [filterType, setFilterType] = useState<string>("");

  const isValidAddress = isAddress(profileAddress);
  const isOwnProfile =
    connectedAddress?.toLowerCase() === profileAddress?.toLowerCase();

  const { data: receivedCount } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: PEER_CRED_ABI,
    functionName: "attestationCountReceived",
    args: isValidAddress ? [profileAddress as `0x${string}`] : undefined,
  });

  const { data: givenCount } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: PEER_CRED_ABI,
    functionName: "attestationCountGiven",
    args: isValidAddress ? [profileAddress as `0x${string}`] : undefined,
  });

  if (!isValidAddress) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="text-3xl font-bold hover:opacity-80">
              PeerCred
            </Link>
            <WalletConnect />
          </div>
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">Invalid address</p>
            <Link href="/" className="text-blue-600 hover:underline mt-4 block">
              Go back home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-3xl font-bold hover:opacity-80">
            PeerCred
          </Link>
          <WalletConnect />
        </div>

        {/* Search */}
        <div className="mb-8">
          <AddressSearch />
        </div>

        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                {isOwnProfile ? "Your Profile" : "Profile"}
              </h2>
              <p className="text-gray-500 font-mono text-sm mt-1">
                {formatAddress(profileAddress)}
              </p>
              <a
                href={`https://sepolia.basescan.org/address/${profileAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm hover:underline"
              >
                View on Basescan
              </a>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {receivedCount?.toString() || "0"}
              </div>
              <div className="text-sm text-gray-500">Received</div>
              <div className="text-lg font-semibold mt-2">
                {givenCount?.toString() || "0"}
              </div>
              <div className="text-sm text-gray-500">Given</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab("received")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "received"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Received ({receivedCount?.toString() || "0"})
          </button>
          <button
            onClick={() => setActiveTab("given")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "given"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Given ({givenCount?.toString() || "0"})
          </button>
        </div>

        {/* Filter */}
        <div className="mb-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
          >
            <option value="">All Types</option>
            {ATTESTATION_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Attestation List */}
        <AttestationList
          address={profileAddress as `0x${string}`}
          type={activeTab}
          filterType={filterType || undefined}
        />

        {/* Issue attestation link */}
        {!isOwnProfile && (
          <div className="mt-8 text-center">
            <Link
              href={`/?to=${profileAddress}`}
              className="text-blue-600 hover:underline"
            >
              Issue an attestation to this address
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
