import {ethers} from 'hardhat';
import {KIP37Collectible, KIP37Collectible__factory} from '../../typechain-types';

// const {deployContract} = waffle;
// const {expect} = chai;

export async function kip37CollectibleFixture() {
  const tokenURI =
    'https://fanto-s3.krosslab.dev/nft/000000000000000000000000000000000000000000000000000000000004cce0.json';

  const [owner, noah, danny, logan] = await ethers.getSigners();

  const contractFactory: KIP37Collectible__factory = await ethers.getContractFactory('KIP37Collectible');
  const contract: KIP37Collectible = (await contractFactory.deploy(tokenURI)) as KIP37Collectible;
  await contract.deployed();

  // const contract = (await deployContract(owner, KIP37CollectibleArtifact)) as KIP37Collectible;
  return {contract, tokenURI, owner, noah, danny, logan};
}
