const express = require('express');
const ConnectDB = require('./config/database');
const userModel = require('./models/user');
const app = express();

// Bodyparser middleware
app.use(express.json());

// Routes
app.post('/api', async (req, res)=>{
  console.log(req.body);
 const newUser = new userModel(req.body);
  try {
   await newUser.save()
    console.log('user saved successfully', newUser);
  } catch (error) {
    console.log(error.message);
  }
  res.send('User added successfully');
  
},
)

// app.get('/api/users', async (req, res) => {
//   await userModel.find({});
// console.log("all model found")
// })
// Connect to MongoDB

ConnectDB()
.then(()=>{
console.log('Connecting to MongoDB database is accepted');
app.listen(7000, () => console.log('Server is running on port 7000'));
})
.catch((err)=>{
  console.log('Failed to connect to MongoDB database');
  console.log(err.message);
})

 



