# PeerCred

A minimal Web3 reputation app where users can issue verifiable attestations to other wallet addresses. Built on Base with Next.js frontend.

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/mi1kandcookies/peercred.git
cd peercred

# 2. Install dependencies
cd frontend && npm install

# 3. Set up environment (REQUIRED for wallet connection)
cp .env.example .env.local
# Edit .env.local and add your WalletConnect Project ID
# Get one free at: https://cloud.walletconnect.com

# 4. Run the app
npm run dev
# Open http://localhost:3000
```

### Required Setup Checklist

- [ ] **WalletConnect Project ID** - Get from [cloud.walletconnect.com](https://cloud.walletconnect.com) (free)
- [ ] **Deploy Contract** - See [Contract Deployment](#smart-contract-deployment) section
- [ ] **Update Contract Address** - Edit `frontend/lib/contract.ts` with deployed address
- [ ] **Base Sepolia ETH** - Get testnet ETH from [Base Faucet](https://www.coinbase.com/faucets/base-sepolia-faucet)

## Features

- Connect wallet via RainbowKit
- Issue attestations to any address (type + message)
- View attestations received
- View attestations given
- Search attestations for any address
- Filter by attestation type

## Tech Stack

- **Blockchain**: Base Sepolia (testnet) / Base (mainnet)
- **Smart Contract**: Solidity + Hardhat
- **Frontend**: Next.js 14 + TypeScript
- **Wallet**: wagmi v2 + viem + RainbowKit
- **Styling**: Tailwind CSS

## Project Structure

```
peercred/
├── contracts/           # Smart contract
│   ├── contracts/
│   │   └── PeerCred.sol
│   ├── scripts/
│   │   └── deploy.ts
│   ├── hardhat.config.ts
│   └── package.json
├── frontend/            # Next.js app
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── profile/[address]/page.tsx
│   ├── components/
│   │   ├── AttestationForm.tsx
│   │   ├── AttestationList.tsx
│   │   ├── AddressSearch.tsx
│   │   └── WalletConnect.tsx
│   ├── lib/
│   │   ├── contract.ts
│   │   └── wagmi.ts
│   └── package.json
└── README.md
```

## Setup

### Prerequisites

- Node.js 18+
- A wallet with Base Sepolia ETH (get from [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-sepolia-faucet))
- WalletConnect Project ID (get from [WalletConnect Cloud](https://cloud.walletconnect.com))

### Smart Contract Deployment

1. Navigate to contracts directory:
   ```bash
   cd contracts
   npm install
   ```

2. Create `.env` file:
   ```bash
   cp .env.example .env
   # Edit .env with your private key and Basescan API key
   ```

3. Deploy to Base Sepolia:
   ```bash
   npm run deploy:sepolia
   ```

4. Copy the deployed contract address and update `frontend/lib/contract.ts`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   npm install
   ```

2. Create `.env.local` file:
   ```bash
   cp .env.example .env.local
   # Edit with your WalletConnect project ID
   ```

3. Update the contract address in `lib/contract.ts` with your deployed address

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Usage

1. Connect your wallet using the "Connect Wallet" button
2. To issue an attestation:
   - Enter the recipient's wallet address
   - Select an attestation type
   - Write a message (max 500 characters)
   - Click "Issue Attestation" and confirm the transaction
3. View your profile to see attestations you've received and given
4. Search for any address to view their attestations

## Attestation Types

- **Hackathon**: Recognize hackathon participation/wins
- **Collaboration**: Acknowledge collaborative work
- **Expertise**: Vouch for technical expertise
- **Mentorship**: Recognize mentoring contributions
- **Contribution**: Acknowledge project contributions
- **Recommendation**: General recommendation

## Smart Contract

The `PeerCred.sol` contract stores attestations on-chain with:
- Issuer address (`from`)
- Recipient address (`to`)
- Attestation type (string)
- Message (max 500 chars)
- Timestamp

View functions allow querying attestations by address (received or given).

## License

MIT
