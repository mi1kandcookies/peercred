"use client";

import { useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, PEER_CRED_ABI, ATTESTATION_TYPES } from "@/lib/contract";
import Link from "next/link";

interface Attestation {
  from: `0x${string}`;
  to: `0x${string}`;
  attestationType: string;
  message: string;
  timestamp: bigint;
}

interface AttestationListProps {
  address: `0x${string}`;
  type: "received" | "given";
  filterType?: string;
}

function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatDate(timestamp: bigint): string {
  return new Date(Number(timestamp) * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getTypeLabel(value: string): string {
  const type = ATTESTATION_TYPES.find((t) => t.value === value);
  return type?.label || value;
}

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    hackathon: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    collaboration: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    expertise: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    mentorship: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    contribution: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    recommendation: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  };
  return colors[type] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
}

export function AttestationList({ address, type, filterType }: AttestationListProps) {
  const functionName = type === "received" ? "getAttestationsReceived" : "getAttestationsGiven";

  const { data: attestations, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: PEER_CRED_ABI,
    functionName,
    args: [address],
  });

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-500">
        Loading attestations...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading attestations: {error.message}
      </div>
    );
  }

  const filteredAttestations = filterType
    ? (attestations as Attestation[])?.filter((a) => a.attestationType === filterType)
    : (attestations as Attestation[]);

  if (!filteredAttestations || filteredAttestations.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No attestations {type === "received" ? "received" : "given"} yet.
      </div>
    );
  }

  // Sort by timestamp descending (newest first)
  const sortedAttestations = [...filteredAttestations].sort(
    (a, b) => Number(b.timestamp) - Number(a.timestamp)
  );

  return (
    <div className="space-y-4">
      {sortedAttestations.map((attestation, index) => (
        <div
          key={`${attestation.from}-${attestation.to}-${attestation.timestamp}-${index}`}
          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
        >
          <div className="flex items-start justify-between mb-2">
            <span
              className={`px-2 py-1 text-xs font-medium rounded ${getTypeColor(
                attestation.attestationType
              )}`}
            >
              {getTypeLabel(attestation.attestationType)}
            </span>
            <span className="text-sm text-gray-500">
              {formatDate(attestation.timestamp)}
            </span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-3">
            {attestation.message}
          </p>

          <div className="text-sm text-gray-500">
            {type === "received" ? (
              <span>
                From:{" "}
                <Link
                  href={`/profile/${attestation.from}`}
                  className="text-blue-600 hover:underline"
                >
                  {formatAddress(attestation.from)}
                </Link>
              </span>
            ) : (
              <span>
                To:{" "}
                <Link
                  href={`/profile/${attestation.to}`}
                  className="text-blue-600 hover:underline"
                >
                  {formatAddress(attestation.to)}
                </Link>
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
