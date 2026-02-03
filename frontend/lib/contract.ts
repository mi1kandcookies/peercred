// PeerCred Contract ABI and Address
// Update CONTRACT_ADDRESS after deploying to Base Sepolia

export const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000" as const;

export const PEER_CRED_ABI = [
  {
    type: "function",
    name: "attest",
    inputs: [
      { name: "to", type: "address", internalType: "address" },
      { name: "attestationType", type: "string", internalType: "string" },
      { name: "message", type: "string", internalType: "string" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getAttestationsReceived",
    inputs: [{ name: "user", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct PeerCred.Attestation[]",
        components: [
          { name: "from", type: "address", internalType: "address" },
          { name: "to", type: "address", internalType: "address" },
          { name: "attestationType", type: "string", internalType: "string" },
          { name: "message", type: "string", internalType: "string" },
          { name: "timestamp", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAttestationsGiven",
    inputs: [{ name: "user", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct PeerCred.Attestation[]",
        components: [
          { name: "from", type: "address", internalType: "address" },
          { name: "to", type: "address", internalType: "address" },
          { name: "attestationType", type: "string", internalType: "string" },
          { name: "message", type: "string", internalType: "string" },
          { name: "timestamp", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "attestationCountReceived",
    inputs: [{ name: "user", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "attestationCountGiven",
    inputs: [{ name: "user", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalAttestations",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAttestation",
    inputs: [{ name: "id", type: "uint256", internalType: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct PeerCred.Attestation",
        components: [
          { name: "from", type: "address", internalType: "address" },
          { name: "to", type: "address", internalType: "address" },
          { name: "attestationType", type: "string", internalType: "string" },
          { name: "message", type: "string", internalType: "string" },
          { name: "timestamp", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "AttestationCreated",
    inputs: [
      { name: "id", type: "uint256", indexed: true, internalType: "uint256" },
      { name: "from", type: "address", indexed: true, internalType: "address" },
      { name: "to", type: "address", indexed: true, internalType: "address" },
      { name: "attestationType", type: "string", indexed: false, internalType: "string" },
      { name: "message", type: "string", indexed: false, internalType: "string" },
      { name: "timestamp", type: "uint256", indexed: false, internalType: "uint256" },
    ],
    anonymous: false,
  },
] as const;

// Predefined attestation types
export const ATTESTATION_TYPES = [
  { value: "hackathon", label: "Hackathon" },
  { value: "collaboration", label: "Collaboration" },
  { value: "expertise", label: "Expertise" },
  { value: "mentorship", label: "Mentorship" },
  { value: "contribution", label: "Contribution" },
  { value: "recommendation", label: "Recommendation" },
] as const;
