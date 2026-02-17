const express = require("express");
const app = express();
const cors = require('cors')
app.use(express.json());

app.use(cors());

const users =[
{
"att": 89,
"uid": 108711,
"name": "Hanuman Singh",
"bonus": 50,
"total_sub":14
},
{
"att": 95,
"uid": 108765,
"name": "Mann",
"bonus": 12,
"total_sub":14
},
{
"att": 75,
"uid": 108795,
"name": "Pritesh",
"bonus": 95,
"total_sub":14
}
];

app.get("/", (req, res) => {
  res.send("Express server is running");
});

app.get("/all", (req, res) => {
  res.status(200).json(users);
});

app.get("/user/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const user = users.find(u => u.uid === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});


app.post("/user", (req, res) => {
  const newUser = {
    att: req.body.att,
    uid: req.body.uid,
    name: req.body.name,
    bonus: req.body.bonus,
    total_sub: req.body.total_sub,
  };

  users.push(newUser);

  res.status(201).json({
    message: "Product created",
    product: newUser
  });
});


app.put("/user/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const index = users.findIndex(u => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = {
    uid: userId,
    att: req.body.att,
    name: req.body.name,
    bonus: req.body.bonus,
    total_sub: req.body.total_sub
  };

  res.status(200).json({
    message: "User replaced",
    user: users[index]
  });
});


app.patch("/user/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const user = users.find(u => u.uid === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.body.name) user.name = req.body.name;

  res.status(200).json({
    message: "User updated",
    user
  });
});


app.delete("/user/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const index = users.findIndex(u => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.status(204).end();
});


app.listen(3000, () => {
  console.log("Server started on port 3000");
});
