import express from "express";
import {sendMessage, scheduleMessage, getMessageHistory, editMessage, deleteMessage} from "../controllers/message.controller.js"

const router = express.Router();

router.post("/send", sendMessage);
router.post("/schedule", scheduleMessage);
router.get("/history/:channel", getMessageHistory);
router.post("/edit", editMessage);
router.post("/delete", deleteMessage);

export default router;
