import express from "express";
import {
   createTicket,
   getAllTickets,
   getUserTickets,
   getTicketsByEventId,
   deleteTicket,
} from "../controllers/ticketController.js";

const router = express.Router();

router.post("/tickets", createTicket); // Create ticket
router.get("/tickets", getAllTickets); // Get all tickets
router.get("/tickets/user/:userId", getUserTickets); // Get tickets by user ID
router.get("/tickets/event/:eventId", getTicketsByEventId); // Get tickets by event ID
router.delete("/tickets/:id", deleteTicket); // Delete a ticket

export default router;
