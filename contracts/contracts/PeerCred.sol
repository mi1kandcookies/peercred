// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PeerCred
 * @notice A minimal on-chain attestation system for peer reputation
 * @dev Users can issue attestations to any address with a type and message
 */
contract PeerCred {
    struct Attestation {
        address from;
        address to;
        string attestationType;
        string message;
        uint256 timestamp;
    }

    // All attestations stored in an array
    Attestation[] private allAttestations;

    // Mapping from address to indices of attestations received
    mapping(address => uint256[]) private receivedIndices;

    // Mapping from address to indices of attestations given
    mapping(address => uint256[]) private givenIndices;

    // Events
    event AttestationCreated(
        uint256 indexed id,
        address indexed from,
        address indexed to,
        string attestationType,
        string message,
        uint256 timestamp
    );

    /**
     * @notice Issue an attestation to another address
     * @param to The address receiving the attestation
     * @param attestationType The type of attestation (e.g., "hackathon", "collaboration")
     * @param message A message describing the attestation
     */
    function attest(
        address to,
        string calldata attestationType,
        string calldata message
    ) external {
        require(to != address(0), "Cannot attest to zero address");
        require(to != msg.sender, "Cannot attest to yourself");
        require(bytes(attestationType).length > 0, "Type cannot be empty");
        require(bytes(message).length > 0, "Message cannot be empty");
        require(bytes(message).length <= 500, "Message too long");

        uint256 id = allAttestations.length;

        Attestation memory newAttestation = Attestation({
            from: msg.sender,
            to: to,
            attestationType: attestationType,
            message: message,
            timestamp: block.timestamp
        });

        allAttestations.push(newAttestation);
        receivedIndices[to].push(id);
        givenIndices[msg.sender].push(id);

        emit AttestationCreated(
            id,
            msg.sender,
            to,
            attestationType,
            message,
            block.timestamp
        );
    }

    /**
     * @notice Get all attestations received by an address
     * @param user The address to query
     * @return An array of Attestation structs
     */
    function getAttestationsReceived(address user)
        external
        view
        returns (Attestation[] memory)
    {
        uint256[] memory indices = receivedIndices[user];
        Attestation[] memory result = new Attestation[](indices.length);

        for (uint256 i = 0; i < indices.length; i++) {
            result[i] = allAttestations[indices[i]];
        }

        return result;
    }

    /**
     * @notice Get all attestations given by an address
     * @param user The address to query
     * @return An array of Attestation structs
     */
    function getAttestationsGiven(address user)
        external
        view
        returns (Attestation[] memory)
    {
        uint256[] memory indices = givenIndices[user];
        Attestation[] memory result = new Attestation[](indices.length);

        for (uint256 i = 0; i < indices.length; i++) {
            result[i] = allAttestations[indices[i]];
        }

        return result;
    }

    /**
     * @notice Get the count of attestations received by an address
     * @param user The address to query
     * @return The number of attestations received
     */
    function attestationCountReceived(address user) external view returns (uint256) {
        return receivedIndices[user].length;
    }

    /**
     * @notice Get the count of attestations given by an address
     * @param user The address to query
     * @return The number of attestations given
     */
    function attestationCountGiven(address user) external view returns (uint256) {
        return givenIndices[user].length;
    }

    /**
     * @notice Get total number of attestations in the system
     * @return The total count
     */
    function totalAttestations() external view returns (uint256) {
        return allAttestations.length;
    }

    /**
     * @notice Get a specific attestation by ID
     * @param id The attestation ID
     * @return The Attestation struct
     */
    function getAttestation(uint256 id) external view returns (Attestation memory) {
        require(id < allAttestations.length, "Attestation does not exist");
        return allAttestations[id];
    }
}
