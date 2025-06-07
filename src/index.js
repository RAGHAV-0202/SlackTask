import express from "express";
import dotenv from "dotenv";
import messagesRouter from "./router/message.router.js";
import authRouter from "./router/auth.router.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/messages", messagesRouter);
app.use("/auth/slack", authRouter);

app.get("/", (req, res) => {
    res.status(200).json("Server is Live");
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
