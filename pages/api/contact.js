import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    const invalidInput =
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === "";

    if (invalidInput) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const newMessage = { email, name, message };
    let client;
    try {
      client = await MongoClient.connect(
        `mongodb+srv://${process.env.NEXT_PUBLIC_MONGO_USER}:${process.env.NEXT_PUBLIC_MONGO_PASS}@cluster0.mwgct.mongodb.net/nextjs-blog?retryWrites=true&w=majority`
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
      return;
    }

    const db = client.db();
    try {
      const result = await db.collection("contact").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (err) {
      client.close();
      res.status(500).json({ message: err.message });
      return;
    }
    client.close();
    res
      .status(201)
      .json({ message: "Successfully stored message", message: newMessage });
  }
}

export default handler;
