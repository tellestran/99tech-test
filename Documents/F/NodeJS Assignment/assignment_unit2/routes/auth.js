const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { celebrate, Joi, errors, Segments } = require("celebrate");
const { userSchema } = require("../schemas/userSchema");
const router = express.Router();

const usersFilePath = "./data/users.json";

const getUsersData = () => JSON.parse(fs.readFileSync(usersFilePath));
const saveUsersData = (data) =>
  fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));

router.post(
  "/register",
  celebrate({ [Segments.BODY]: userSchema }),
  async (req, res) => {
    const { username, password, employeeNumber } = req.body;
    const users = getUsersData();

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword, employeeNumber };

    users.push(newUser);
    saveUsersData(users);
    res.status(201).send("User registered");
  }
);

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = getUsersData();
  const user = users.find((u) => u.username === username);

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ username: user.username }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

router.use(errors()); // Celebrate error handler

module.exports = router;
