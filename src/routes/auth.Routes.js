import express from "express";
import { signup } from "../controllers/signupController.js";
import { signin } from "../controllers/signinController.js";
import { validateSignupData } from "../middlewares/validation.js";

const router = express.Router();

router.post("/signup", validateSignupData, signup);
router.post("/signin", signin);

export default router;
