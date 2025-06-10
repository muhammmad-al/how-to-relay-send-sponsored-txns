// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@gelatonetwork/relay-context/contracts/vendor/ERC2771Context.sol";

contract Counter is ERC2771Context {
    uint256 private _counter;

    event CounterIncremented(address indexed user, uint256 newValue);

    constructor(address trustedForwarder) ERC2771Context(trustedForwarder) {}

    function increment() external {
        _counter++;
        emit CounterIncremented(_msgSender(), _counter);
    }

    function getCount() external view returns (uint256) {
        return _counter;
    }
} 