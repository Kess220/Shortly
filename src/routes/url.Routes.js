import express from "express";
import { authenticate } from "../middlewares/authentication.js";
import { shortenUrl } from "../controllers/urlController.js";
import { getUrlById } from "../controllers/urlController.js";
import { deleteUrl } from "../controllers/urlController.js";
import { openUrl } from "../controllers/urlController.js";

const router = express.Router();

router.post("/shorten", authenticate, shortenUrl);
router.get("/:id", getUrlById);
router.delete("/:id", authenticate, deleteUrl);
router.get("/open/:shortUrl", openUrl);

export default router;
