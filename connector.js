const mongoURI = "mongodb+srv://edo:edo@atlascluster.u0w3ssa.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"

let mongoose = require('mongoose');

module.exports= function connectDB() {
    const url = mongoURI;
   
    try {
      mongoose.connect(url, {
        useNewUrlParser: true,
      });
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
    const dbConnection = mongoose.connection;
    dbConnection.once("open", (_) => {
      console.log(`Database connected: ${url}`);
    });
   
    dbConnection.on("error", (err) => {
      console.error(`connection error: ${err}`);
    });
    return;
  }