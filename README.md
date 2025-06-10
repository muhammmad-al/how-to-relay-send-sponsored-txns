# Gelato Sponsored Calls Implementation

A simple implementation of Gelato Sponsored Calls using ERC2771.

## Prerequisites

1. Create a Gelato account on the [Gelato App](https://app.gelato.network/)
2. Create a relay app on Sepolia testnet
3. Get your Sponsor API Key from the relay app dashboard
4. Deposit Sepolia ETH into your 1Balance account

## Installation

```bash
# Install dependencies
npm install

# Copy environment file and fill in your values
cp .env.example .env
```

## Configuration

Edit the `.env` file with your values:

```env
GELATO_RELAY_API_KEY=your_gelato_api_key_here
PRIVATE_KEY=your_private_key_here
RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your_api_key_here
```

## Usage

```typescript
import { executeSponsoredCall } from './src/sponsoredCallSimple';

// Example contract ABI
const abi = ["function example()"];

// Your deployed contract address
const targetContractAddress = "0x1234567890123456789012345678901234567890";

async function main() {
    try {
        const response = await executeSponsoredCall(
            targetContractAddress,
            abi,
            "example"
        );
        console.log("Task ID:", response.taskId);
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
```

Run the example:

```bash
npm start
```

## Important Notes

1. Make sure your target contract inherits from ERC2771Context and is initialized with the Sepolia trusted forwarder: `0xd8253782c45a12053594b9deB72d8e8aB2Fca54c`
2. Keep your private key and API keys secure
3. Monitor your 1Balance account to ensure sufficient funds for gas sponsorship

## Supported Networks

This example uses Sepolia testnet. For other networks, check the [Gelato Network Support](https://docs.gelato.network/developer-services/relay/quick-start/supported-networks) page for the appropriate trusted forwarder addresses. 