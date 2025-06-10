# Gelato Sponsored Transactions Demo

This project demonstrates how to implement sponsored transactions using Gelato Relay, allowing you to cover gas fees for your users' transactions. It includes both ERC2771 and non-ERC2771 implementations.

## Features

- ERC2771 sponsored calls with trusted forwarder
- Basic sponsored calls without ERC2771
- Counter contract example with both implementations
- TypeScript implementation using viem
- Hardhat integration for contract deployment

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Gelato account with API key
- Sepolia ETH in your 1Balance account for testnet transactions

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd how-to-relay-send-sponsored-txns
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
GELATO_RELAY_API_KEY=your_api_key_here
PRIVATE_KEY=your_wallet_private_key
RPC_URL=your_sepolia_rpc_url
```

## Contract Deployment

Deploy the Counter contract to Sepolia:
```bash
npm run deploy
```

After deployment, update the `COUNTER_ADDRESS` in both `src/sponsoredCallSimple.ts` and `src/sponsoredCallBasic.ts` with your deployed contract address.

## Usage

### ERC2771 Sponsored Calls

Run the ERC2771 implementation:
```bash
npm start
```

This implementation:
- Uses a trusted forwarder for meta-transactions
- Requires user signature
- Provides better security and user experience

### Basic Sponsored Calls

Run the basic implementation:
```bash
npm run start:basic
```

This implementation:
- Simpler setup without trusted forwarder
- No user signature required
- Suitable for basic use cases

## Project Structure

```
├── contracts/
│   └── Counter.sol          # Example contract with ERC2771 support
├── scripts/
│   └── deploy.ts            # Contract deployment script
├── src/
│   ├── sponsoredCallSimple.ts    # ERC2771 implementation
│   └── sponsoredCallBasic.ts     # Basic implementation
├── .env                    # Environment variables (create this)
├── hardhat.config.ts       # Hardhat configuration
└── package.json           # Project dependencies
```

## Important Notes

1. **1Balance Funding**: Ensure you have sufficient Sepolia ETH in your 1Balance account for testnet transactions.

2. **API Key Security**: Never commit your `.env` file or expose your API keys.

3. **Contract Addresses**: The trusted forwarder address is specific to Sepolia network. For other networks and their contract addresses, check [Gelato's supported networks](https://docs.gelato.cloud/web3-services/relay/supported-networks).

## Resources

- [Gelato Relay Documentation](https://docs.gelato.network/developer-services/relay)
- [ERC2771 Standard](https://eips.ethereum.org/EIPS/eip-2771)
- [1Balance Documentation](https://docs.gelato.network/developer-services/1balance)

## License

MIT 