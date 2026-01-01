const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://web-access:2kgglhUoP7V5qVWz@cluster01.cy2ug01.mongodb.net/leanmover?retryWrites=true&w=majority&appName=Cluster01';

async function testConnection() {
  try {
    console.log('🔄 Testing MongoDB connection...');
    console.log('URI:', MONGODB_URI.replace(/\/\/.*@/, '//<credentials>@'));
    
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // 10 seconds
      connectTimeoutMS: 10000,
    });
    
    console.log('✅ MongoDB connection successful!');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
    console.log('🌐 Host:', mongoose.connection.host);
    
    // Test basic operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📋 Existing collections:', collections.map(c => c.name));
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    
    if (error.message.includes('IP')) {
      console.log('\n💡 Solution: Add your IP address to MongoDB Atlas whitelist:');
      console.log('   1. Go to https://cloud.mongodb.com/');
      console.log('   2. Navigate to Network Access');
      console.log('   3. Add your current IP address');
      console.log('   4. Or add 0.0.0.0/0 for development (allow all IPs)');
    }
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log('🔌 Disconnected from MongoDB');
    }
  }
}

testConnection();