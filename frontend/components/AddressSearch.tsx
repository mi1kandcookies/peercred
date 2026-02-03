"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { isAddress } from "viem";

export function AddressSearch() {
  const [searchAddress, setSearchAddress] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAddress(searchAddress)) {
      alert("Please enter a valid Ethereum address");
      return;
    }

    router.push(`/profile/${searchAddress}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        value={searchAddress}
        onChange={(e) => setSearchAddress(e.target.value)}
        placeholder="Search address (0x...)"
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
      >
        Search
      </button>
    </form>
  );
}
