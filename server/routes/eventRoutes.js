import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createEvent, getEvents, joinEvent } from "../controllers/eventController.js";

const router = express.Router();

router.post("/create", protect, createEvent);
router.get("/", getEvents);
router.post("/:id/join", protect, joinEvent);

export default router;
