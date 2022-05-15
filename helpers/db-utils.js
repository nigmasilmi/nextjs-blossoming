import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.NEXT_PUBLIC_MONGO_USER}:${process.env.NEXT_PUBLIC_MONGO_PASS}@cluster0.mwgct.mongodb.net/events?retryWrites=true&w=majority`
  );
  return client;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
};

export async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db();

  const result = await db.collection(collection).find().sort(sort).toArray();
  return result;
}
