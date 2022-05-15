import { connectDatabase, insertDocument } from "../../helpers/db-utils";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email adress" });
      return;
    }

    let client;
    try {
      client = await connectDatabase();
    } catch (err) {
      client.close();
      res.status(500).json({ message: err.message });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      client.close();
      res.status(201).json({ message: "succes" });
    } catch (err) {
      client.close();
      res.status(500).json({ message: err.message });
      return;
    }
  } else {
    res.status(200).json({ message: "hola working" });
  }
}

export default handler;
