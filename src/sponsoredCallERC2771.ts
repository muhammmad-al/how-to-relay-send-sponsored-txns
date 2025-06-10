import { GelatoRelay, CallWithERC2771Request } from "@gelatonetwork/relay-sdk-viem";
import { createWalletClient, http, encodeFunctionData, Address } from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import dotenv from "dotenv";

dotenv.config();

// Configuration
const GELATO_RELAY_API_KEY = process.env.GELATO_RELAY_API_KEY!;
const PRIVATE_KEY = process.env.PRIVATE_KEY! as `0x${string}`;
const RPC_URL = process.env.RPC_URL!;

// Deployed Counter contract address
const COUNTER_ADDRESS = "0x8dA5a92A51a800ca84e586AEae9dc2AA6953eC7F" as Address;

// Sepolia trusted forwarder for sponsoredCallERC2771
const TRUSTED_FORWARDER = "0xd8253782c45a12053594b9deB72d8e8aB2Fca54c" as Address;

// Counter contract ABI
const COUNTER_ABI = [
    {
        inputs: [],
        name: "increment",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "getCount",
        outputs: [{ name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
];

export async function executeSponsoredCall() {
    try {
        console.log("🚀 Starting ERC2771 sponsored call...");
        
        // Initialize Gelato Relay with trusted forwarder
        const relay = new GelatoRelay({
            contract: {
                relay1BalanceERC2771: TRUSTED_FORWARDER,
                relayERC2771: TRUSTED_FORWARDER,
                relayERC2771zkSync: TRUSTED_FORWARDER,
                relayERC2771Abstract: TRUSTED_FORWARDER,
                relay1BalanceERC2771zkSync: TRUSTED_FORWARDER,
                relay1BalanceERC2771Abstract: TRUSTED_FORWARDER,
                relay1BalanceConcurrentERC2771: TRUSTED_FORWARDER,
                relayConcurrentERC2771: TRUSTED_FORWARDER,
                relay1BalanceConcurrentERC2771zkSync: TRUSTED_FORWARDER,
                relayConcurrentERC2771zkSync: TRUSTED_FORWARDER,
                relay1BalanceConcurrentERC2771Abstract: TRUSTED_FORWARDER,
                relayConcurrentERC2771Abstract: TRUSTED_FORWARDER
            }
        });
        
        // Create account and wallet client
        const account = privateKeyToAccount(PRIVATE_KEY);
        const client = createWalletClient({
            account,
            chain: sepolia,
            transport: http(RPC_URL),
        });
        
        const chainId = await client.getChainId();
        console.log("📍 Chain ID:", chainId);
        console.log("👤 User address:", account.address);
        
        // Encode increment function data
        const data = encodeFunctionData({
            abi: COUNTER_ABI,
            functionName: "increment",
        });
        
        // Create ERC2771 request
        const request: CallWithERC2771Request = {
            user: account.address,
            chainId: BigInt(chainId),
            target: COUNTER_ADDRESS,
            data: data,
        };
        
        console.log("📤 Sending sponsored call to increment counter...");
        
        // Execute sponsored call
        const response = await relay.sponsoredCallERC2771(
            request,
            client as any,
            GELATO_RELAY_API_KEY
        );
        
        console.log("✅ Success!");
        console.log("📋 Task ID:", response.taskId);
        console.log("🔗 Track at: https://relay.gelato.digital/tasks/status/" + response.taskId);
        
        return response;
    } catch (error) {
        console.error("❌ Error:", error);
        throw error;
    }
}

// Execute the sponsored call
executeSponsoredCall().catch(console.error); 