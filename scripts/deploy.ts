import { ethers } from "hardhat";

// Sepolia trusted forwarder for sponsoredCallERC2771
const TRUSTED_FORWARDER = "0xd8253782c45a12053594b9deB72d8e8aB2Fca54c";

async function main() {
    console.log("Deploying Counter contract...");

    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy(TRUSTED_FORWARDER);

    await counter.waitForDeployment();

    const address = await counter.getAddress();
    console.log("Counter deployed to:", address);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
}); 