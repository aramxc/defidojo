import os
from enum import Enum

class Network(Enum):
    SEPOLIA = "sepolia"
    LOCAL = "localhost"

# Get network from environment variable, default to LOCAL for development
ACTIVE_NETWORK = Network.SEPOLIA if os.getenv('ENVIRONMENT') == 'production' else Network.LOCAL

CONTRACT_ADDRESSES = {
    "dojo_token": {
        Network.SEPOLIA: "0x...", # Your deployed Sepolia contract address
        Network.LOCAL: "0x..."    # This will be updated by deploy script
    }
}

# RPC URLs
RPC_URLS = {
    Network.SEPOLIA: os.getenv('SEPOLIA_RPC_URL', ''),
    Network.LOCAL: "http://hardhat:8545"  # Using Docker service name
}

DOJO_TOKEN_ABI = [
    # ABI will be copied from artifacts after deployment
]