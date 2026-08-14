const express = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const users = JSON.parse(fs.readFileSync("users.json", "utf8"));

  if (users[email]) {
    return res.json({ status: "error", message: "این ایمیل قبلاً ثبت شده" });
  }

  const hashed = await bcrypt.hash(password, 10);

  users[email] = { username, email, password: hashed };

  fs.writeFileSync("users.json", JSON.stringify(users));

  res.json({ status: "ok" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const users = JSON.parse(fs.readFileSync("users.json", "utf8"));

  if (!users[email]) {
    return res.json({ status: "error", message: "کاربر وجود ندارد" });
  }

  const valid = await bcrypt.compare(password, users[email].password);

  if (!valid) {
    return res.json({ status: "error", message: "رمز اشتباه است" });
  }

  res.json({ status: "ok" });
});

app.listen(3000, () => console.log("Server running"));
