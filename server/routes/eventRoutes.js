// import express from "express";
// import { protect } from "../middleware/authMiddleware.js";
// import { createEvent, getEvents, joinEvent } from "../controllers/eventController.js";

// const router = express.Router();

// router.post("/create", protect, createEvent);
// router.get("/", getEvents);
// router.post("/:id/join", protect, joinEvent);

// export default router;

import express from "express";
import { createEvent, getAllEvents, likeEvent} from "../controllers/eventController.js";
import multer from "multer";
import { getOrderSummary, getPaymentSummary } from "../controllers/eventController.js";


const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/", getAllEvents);
router.post("/createEvent", upload.single("image"), createEvent);
router.get("/allEvent", getAllEvents);
router.get("/:id/ordersummary", getOrderSummary);
router.get("/:id/ordersummary/paymentsummary", getPaymentSummary);
router.post("/:eventId/like", likeEvent);


export default router;

// import express from "express";
// import { createEvent, getAllEvents, getEventById, likeEvent } from "../controllers/eventController.js";
// import { upload } from "../middlewares/uploadMiddleware.js";

// const router = express.Router();

// router.post("/create", upload.single("image"), createEvent);
// router.get("/", getAllEvents);
// router.get("/:id", getEventById);
// router.post("/:eventId/like", likeEvent);

// export default router;
