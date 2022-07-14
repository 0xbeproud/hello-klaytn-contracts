import {ethers} from "hardhat";

import KIP37CollectibleArtifact from '../artifacts/contracts/KIP37Collectible.sol/KIP37Collectible.json';
import {KIP37Collectible} from '../typechain-types/contracts/KIP37Collectible';
import {expect} from "chai";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

describe("KIP37Collectible", () => {
    let sut: KIP37Collectible;
    let signers: SignerWithAddress[];

    const tokenURI = ''

    beforeEach(async () => {
        signers = await ethers.getSigners();
        const contractFactory = await ethers.getContractFactory("KIP37Collectible");
        sut = await contractFactory.deploy(tokenURI) as KIP37Collectible;
        await sut.deployed();
    })

    context('create', async () => {

        const tokenId: number = 1;
        const initialSupply: number = 10;

        it('create - msgSender는 initialSupply만큼 가지고 있어야 한다', async () => {
            const tnx = await sut.create(tokenId, initialSupply, tokenURI)
            await tnx.wait()

            const balance = await sut.balanceOf(signers[0].address, tokenId)
            expect(balance).to.equal(initialSupply);
        })
    })
})