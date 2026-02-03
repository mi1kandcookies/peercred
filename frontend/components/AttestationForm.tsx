"use client";

import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { isAddress } from "viem";
import { CONTRACT_ADDRESS, PEER_CRED_ABI, ATTESTATION_TYPES } from "@/lib/contract";

export function AttestationForm() {
  const [toAddress, setToAddress] = useState("");
  const [attestationType, setAttestationType] = useState(ATTESTATION_TYPES[0].value);
  const [message, setMessage] = useState("");

  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAddress(toAddress)) {
      alert("Please enter a valid Ethereum address");
      return;
    }

    if (message.length === 0 || message.length > 500) {
      alert("Message must be between 1 and 500 characters");
      return;
    }

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: PEER_CRED_ABI,
      functionName: "attest",
      args: [toAddress as `0x${string}`, attestationType, message],
    });
  };

  const resetForm = () => {
    setToAddress("");
    setMessage("");
    setAttestationType(ATTESTATION_TYPES[0].value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="toAddress" className="block text-sm font-medium mb-1">
          Recipient Address
        </label>
        <input
          type="text"
          id="toAddress"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          placeholder="0x..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
          required
        />
      </div>

      <div>
        <label htmlFor="attestationType" className="block text-sm font-medium mb-1">
          Attestation Type
        </label>
        <select
          id="attestationType"
          value={attestationType}
          onChange={(e) => setAttestationType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
        >
          {ATTESTATION_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Message ({message.length}/500)
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe why you're issuing this attestation..."
          rows={4}
          maxLength={500}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isPending || isConfirming}
        className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isPending
          ? "Confirm in Wallet..."
          : isConfirming
          ? "Confirming..."
          : "Issue Attestation"}
      </button>

      {isSuccess && (
        <div className="p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
          <p className="font-medium">Attestation issued successfully!</p>
          <a
            href={`https://sepolia.basescan.org/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline"
          >
            View on Basescan
          </a>
          <button
            type="button"
            onClick={resetForm}
            className="ml-4 text-sm underline"
          >
            Issue another
          </button>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error.message}</p>
        </div>
      )}
    </form>
  );
}
