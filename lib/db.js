import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  let client;
  try {
    client = await MongoClient.connect(
      `mongodb+srv://${process.env.NEXT_PUBLIC_MONGO_USER}:${process.env.NEXT_PUBLIC_MONGO_PASS}@cluster0.mwgct.mongodb.net/next-auth?retryWrites=true&w=majority`
    );
  } catch (err) {
    console.log(err);
    return;
  }

  return client;
}
