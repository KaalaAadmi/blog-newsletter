import express from "express";
import serverless from "serverless-http";
import mongoose from "mongoose";
import cors from "cors";
import Newsletter from "./models/Newsletter.js";
import Blog from "./models/Blog.js";
import dotenv from "dotenv";

const app = express();
const port = 5000;
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cors());
app.use(express.json());

app.get("/hello", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.post("/newsletter", async (req, res) => {
  // console.log(req.body);
  const newEmail = new Newsletter(req.body);
  try {
    const savedEmail = await newEmail.save();
    res.status(200).json({ success: true, savedEmail });
  } catch (error) {
    console.log(error);
  }
});


app.post('/api/blog', async (req, res) => {
  const newBlog = new Blog(req.body);
  try {
    const savedBlog = await newBlog.save();
    res.status(200).json({ success: true, savedBlog });
  } catch (error) {
    console.log(error);
  }
})

connect();

app.listen(process.env.PORT || port, () => {
  console.log(`Listening on port ${port}`);
});
