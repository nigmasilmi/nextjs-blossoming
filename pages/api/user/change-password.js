import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../lib/db";
import { hashPassword, verifyPassword } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "user not authenticated" });
    return;
  }
  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "user not found" });
    client.close();
    return;
  }

  const currentpassword = user.password;
  const passwordsAreEqual = await verifyPassword(oldPassword, currentpassword);
  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Invalid current password" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);
  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({ message: "Password updated" });
}

export default handler;