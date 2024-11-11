const mongoose = require('mongoose');

const ConnectDB= async ()=>{
    await mongoose.connect('mongodb+srv://kaifzafry3110:ZMYhhrjDfwxABgSk@namastenode.t42j3.mongodb.net/DevTinder')
   
}

module.exports = ConnectDB;

