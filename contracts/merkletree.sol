//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MerkleAirdrop {

     address public ERC20Token;
     bytes32 public merkleRoot;

     constructor(address _token, bytes32 _merkleRoot){
        ERC20Token = _token;
        merkleRoot = _merkleRoot;
     }
     
              function claim(address user, uint256 amount) public {
        // Function body goes here
     }
}