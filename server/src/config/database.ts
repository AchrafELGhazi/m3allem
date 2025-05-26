import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    const mongoUri = isProduction
      ? process.env.MONGODB_URI_PROD
      : process.env.MONGODB_URI_DEV || 'mongodb://localhost:27017/m3allem_dev';

    if (!mongoUri) {
      throw new Error(
        `MongoDB URI not found for ${
          isProduction ? 'production' : 'development'
        } environment`
      );
    }

    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(mongoUri, options);

    console.log(
      `✅ Connected to MongoDB (${isProduction ? 'Atlas' : 'Local'})`
    );

    // Handle connection events
    mongoose.connection.on('error', error => {
      console.error('❌ MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🔌 MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('🔌 Database disconnected');
  } catch (error) {
    console.error('❌ Error disconnecting from database:', error);
    throw error;
  }
};
