import * as mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(process.env.MONGO, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on("error", (err) => {
    console.log(`Connection failed: ${err}`);
});

export default mongoose;
