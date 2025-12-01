#!/bin/bash

# LifeQuest API Test Script
echo "🧪 Testing LifeQuest API"
echo "========================"

BASE_URL="http://localhost:3000"

# Test 1: Health Check
echo -e "\n1️⃣ Health Check"
curl -s $BASE_URL/health | jq

# Test 2: Login
echo -e "\n\n2️⃣ Login Test"
LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alex@test.com","password":"password123"}')

echo $LOGIN_RESPONSE | jq

# Extract token
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')
echo "Token extracted: ${TOKEN:0:50}..."

# Test 3: Get User Profile
echo -e "\n\n3️⃣ Get User Profile"
curl -s $BASE_URL/api/users/me \
  -H "Authorization: Bearer $TOKEN" | jq

# Test 4: Get User Quests
echo -e "\n\n4️⃣ Get User Quests"
curl -s $BASE_URL/api/quests \
  -H "Authorization: Bearer $TOKEN" | jq

# Test 5: Create New Quest
echo -e "\n\n5️⃣ Create New Quest"
curl -s -X POST $BASE_URL/api/quests \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "API Test Quest",
    "description": "Testing the API",
    "category": "ACADEMICS",
    "type": "DAILY",
    "difficulty": "MEDIUM"
  }' | jq

# Test 6: Get Leaderboard
echo -e "\n\n6️⃣ Get Overall Leaderboard"
curl -s $BASE_URL/api/leaderboard \
  -H "Authorization: Bearer $TOKEN" | jq '.leaderboard[] | {rank, username, level, totalXp}'

# Test 7: Get Achievements
echo -e "\n\n7️⃣ Get Achievements"
curl -s $BASE_URL/api/achievements \
  -H "Authorization: Bearer $TOKEN" | jq '.achievements[0:3]'

# Test 8: Get User Stats
echo -e "\n\n8️⃣ Get User Stats"
curl -s $BASE_URL/api/users/me/stats \
  -H "Authorization: Bearer $TOKEN" | jq

echo -e "\n\n✅ API Tests Complete!"
