import { GelatoRelay, SponsoredCallRequest } from "@gelatonetwork/relay-sdk-viem";
import { encodeFunctionData, Address } from "viem";
import dotenv from "dotenv";

dotenv.config();

// Configuration
const GELATO_RELAY_API_KEY = process.env.GELATO_RELAY_API_KEY!;

// Deployed Counter contract address (non-ERC2771 version)
const COUNTER_ADDRESS = "0x8dA5a92A51a800ca84e586AEae9dc2AA6953eC7F" as Address;

// Sepolia chain ID
const CHAIN_ID = 11155111;

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

export async function executeBasicSponsoredCall() {
    try {
        console.log("🚀 Starting basic sponsored call (non-ERC2771)...");
        
        // Initialize Gelato Relay - no trusted forwarder needed for basic calls
        const relay = new GelatoRelay();
        
        console.log("📍 Chain ID:", CHAIN_ID);
        console.log("🎯 Target contract:", COUNTER_ADDRESS);
        
        // Encode increment function data
        const data = encodeFunctionData({
            abi: COUNTER_ABI,
            functionName: "increment",
        });
        
        console.log("📝 Encoded function data:", data);
        
        // Create basic sponsored call request
        const request: SponsoredCallRequest = {
            chainId: BigInt(CHAIN_ID),
            target: COUNTER_ADDRESS,
            data: data,
        };
        
        console.log("📤 Sending sponsored call to increment counter...");
        
        // Execute sponsored call
        const response = await relay.sponsoredCall(
            request,
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
executeBasicSponsoredCall().catch(console.error); 