// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract Demo {
    address public owner;
    uint public counter;

    constructor(uint start) payable {
        require (start > 100, "Too small");
        owner = msg.sender;
        counter = start;
    }

    function increase() external {
        ++counter;
    }
}