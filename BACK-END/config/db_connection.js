import mongoose from "mongoose";
const Connect = () => {
  mongoose
    .connect(process.env.DB, {
      dbName: "test",
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB connection error:", err));
};

export default Connect;
