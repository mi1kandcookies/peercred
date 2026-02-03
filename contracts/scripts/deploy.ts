import { ethers, run, network } from "hardhat";

async function main() {
  console.log("Deploying PeerCred contract...");
  console.log("Network:", network.name);

  const PeerCred = await ethers.getContractFactory("PeerCred");
  const peerCred = await PeerCred.deploy();

  await peerCred.waitForDeployment();

  const address = await peerCred.getAddress();
  console.log("PeerCred deployed to:", address);

  // Wait for a few block confirmations before verifying
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("Waiting for block confirmations...");
    await peerCred.deploymentTransaction()?.wait(5);

    console.log("Verifying contract on Basescan...");
    try {
      await run("verify:verify", {
        address: address,
        constructorArguments: [],
      });
      console.log("Contract verified successfully!");
    } catch (error: any) {
      if (error.message.includes("Already Verified")) {
        console.log("Contract already verified!");
      } else {
        console.error("Verification failed:", error.message);
      }
    }
  }

  console.log("\n=== Deployment Complete ===");
  console.log("Contract Address:", address);
  console.log("\nUpdate this address in frontend/lib/contract.ts");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
