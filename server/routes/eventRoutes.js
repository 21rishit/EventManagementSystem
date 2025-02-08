// import express from "express";
// import { protect } from "../middleware/authMiddleware.js";
// import { createEvent, getEvents, joinEvent } from "../controllers/eventController.js";

// const router = express.Router();

// router.post("/create", protect, createEvent);
// router.get("/", getEvents);
// router.post("/:id/join", protect, joinEvent);

// export default router;

import express from "express";
import { createEvent, getAllEvents } from "../controllers/eventController.js";
import { getEventById } from "../controllers/eventController.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/createEvent", upload.single("image"), createEvent);
router.get("/createEvent", getAllEvents);
router.get("/event/:id", getEventById);

export default router;
