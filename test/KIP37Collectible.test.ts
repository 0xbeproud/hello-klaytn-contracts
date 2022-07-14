import {ethers} from 'hardhat';
import {KIP37Collectible, KIP37Collectible__factory} from '../typechain-types';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';
import {expect} from 'chai';

describe('KIP37Collectible', () => {
  let owner: SignerWithAddress;
  let noah: SignerWithAddress;
  let danny: SignerWithAddress;
  let logan: SignerWithAddress;
  let contractFactory: KIP37Collectible__factory;
  let sut: KIP37Collectible;

  const tokenURI =
    'https://fanto-s3.krosslab.dev/nft/000000000000000000000000000000000000000000000000000000000004cce0.json';

  before(async () => {
    [owner, noah, danny, logan] = await ethers.getSigners();
    contractFactory = await ethers.getContractFactory('KIP37Collectible');
  });

  beforeEach(async () => {
    sut = (await contractFactory.deploy(tokenURI)) as KIP37Collectible;
    await sut.deployed();
  });

  describe('create', async () => {
    const tokenId = 1;
    const initialSupply = 10;
    it('create시 onwer는 initialSupply만큼 가지고 있어야 한다', async () => {
      const tx = await sut.create(tokenId, initialSupply, tokenURI);
      await tx.wait();

      const balance = await sut.balanceOf(owner.address, tokenId);
      await expect(balance).to.equal(initialSupply);
    });

    it('이미 존재하는 tokenId로 create 호출 불가', async () => {
      const tx = await sut.create(tokenId, initialSupply, tokenURI);
      await tx.wait();
      await expect(sut.create(tokenId, initialSupply, tokenURI)).to.be.revertedWith('KIP37: token already created');
    });
  });

  describe('mint', async () => {
    const tokenId = 1;
    const initialSupply = 10;
    const mintSupply = 3;
    it('create하지 않고 mint를 하면 에러 발생', async () => {
      expect(sut.mintItem(tokenId, noah.address, mintSupply)).to.be.revertedWith('KIP37: nonexistent token');
    });

    it('mint시 mint주소에 mint한 수량만큼 소유하고 있어야 한다.', async () => {
      let tx = await sut.create(tokenId, mintSupply, tokenURI);
      await tx.wait();

      tx = await sut.mintItem(tokenId, noah.address, mintSupply);
      await tx.wait();

      const balance = await sut.balanceOf(noah.address, tokenId);
      await expect(balance).to.equal(mintSupply);
    });
  });
});
