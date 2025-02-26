from web3 import Web3
from .config import CONTRACT_ADDRESSES, DOJO_TOKEN_ABI, ACTIVE_NETWORK, RPC_URLS

class DojoTokenService:
    def __init__(self):
        # Only initialize when needed
        self.contract = None

    def _ensure_initialized(self):
        if not self.w3:
            self.w3 = Web3(Web3.HTTPProvider(RPC_URLS[ACTIVE_NETWORK]))
            self.contract = self.w3.eth.contract(
                address=CONTRACT_ADDRESSES["dojo_token"][ACTIVE_NETWORK],
                abi=DOJO_TOKEN_ABI
            )

    async def award_achievement(self, player_address: str, achievement_id: str):
        self._ensure_initialized()
        # Rest of your contract interaction code