const express = require("express");
const ConnectDB = require("./config/database");
const userModel = require("./models/user");
const app = express();

// Bodyparser middleware
app.use(express.json());

// Routes
app.post("/api", async (req, res) => {
  console.log(req.body);
  const newUser = new userModel(req.body);
  try {
    await newUser.save();
    console.log("user saved successfully", newUser);
  } catch (error) {
    console.log(error.message);
  }
  res.send("User added successfully");
});


app.get("/api/NewUsers", async (req, res) => {
  try {
    // const users = await users.find({});//-
    const users = await userModel.find({});//+
    console.log("All Users:", users);
    res.json(users);//+
  } catch (err) {
//-
    console.error("Error:", err);
//-
    res.status(500).json({ error: "Internal Server Error" });//+
  }
});

// delete api user

app.delete("/api/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await userModel.findByIdAndDelete({_id: userId});
    res.send('user deleted successfully');

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// update api user


app.put("/api/user", async (req, res) => {
  const userId = req.body.userId;
  const updatedUser = req.body;
  const newEmail = req.body.emailId;

  try {

    const user = await userModel.findByIdAndUpdate(
      userId,
      { emailId: newEmail },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: 'Email updated successfully', user });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




// Connect to MongoDB

ConnectDB()
  .then(() => {
    console.log("Connecting to MongoDB database is accepted");
    app.listen(7000, () => console.log("Server is running on port 7000"));
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB database");
    console.log(err.message);
  });
