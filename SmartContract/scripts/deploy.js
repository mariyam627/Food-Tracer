const { ethers } = require("hardhat");

async function main() {

  const foodTraceabilityContract = await ethers.getContractFactory(
    "FoodTraceabilityContract"
  );

  const FoodTraceabilityContract = await foodTraceabilityContract.deploy();

  await FoodTraceabilityContract.deployed();

  console.log(
    "FoodTraceabilityContract Contract Address:",
    FoodTraceabilityContract.address
  );

  const foodTraceabilityMarketplace = await ethers.getContractFactory(
    "FoodTraceabilityMarketplace"
  );

  const FoodTraceabilityMarketplace =
    await foodTraceabilityMarketplace.deploy(FoodTraceabilityContract.address);

  await FoodTraceabilityMarketplace.deployed();

  console.log(
    "FoodTraceabilityMarketplace Contract Address:",
    FoodTraceabilityMarketplace.address
  );

  saveFrontendFiles(FoodTraceabilityMarketplace, "FoodTraceabilityMarketplace");
  saveFrontendFiles(FoodTraceabilityContract, "FoodTraceabilityContract");
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../Frontend/src/Store/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);
  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
