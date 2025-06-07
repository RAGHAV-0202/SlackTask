import express from "express";
import { redirectToSlack, slackCallback } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/login", redirectToSlack);
router.get("/callback", slackCallback);

export default router;
