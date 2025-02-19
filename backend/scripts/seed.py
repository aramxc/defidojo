import os
import sys
from pathlib import Path
from dotenv import load_dotenv
import uuid

# Add backend directory to Python path
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

# Load env from backend directory
load_dotenv(backend_dir / '.env')


FIXED_IDS = {
    'user': 'f5e5abb2-d6ce-4aee-a471-e407807e4d6e',
    'challenge': 'cbc65716-075f-42c4-a159-e49a62b5d845',
    'tags': {
        'solidity': '8c1bfee3-5759-4c0b-a374-b13fb4f9264c',
        'rust': 'f1e2d3c4-b5a6-7890-cdef-123456789abc',
        'near_protocol': 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        'erc20': 'd47b81f0-962c-4d76-9535-3e1af6146f7f',
        'defi': 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7',
        'advanced': 'c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8'
    }
}

def get_database_url(environment):
    """Get database URL based on environment.
    
    Args:
        environment (str): Either 'docker', 'local', or 'production'
    Returns:
        str: Database URL
    """
    if environment == 'production':
        return (
            f"postgresql://{os.getenv('NEON_DB_USER')}:{os.getenv('NEON_DB_PASSWORD')}"
            f"@{os.getenv('NEON_DB_HOST')}/{os.getenv('NEON_DB_DATABASE')}?sslmode=require"
        )
    elif environment == 'docker':
        return (
            f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}"
            f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
        )
    else:  # local
        return (
            f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}"
            f"@localhost:{os.getenv('DB_PORT_LOCAL')}/{os.getenv('DB_NAME')}"
        )

