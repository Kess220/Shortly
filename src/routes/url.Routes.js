import express from "express";
import { authenticate } from "../middlewares/authentication.js";
import { shortenUrl } from "../controllers/urlController.js";
import { getUrlById } from "../controllers/urlController.js";

const router = express.Router();

router.post("/shorten", authenticate, shortenUrl);
router.get("/:id", getUrlById);

export default router;
