const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Clear existing data
  console.log('Clearing existing data...');
  await prisma.userAchievement.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.quest.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.user.deleteMany();

  // Create test users
  console.log('Creating test users...');
  const password = await bcrypt.hash('password123', 10);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'alex@test.com',
        username: 'alex_student',
        password,
        name: 'Alex',
        level: 5,
        totalXp: 550,
        currentXp: 50,
        academicsXp: 200,
        fitnessXp: 150,
        creativityXp: 100,
        explorationXp: 50,
        wellnessXp: 50
      }
    }),
    prisma.user.create({
      data: {
        email: 'jordan@test.com',
        username: 'jordan_quest',
        password,
        name: 'Jordan',
        level: 7,
        totalXp: 850,
        currentXp: 50,
        academicsXp: 300,
        fitnessXp: 200,
        creativityXp: 150,
        explorationXp: 100,
        wellnessXp: 100
      }
    }),
    prisma.user.create({
      data: {
        email: 'sam@test.com',
        username: 'sam_achiever',
        password,
        name: 'Sam',
        level: 3,
        totalXp: 250,
        currentXp: 50,
        academicsXp: 100,
        fitnessXp: 50,
        creativityXp: 50,
        explorationXp: 25,
        wellnessXp: 25
      }
    })
  ]);

  console.log(`✅ Created ${users.length} users\n`);

  // Create achievements
  console.log('Creating achievements...');
  const achievements = await Promise.all([
    // Academic achievements
    prisma.achievement.create({
      data: {
        title: 'First Steps',
        description: 'Complete your first academic quest',
        category: 'ACADEMICS',
        requirement: 'Complete 1 academic quest',
        xpReward: 25
      }
    }),
    prisma.achievement.create({
      data: {
        title: 'Scholar',
        description: 'Complete 10 academic quests',
        category: 'ACADEMICS',
        requirement: 'Complete 10 academic quests',
        xpReward: 50
      }
    }),
    prisma.achievement.create({
      data: {
        title: 'Academic Master',
        description: 'Reach 500 XP in academics',
        category: 'ACADEMICS',
        requirement: 'Gain 500 academics XP',
        xpReward: 100
      }
    }),
    // Fitness achievements
    prisma.achievement.create({
      data: {
        title: 'Moving Forward',
        description: 'Complete your first fitness quest',
        category: 'FITNESS',
        requirement: 'Complete 1 fitness quest',
        xpReward: 25
      }
    }),
    prisma.achievement.create({
      data: {
        title: 'Fitness Warrior',
        description: 'Maintain a 7-day fitness streak',
        category: 'FITNESS',
        requirement: 'Complete fitness quests 7 days in a row',
        xpReward: 75
      }
    }),
    // General achievements
    prisma.achievement.create({
      data: {
        title: 'Level Up!',
        description: 'Reach level 5',
        category: 'GENERAL',
        requirement: 'Reach level 5',
        xpReward: 50
      }
    }),
    prisma.achievement.create({
      data: {
        title: 'Well Rounded',
        description: 'Complete quests in all 5 categories',
        category: 'GENERAL',
        requirement: 'Complete at least 1 quest in each category',
        xpReward: 100
      }
    })
  ]);

  console.log(`✅ Created ${achievements.length} achievements\n`);

  // Create some sample quests for the first user
  console.log('Creating sample quests...');
  const quests = await Promise.all([
    prisma.quest.create({
      data: {
        userId: users[0].id,
        title: 'Study for Math Exam',
        description: 'Review chapters 5-8',
        category: 'ACADEMICS',
        type: 'DAILY',
        difficulty: 'HARD',
        xpReward: 35
      }
    }),
    prisma.quest.create({
      data: {
        userId: users[0].id,
        title: 'Morning Jog',
        description: '30 minutes around campus',
        category: 'FITNESS',
        type: 'DAILY',
        difficulty: 'MEDIUM',
        xpReward: 20,
        streak: 3
      }
    }),
    prisma.quest.create({
      data: {
        userId: users[0].id,
        title: 'Complete Art Project',
        description: 'Finish the painting due Friday',
        category: 'CREATIVITY',
        type: 'WEEKLY',
        difficulty: 'EPIC',
        xpReward: 50,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      }
    })
  ]);

  console.log(`✅ Created ${quests.length} sample quests\n`);

  // Unlock achievement for first user
  console.log('Unlocking sample achievement...');
  await prisma.userAchievement.create({
    data: {
      userId: users[0].id,
      achievementId: achievements[0].id
    }
  });

  console.log('✅ Unlocked achievement\n');

  console.log('✨ Seed completed successfully!');
  console.log('\nTest Accounts:');
  console.log('─────────────────────────────');
  console.log('Email: alex@test.com');
  console.log('Email: jordan@test.com');
  console.log('Email: sam@test.com');
  console.log('Password (all): password123\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
