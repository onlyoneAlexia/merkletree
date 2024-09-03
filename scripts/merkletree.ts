import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import  MerkleTree  from 'merkletreejs'
import SHA256 from "crypto-js/sha256"
import * as fs from 'fs';
import csv from 'csv-parser';
const result: any[] = [];

// ... rest of the code ...

const file = "myfeeds/whitelistedaddress.csv";
fs.createReadStream(file)
.pipe(csv())
.on("data", (data:any) => result.push(data))
.on("end", () => {
    console.log(result);


    //1 Get the values to include in the tree. (Note: Consider reading them from a file.)
    //2 Build the merkle tree. Set the encoding to match the values.
    //3 Print the merkle root. You will probably publish this value on chain in a smart contract.
    //4 Write a file that describes the tree. You will distribute this to users so they can generate proofs for values in the tree.
// (1)
const results = [
  ["0xF3c6F5F265F503f53EAD8aae90FC257A5aa49AC1", "10"],
  ["0xB9CcDD7Bedb7157798e10Ff06C7F10e0F37C6BdD", "20"]
];

// (2)
const tree = StandardMerkleTree.of(results, ["address", "uint256"]);

// (3)
console.log('Merkle Root:', tree.root);


// (4)
fs.writeFileSync("tree.json", JSON.stringify(tree.dump()));


})

// (1)
const tree = StandardMerkleTree.load(JSON.parse(fs.readFileSync("tree.json", "utf8")));

// (2)
for (const [i, v] of tree.entries()) {
  if (v[0] === '0xF3c6F5F265F503f53EAD8aae90FC257A5aa49AC1') {
    // (3)
    const proof = tree.getProof(i);
    console.log('Value:', v);
    console.log('Proof:', proof);
  }
}



