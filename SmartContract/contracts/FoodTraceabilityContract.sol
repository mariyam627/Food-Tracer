// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract FoodTraceabilityContract is ERC721URIStorage {

    uint256 public tokenCount;

    constructor() ERC721("FoodTraceabilityAccount", "FTA") {
    }

    function mint(string memory uri) public returns (uint256) {
        tokenCount ++;
        _safeMint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, uri);
        return (tokenCount);
    }

}
