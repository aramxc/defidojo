// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Github Author: @aramxc
// This is the original achievement contract to be used for the Dojo Achievements NFTs
contract DojoAchievementNFT is ERC721URIStorage, Ownable {
    using ECDSA for bytes32;
    
    // Mapping to track used signatures
    mapping(bytes => bool) public usedSignatures;
    
    // Enum to define different achievement types
    enum AchievementType { 
        DOJO_MASTER, 
        SOLIDITY_SENSEI, 
        QUICK_REFLEXES,
        COMMUNITY_CONTRIBUTOR,
        NOT_SO_RUSTY
    }

    // Struct to track achievement details
    struct AchievementTracker {
        uint256 counter;
        mapping(address => bool) hasAchievement;
        string baseURI;
        uint256 maxAchievements;
    }

    // Mapping to store achievements by type
    mapping(AchievementType => AchievementTracker) private achievements;

    // Event for more detailed achievement tracking
    event AchievementUnlocked(
        address indexed player, 
        uint256 tokenId, 
        AchievementType achievementType
    );
    
    

    uint256 public masterAchievementCounter;

    mapping(address => bool) public hasMasterAchievement;

   constructor() ERC721("Dojo Achievements", "DOJO") Ownable(msg.sender) {
        // Initialize default configurations for achievements
        achievements[AchievementType.DOJO_MASTER].maxAchievements = 1000;
        achievements[AchievementType.SOLIDITY_SENSEI].maxAchievements = 500;
        achievements[AchievementType.QUICK_REFLEXES].maxAchievements = 100;
        achievements[AchievementType.COMMUNITY_CONTRIBUTOR].maxAchievements = 1000;
        achievements[AchievementType.NOT_SO_RUSTY].maxAchievements = 1000;
    }

    function awardAchievement(
        address player, AchievementType achievementType, string memory tokenURI
        ) external onlyOwner {
            AchievementTracker storage achievement = achievements[achievementType];
            require(
            !achievement.hasAchievement[player], 
            "Player already has this achievement"
            );

            require(
                achievement.counter < achievement.maxAchievements,
                "Maximum achievement limit reached"
            );
       
        
            uint256 tokenId = achievement.counter++;
            _safeMint (player, tokenId);
            // Use the IPFS metadata CID from uploadToIPFS script
            _setTokenURI(tokenId, tokenURI); 

        achievement.counter++;
        achievement.hasAchievement[player] = true;
        
        emit AchievementUnlocked(player, tokenId, achievementType);

       
    }

    // Check if a player has a specific achievement
    function hasAchievement(
        address player, 
        AchievementType achievementType
    ) public view returns (bool) {
        // Default to false if achievement type doesn't exist
        if (achievements[achievementType].maxAchievements == 0) {
            return false;
        }
        return achievements[achievementType].hasAchievement[player];
    }

    // Get total achievements for a specific type
    function getTotalAchievements(
        AchievementType achievementType
    ) public view returns (uint256) {
        return achievements[achievementType].counter;
    }

    // Optional: Update max achievements for a type
    function updateMaxAchievements(
        AchievementType achievementType, 
        uint256 newMax
    ) external onlyOwner {
        achievements[achievementType].maxAchievements = newMax;
    }
}