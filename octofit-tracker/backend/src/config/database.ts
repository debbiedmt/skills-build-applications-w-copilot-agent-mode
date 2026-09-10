import mongoose from 'mongoose';

export async function connectDatabase(
  connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'
) {
  await mongoose.connect(connectionString);

  mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });

  return mongoose.connection;
}

export default mongoose.connection;
