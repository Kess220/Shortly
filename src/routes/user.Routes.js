import express from "express";
import { getUserProfile } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authentication.js";

const router = express.Router();

router.get("/", authenticate, getUserProfile);

export default router;
