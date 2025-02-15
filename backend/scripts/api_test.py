import requests
import json

BASE_URL = "http://localhost:8000/api"


def test_endpoints():
    """Test all API endpoints"""
    
    # 1. Create a user
    user_data = {
        "username": "testuser",
        "email": "test@example.com",
        "wallet_address": "0x123456789abcdef123456789abcdef123456789a"
    }
    
    print("\n🧪 Testing User Creation...")
    response = requests.post(f"{BASE_URL}/users", json=user_data)
    print_response(response)
    
    if response.status_code == 201:
        user_id = response.json()['id']
        
        # 2. Create a challenge
        challenge_data = {
            "title": "Test Challenge",
            "difficulty": "Easy",
            "description": "Test description",
            "examples": [{
                "input": "test input",
                "output": "test output",
                "explanation": "test explanation"
            }],
            "constraints": ["Must be valid input"],
            "initial_code": "// Your code here",
            "tags": ["Solidity"]
        }
        
        print("\n🧪 Testing Challenge Creation...")
        response = requests.post(
            f"{BASE_URL}/challenges", 
            json=challenge_data,
            headers={"Authorization": f"Bearer test_token"}
        )
        print_response(response)
        
        # 3. Get all challenges
        print("\n🧪 Testing Get Challenges...")
        response = requests.get(f"{BASE_URL}/challenges")
        print_response(response)


def print_response(response):
    """Pretty print API response"""
    print(f"Status Code: {response.status_code}")
    try:
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except:
        print(f"Response: {response.text}")
    print("-" * 50)


if __name__ == "__main__":
    test_endpoints()