def seed_database(environment='local'):
    """Seed the database with initial data.
    
    Args:
        environment (str): Either 'docker', 'local', or 'production'
    """
    # Set up database URL before importing Flask
    db_url = get_database_url(environment)
    os.environ['SQLALCHEMY_DATABASE_URI'] = db_url
    
    # Now import Flask-related modules
    from src.main import create_app
    from src.models import db, User, Challenge, Tag
    from sqlalchemy import text
    
    print(f"🌱 Starting seed process for {environment} database...")
    app = create_app(environment)
    
    with app.app_context():
        print(f"Checking {environment} database connection...")
        try:
            # Test database connection
            db.session.execute(text('SELECT 1'))
            print("Database connection successful!")
            
            # Check if database is empty
            if User.query.first() or Challenge.query.first() or Tag.query.first():
                print("Database already contains data, skipping seed.")
                return
            
            print("Database is empty, starting seed process...")
            
            # Create tags first
            tags = {
                'solidity': Tag(
                    id=FIXED_IDS['tags']['solidity'],
                    name='Solidity',
                    color='rgb(103, 76, 196)',
                    background_color='rgba(103, 76, 196, 0.1)'
                ),
                'rust': Tag(
                    id=FIXED_IDS['tags']['rust'],
                    name='Rust',
                    color='rgb(183, 65, 14)',
                    background_color='rgba(183, 65, 14, 0.1)'
                ),
                'near_protocol': Tag(
                    id=FIXED_IDS['tags']['near_protocol'],
                    name='NEAR Protocol',
                    color='rgb(0, 114, 206)',
                    background_color='rgba(0, 114, 206, 0.1)'
                ),
                'erc20': Tag(
                    id=FIXED_IDS['tags']['erc20'],
                    name='ERC20',
                    color='rgb(52, 211, 153)',
                    background_color='rgba(52, 211, 153, 0.1)'
                ),
                'defi': Tag(
                    id=FIXED_IDS['tags']['defi'],
                    name='DeFi',
                    color='rgb(236, 72, 153)',
                    background_color='rgba(236, 72, 153, 0.1)'
                ),
                'advanced': Tag(
                    id=FIXED_IDS['tags']['advanced'],
                    name='Advanced',
                    color='rgb(220, 38, 38)',
                    background_color='rgba(220, 38, 38, 0.1)'
                )
            }
            
            db.session.add_all(tags.values())
            db.session.commit()

            # Create test user with fixed ID
            user = User(
                id=FIXED_IDS['user'],
                username="defi_master",
                email="defi@example.com",
                wallet_address="0x123456789abcdef123456789abcdef123456789a"
            )
            db.session.add(user)
            db.session.commit()

            print("Creating challenges...")
            challenges = [
                # Existing Easy Solidity Challenge
                Challenge(
                    id=uuid.uuid4(),
                    title="Simple Token Balance Checker",
                    difficulty="Easy",
                    description="Create a function that checks if an address has a token balance greater than a specified amount.",
                    examples=[
                        {
                            "input": "hasEnoughTokens(0x123...789, 50)",
                            "output": "true",
                            "explanation": "Address has 100 tokens, which is greater than minimum balance of 50"
                        },
                        {
                            "input": "hasEnoughTokens(0x456...abc, 150)",
                            "output": "false",
                            "explanation": "Address has 100 tokens, which is less than minimum balance of 150"
                        }
                    ],
                    constraints=[
                        "Account address must be a valid Ethereum address",
                        "minBalance must be greater than 0",
                        "Function must be marked as view",
                        "Use the provided _balances mapping to check balances"
                    ],
                    initial_code='''// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Challenge {
    function hasEnoughTokens(address account, uint256 minBalance) public view returns (bool) {
        // Your code here
        
    }
}
''',
                    author_id=user.id,
                    author_name=user.username,
                    tags=[tags['solidity'], tags['erc20']],
                    upvotes=2
                ),
                
                # Medium Solidity Challenge
                Challenge(
                    id=uuid.uuid4(),
                    title="Token Vesting Schedule",
                    difficulty="Medium",
                    description="Implement a token vesting schedule where tokens are released linearly over time. The contract should handle multiple beneficiaries and allow the owner to revoke unvested tokens.",
                    examples=[
                        {
                            "input": "createVestingSchedule(0x123...789, 1000, 365 days)",
                            "output": "true",
                            "explanation": "Creates a vesting schedule for 1000 tokens over 1 year"
                        },
                        {
                            "input": "claimVestedTokens()",
                            "output": "500",
                            "explanation": "Claims 500 tokens after 6 months (50% of vesting period)"
                        }
                    ],
                    constraints=[
                        "Only owner can create vesting schedules",
                        "Vesting period must be greater than 0",
                        "Must implement proper access control",
                        "Must handle time-based calculations correctly"
                    ],
                    initial_code='''// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenVesting {
    struct VestingSchedule {
        uint256 totalAmount;
        uint256 startTime;
        uint256 duration;
        uint256 amountClaimed;
        bool revoked;
    }
    
    // TODO: Implement vesting schedule mapping and functions
    
    function createVestingSchedule(address beneficiary, uint256 amount, uint256 duration) external {
        // Your code here
    }
    
    function claimVestedTokens() external returns (uint256) {
        // Your code here
    }
}
''',
                    author_id=user.id,
                    author_name=user.username,
                    tags=[tags['solidity'], tags['defi']],
                    upvotes=1
                ),
                
                # Hard Solidity Challenge
                Challenge(
                    id=uuid.uuid4(),
                    title="Flash Loan Arbitrage",
                    difficulty="Hard",
                    description="Implement a flash loan contract that executes arbitrage between multiple DEXes. The contract should borrow tokens, execute trades, and repay the loan in a single transaction.",
                    examples=[
                        {
                            "input": "executeArbitrage(1000 ETH)",
                            "output": "true",
                            "explanation": "Executes successful arbitrage with 1000 ETH flash loan"
                        }
                    ],
                    constraints=[
                        "Must implement AAVE flash loan interface",
                        "Must be profitable after gas costs",
                        "Must handle multiple DEX interactions",
                        "Must implement proper security checks",
                        "Must repay flash loan in same transaction"
                    ],
                    initial_code='''// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";

contract FlashLoanArbitrage is FlashLoanSimpleReceiverBase {
    constructor(address _addressProvider)
        FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_addressProvider))
    {}
    
    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        // Your arbitrage logic here
    }
    
    function executeArbitrage(uint256 amount) external {
        // Your code here
    }
}
''',
                    author_id=user.id,
                    author_name=user.username,
                    tags=[tags['solidity'], tags['advanced']],
                    upvotes=8
                ),
                
                # Easy Rust Challenge
                Challenge(
                    id=uuid.uuid4(),
                    title="Simple NEAR Token Balance",
                    difficulty="Easy",
                    description="Implement a simple token contract on NEAR Protocol that allows checking account balances.",
                    examples=[
                        {
                            "input": 'get_balance("alice.near")',
                            "output": "100",
                            "explanation": "Returns the token balance for alice.near"
                        }
                    ],
                    constraints=[
                        "Must use proper NEAR account ID validation",
                        "Must implement proper storage management",
                        "Must handle account not found cases"
                    ],
                    initial_code='''use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{near_bindgen, AccountId, Balance};

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    // TODO: Implement contract storage
}

#[near_bindgen]
impl Contract {
    pub fn get_balance(&self, account_id: AccountId) -> Balance {
        // Your code here
    }
}
''',
                    author_id=user.id,
                    author_name=user.username,
                    tags=[tags['rust'], tags['near_protocol']],
                    upvotes=4
                ),
                
                # Medium Rust Challenge
                Challenge(
                    id=uuid.uuid4(),
                    title="NFT Staking Contract",
                    difficulty="Medium",
                    description="Create a NEAR contract that allows users to stake their NFTs and earn rewards based on staking duration.",
                    examples=[
                        {
                            "input": 'stake_nft("token_id_123")',
                            "output": "true",
                            "explanation": "Stakes an NFT with the given token ID"
                        },
                        {
                            "input": 'claim_rewards()',
                            "output": "50",
                            "explanation": "Claims accumulated rewards"
                        }
                    ],
                    constraints=[
                        "Must verify NFT ownership",
                        "Must track staking duration",
                        "Must calculate rewards correctly",
                        "Must handle unstaking properly"
                    ],
                    initial_code='''use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{near_bindgen, AccountId, Promise};
use near_sdk::collections::UnorderedMap;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct NFTStaking {
    // TODO: Implement staking storage and logic
}

#[near_bindgen]
impl NFTStaking {
    pub fn stake_nft(&mut self, token_id: String) -> Promise {
        // Your code here
    }
    
    pub fn claim_rewards(&mut self) -> Promise {
        // Your code here
    }
}
''',
                    author_id=user.id,
                    author_name=user.username,
                    tags=[tags['rust'], tags['near_protocol']],
                    upvotes=6
                ),
                
                # Hard Rust Challenge
                Challenge(
                    id=uuid.uuid4(),
                    title="Cross-Contract DEX Aggregator",
                    difficulty="Hard",
                    description="Implement a DEX aggregator that splits trades across multiple NEAR Protocol DEXes to find the best rates, handling cross-contract calls and complex error scenarios.",
                    examples=[
                        {
                            "input": 'swap_tokens("NEAR", "USDT", "1000000000000000000000000")',
                            "output": "true",
                            "explanation": "Executes a swap of 1 NEAR for USDT across multiple DEXes"
                        }
                    ],
                    constraints=[
                        "Must handle multiple DEX interactions",
                        "Must implement proper error handling",
                        "Must optimize for best rates",
                        "Must handle cross-contract callbacks",
                        "Must implement proper gas management"
                    ],
                    initial_code='''use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{near_bindgen, AccountId, Balance, Promise, Gas};
use near_sdk::collections::UnorderedMap;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct DexAggregator {
    // TODO: Implement DEX aggregator storage and logic
}

#[near_bindgen]
impl DexAggregator {
    pub fn swap_tokens(
        &mut self,
        token_in: AccountId,
        token_out: AccountId,
        amount: Balance
    ) -> Promise {
        // Your code here
    }
    
    #[private]
    pub fn handle_swap_callback(&mut self) {
        // Your code here
    }
}
''',
                    author_id=user.id,
                    author_name=user.username,
                    tags=[tags['rust'], tags['near_protocol'], tags['advanced']],
                    upvotes=10
                )
            ]
            
            db.session.add_all(challenges)
            db.session.commit()

            print("✅ Database seeded successfully with all challenges!")
            
        except Exception as e:
            print(f"❌ Database error: {str(e)}")
            raise

if __name__ == "__main__":
    env = sys.argv[1] if len(sys.argv) > 1 else 'local'
    if env not in ['local', 'docker', 'production']:
        print("Error: Environment must be 'local', 'docker', or 'production'")
        sys.exit(1)
    
    try:
        seed_database(env)
        print(f"✨ Seed process completed for {env} database!")
    except Exception as e:
        print(f"Error seeding database: {str(e)}")
        sys.exit(1)