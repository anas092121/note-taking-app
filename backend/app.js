import express from "express";
import mongoose from "mongoose";

const app = express();

mongoose
  .connect("mongodb://localhost:27017/", {
    dbName: "noteApp",
  })
  .then((c) => console.log(`Database Connected with ${c.connection.host}`))
  .catch((e) => console.log(e));

app.listen(4000, () => {
  console.log("Sever Is Working......");
});
