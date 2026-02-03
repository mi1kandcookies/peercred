# PeerCred Roadmap

## Current Status: MVP Complete

The core functionality is implemented and ready for deployment:
- Smart contract with attestation logic
- Frontend with wallet connection, attestation creation, and profile viewing
- Base Sepolia testnet configuration

---

## Future Improvements

### High Priority

- [ ] **Smart Contract Tests** - Add comprehensive Hardhat test suite covering all contract functions, edge cases, and failure scenarios
- [ ] **Frontend Tests** - Add React Testing Library / Jest tests for components
- [ ] **Error Boundaries** - Implement React error boundaries for graceful failure handling
- [ ] **Input Validation** - Enhanced client-side validation with better error messages
- [ ] **Auto-generated TypeScript Types** - Generate contract types from ABI using TypeChain for better type safety

### Medium Priority

- [ ] **Loading States** - Add skeleton loaders and better loading UX
- [ ] **Mobile Responsiveness** - Improve mobile layout and touch interactions
- [ ] **ENS Resolution** - Display ENS names instead of raw addresses where available
- [ ] **Pagination** - Add pagination for users with many attestations
- [ ] **Transaction History** - Show pending/recent transactions in UI

### Nice to Have

- [ ] **CI/CD Pipeline** - GitHub Actions for automated testing and deployment
- [ ] **Mainnet Deployment** - Deploy to Base mainnet with production configuration
- [ ] **Off-chain Indexing** - Add subgraph or indexer for faster queries at scale
- [ ] **Attestation Search** - Search attestations by type, message content, or date range
- [ ] **Social Sharing** - Share attestation links with Open Graph previews
- [ ] **Dark/Light Mode Toggle** - Manual theme switching
- [ ] **Accessibility Audit** - WCAG compliance improvements

### Potential Features

- [ ] **Attestation Revocation** - Allow issuers to revoke attestations
- [ ] **Custom Attestation Types** - Let users define their own attestation categories
- [ ] **Reputation Score** - Calculate aggregate reputation based on attestations received
- [ ] **Organization Attestations** - Multi-sig or DAO-based attestations
- [ ] **Cross-chain Support** - Deploy to other EVM chains

---

## Contributing

Contributions are welcome! Please open an issue to discuss proposed changes before submitting a PR.
