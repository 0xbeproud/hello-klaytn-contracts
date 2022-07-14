//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@klaytn/contracts/access/Ownable.sol";
import "@klaytn/contracts/KIP/token/KIP37/extensions/KIP37Mintable.sol";
import "@klaytn/contracts/KIP/token/KIP37/extensions/KIP37Burnable.sol";
import "@klaytn/contracts/KIP/token/KIP37/extensions/KIP37Pausable.sol";
import "@klaytn/contracts/KIP/token/KIP37/extensions/KIP37Supply.sol";

import "@klaytn/contracts/utils/math/SafeMath.sol";
import "@klaytn/contracts/utils/Counters.sol";
import "@klaytn/contracts/utils/Address.sol";
import "@klaytn/contracts/utils/Strings.sol";

import "hardhat/console.sol";

contract KIP37Collectible is KIP37Mintable, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    using Address for address;
    using Strings for uint256;

    constructor(string memory tokenURI) KIP37(tokenURI) {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MINTER_ROLE, _msgSender());
        //        _setupRole(PAUSER_ROLE, _msgSender());
    }

    function mintItem(
        uint256 id,
        address to,
        uint256 amount
    ) public {
        super.mint(id, to, amount);
    }
}
