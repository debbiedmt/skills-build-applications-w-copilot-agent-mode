import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            LeaderboardEntry.deleteMany({}),
            Workout.deleteMany({})
        ]);
        const users = await User.insertMany([
            { name: 'Ada Lovelace', email: 'ada@example.com', role: 'admin', fitnessLevel: 'advanced', points: 1420 },
            { name: 'Grace Hopper', email: 'grace@example.com', role: 'coach', fitnessLevel: 'advanced', points: 1285 },
            { name: 'Linus Torvalds', email: 'linus@example.com', role: 'member', fitnessLevel: 'intermediate', points: 980 },
            { name: 'Margaret Hamilton', email: 'margaret@example.com', role: 'member', fitnessLevel: 'intermediate', points: 1120 },
            { name: 'Alan Turing', email: 'alan@example.com', role: 'member', fitnessLevel: 'beginner', points: 760 }
        ]);
        await Team.insertMany([
            {
                name: 'Trail Blazers',
                captain: users[0]._id,
                members: [users[0]._id, users[3]._id],
                points: 2540,
                location: 'North Campus'
            },
            {
                name: 'Sprint Squad',
                captain: users[1]._id,
                members: [users[1]._id, users[2]._id, users[4]._id],
                points: 3025,
                location: 'West Gym'
            }
        ]);
        await Activity.insertMany([
            { userId: users[0]._id, type: 'Run', duration: 32, calories: 280, date: '2026-09-01' },
            { userId: users[1]._id, type: 'Cycling', duration: 45, calories: 340, date: '2026-09-03' },
            { userId: users[2]._id, type: 'Strength', duration: 38, calories: 260, date: '2026-09-04' },
            { userId: users[3]._id, type: 'Yoga', duration: 25, calories: 180, date: '2026-09-05' },
            { userId: users[4]._id, type: 'HIIT', duration: 28, calories: 220, date: '2026-09-07' }
        ]);
        await LeaderboardEntry.insertMany([
            { userId: users[0]._id, name: 'Ada Lovelace', points: 1420, rank: 1 },
            { userId: users[1]._id, name: 'Grace Hopper', points: 1285, rank: 2 },
            { userId: users[3]._id, name: 'Margaret Hamilton', points: 1120, rank: 3 },
            { userId: users[2]._id, name: 'Linus Torvalds', points: 980, rank: 4 },
            { userId: users[4]._id, name: 'Alan Turing', points: 760, rank: 5 }
        ]);
        await Workout.insertMany([
            { title: 'Morning Mobility', difficulty: 'Beginner', duration: 20, focus: 'Flexibility', target: 'Recovery' },
            { title: 'Hill Intervals', difficulty: 'Intermediate', duration: 35, focus: 'Cardio', target: 'Endurance' },
            { title: 'Power Circuit', difficulty: 'Advanced', duration: 42, focus: 'Strength', target: 'Full Body' },
            { title: 'Core Blast', difficulty: 'Intermediate', duration: 25, focus: 'Core', target: 'Abs' }
        ]);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
