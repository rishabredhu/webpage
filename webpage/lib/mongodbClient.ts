import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

// Declare a global variable to hold the MongoDB connection promise for development
declare global {
  // This is necessary because TypeScript does not know about global properties like _mongoClientPromise
  var _mongoClientPromise: Promise<MongoClient>;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

console.debug('MongoDB URI:', uri);
console.debug('MongoDB Options:', options);

// Only create a new client if it doesn't already exist
if (process.env.NODE_ENV === 'development') {
  console.debug('Environment: Development');
  if (!global._mongoClientPromise) {
    console.debug('Creating new MongoClient instance for development');
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  } else {
    console.debug('Reusing existing MongoClient instance for development');
  }
  clientPromise = global._mongoClientPromise;
} else {
  console.debug('Environment: Production');
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  console.debug('Connecting to database...');
  try {
    const connection = await clientPromise;
    console.debug('Successfully connected to database');
    return connection;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error; // Ensure the error is properly propagated
  }
}

export async function checkDatabaseConnection() {
  console.debug('Checking database connection...');
  try {
    const client = await clientPromise;
    await client.db().command({ ping: 1 });
    console.debug('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
}

export default clientPromise;
