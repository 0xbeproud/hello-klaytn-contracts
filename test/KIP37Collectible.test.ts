import {KIP37Collectible} from '../typechain-types';
import {expect} from 'chai';
import {loadFixture} from '@nomicfoundation/hardhat-network-helpers';
import {kip37CollectibleFixture} from './fixtures/fixtures';

describe('KIP37Collectible', () => {
  describe('create', async () => {
    const tokenId = 1;
    const initialSupply = 10;
    it('create시 onwer는 initialSupply만큼 가지고 있어야 한다', async () => {
      const {contract: sut, tokenURI, owner} = await loadFixture(kip37CollectibleFixture);
      const tx = await sut.create(tokenId, initialSupply, tokenURI);
      await tx.wait();

      const balance = await sut.balanceOf(owner.address, tokenId);
      await expect(balance).to.equal(initialSupply);
    });

    it('이미 존재하는 tokenId로 create 호출 불가', async () => {
      const {contract: sut, tokenURI, owner} = await loadFixture(kip37CollectibleFixture);
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
      const {contract: sut, tokenURI, noah} = await loadFixture(kip37CollectibleFixture);
      expect(sut.mintItem(tokenId, noah.address, mintSupply)).to.be.revertedWith('KIP37: nonexistent token');
    });

    it('mint시 mint주소에 mint한 수량만큼 소유하고 있어야 한다.', async () => {
      const {contract: sut, tokenURI, noah} = await loadFixture(kip37CollectibleFixture);
      let tx = await sut.create(tokenId, initialSupply, tokenURI);
      await tx.wait();

      tx = await sut.mintItem(tokenId, noah.address, mintSupply);
      await tx.wait();

      const balance = await sut.balanceOf(noah.address, tokenId);
      await expect(balance).to.equal(mintSupply);
    });
  });
});
