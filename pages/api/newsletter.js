function handler(req, res) {
  console.log("entra");
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email adress" });
      return;
    }
    console.log(userEmail);
    res.status(201).json({ message: "success!" });
  }

  res.status(200).json({ message: "hola working" });
}
