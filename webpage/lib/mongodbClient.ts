import { MongoClient } from "mongodb";

const db_password = process.env.DB_PASSWORD;
const uri = `mongodb+srv://user:${db_password}@web-portfolio.c6qd2.mongodb.net/?retryWrites=true&w=majority&appName=web-portfolio`;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.DB_PASSWORD) {
  throw new Error('Please add your MongoDB password to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!(global as any)._mongoClientPromise) {
    console.log("Creating new MongoClient instance for development");
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect();
  } else {
    console.log("Reusing existing MongoClient instance for development");
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  console.log("Creating new MongoClient instance for production");
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  try {
    const client = await clientPromise;
    console.log("Connected to MongoDB!");
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
