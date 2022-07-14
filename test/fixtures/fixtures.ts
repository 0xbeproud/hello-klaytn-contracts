import {ethers} from 'hardhat';
import {
  KIP17Collectible,
  KIP17Collectible__factory,
  KIP37Collectible,
  KIP37Collectible__factory,
} from '../../typechain-types';

// const {deployContract} = waffle;
// const {expect} = chai;

export async function signersFixture() {
  const [owner, noah, danny, logan] = await ethers.getSigners();
  return {owner, noah, danny, logan};
}

export async function kip37CollectibleFixture() {
  const tokenURI =
    'https://fanto-s3.krosslab.dev/nft/000000000000000000000000000000000000000000000000000000000004cce0.json';

  const {owner, noah, danny, logan} = await signersFixture();

  const contractFactory: KIP37Collectible__factory = await ethers.getContractFactory('KIP37Collectible');
  const k37Contract: KIP37Collectible = (await contractFactory.deploy(tokenURI)) as KIP37Collectible;
  await k37Contract.deployed();

  // const contract = (await deployContract(owner, KIP37CollectibleArtifact)) as KIP37Collectible;
  return {k37Contract, tokenURI, owner, noah, danny, logan};
}

export async function kip17CollectibleFixture() {
  const name = 'mock';
  const symbol = 'MOCK';
  const price = 10;
  const maxSupply = 10;
  const maxPerMint = 3;

  const tokenURI =
    'https://fanto-s3.krosslab.dev/nft/000000000000000000000000000000000000000000000000000000000004cce0.json';

  const {owner, noah, danny, logan} = await signersFixture();

  const contractFactory: KIP17Collectible__factory = await ethers.getContractFactory('KIP17Collectible');
  const k17Contract: KIP17Collectible = (await contractFactory.deploy(
    name,
    symbol,
    tokenURI,
    price,
    maxSupply,
    maxPerMint,
  )) as KIP17Collectible;
  await k17Contract.deployed();

  // const contract = (await deployContract(owner, KIP37CollectibleArtifact)) as KIP37Collectible;
  return {k17Contract, tokenURI, owner, noah, danny, logan};
}
