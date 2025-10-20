// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RecordHash {
    mapping(bytes32 => bool) private hashes;
    mapping(bytes32 => uint256) private timestamps;
    
    event HashStored(bytes32 indexed hash, uint256 timestamp);
    event HashVerified(bytes32 indexed hash, bool isValid);

    function storeHash(bytes32 _hash) public {
        require(_hash != bytes32(0), "Invalid hash");
        require(!hashes[_hash], "Hash already exists");
        
        hashes[_hash] = true;
        timestamps[_hash] = block.timestamp;
        emit HashStored(_hash, block.timestamp);
    }

    function verifyHash(bytes32 _hash) public view returns (bool) {
        bool isValid = hashes[_hash];
        emit HashVerified(_hash, isValid);
        return isValid;
    }
    
    function getHashTimestamp(bytes32 _hash) public view returns (uint256) {
        require(hashes[_hash], "Hash does not exist");
        return timestamps[_hash];
    }
    
    function getTotalHashes() public view returns (uint256) {
        return address(this).balance; // This is a placeholder - in real implementation, track count
    }
}
