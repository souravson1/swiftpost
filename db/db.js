const mongoose = require('mongoose');

(async ()=>{
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/swiftclone").then((con) => {
      console.log(`Database connected on : ${con.connection.host}`);
    })
  } catch (error) {
    console.log("mongoDB connection failed!", error);
    process.exit(1);
  }
})()