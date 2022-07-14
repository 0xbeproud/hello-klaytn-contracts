//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


import "@klaytn/contracts/access/Ownable.sol";
import "@klaytn/contracts/KIP/token/KIP17/KIP17.sol";
import "@klaytn/contracts/KIP/token/KIP17/extensions/KIP17MetadataMintable.sol";
import "@klaytn/contracts/KIP/token/KIP17/extensions/KIP17Enumerable.sol";
import "@klaytn/contracts/KIP/token/KIP17/extensions/KIP17Burnable.sol";
import "@klaytn/contracts/KIP/token/KIP17/extensions/KIP17Pausable.sol";

import "@klaytn/contracts/utils/math/SafeMath.sol";
import "@klaytn/contracts/utils/Counters.sol";
import "@klaytn/contracts/utils/Address.sol";
import "@klaytn/contracts/utils/Strings.sol";

contract KIP17Collectible is KIP17MetadataMintable, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    using Address for address;
    using Strings for uint256;

    Counters.Counter private _tokenIds;

    string public TOKEN_URI;
    uint256 public PRICE;
    uint256 public MAX_SUPPLY;
    uint256 public MAX_PER_MINT;

    constructor(string memory name_, string memory symbol_, string memory tokenURI_, uint256 price_, uint256 maxSupply_, uint256 maxPerMint_) KIP17(name_, symbol_) {
        TOKEN_URI = tokenURI_;
        PRICE = price_;
        MAX_SUPPLY = maxSupply_;
        MAX_PER_MINT = maxPerMint_;

        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MINTER_ROLE, _msgSender());
    }

    function mintNFTs(uint _count) public payable {
        uint totalMinted = _tokenIds.current();

        require(totalMinted.add(_count) <= MAX_SUPPLY, "Not enough NFTs left!");
        require(0 < _count && _count <= MAX_PER_MINT, "Cannot mint specified number of NFTs.");
        require(msg.value >= PRICE.mul(_count), "Not enough klay to purchase NFTs.");

        for (uint i = 0; i < _count; i++) {
            mintNFT(msg.sender);
        }
    }

    function mintNFT(address recipient) public payable returns (uint256) {
        uint256 newTokenId = _tokenIds.current();

        require(newTokenId <= MAX_SUPPLY, "Not enough NFTs left!");

        mintWithTokenURI(recipient, newTokenId, TOKEN_URI);
        transferOwnership(recipient);
        _tokenIds.increment();

        return newTokenId;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return TOKEN_URI;
    }
}