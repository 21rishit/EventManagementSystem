import Ticket from "../models/ticketModel.js";

// Create a new ticket
export const createTicket = async (req, res) => {
   try {
      const ticketDetails = req.body;
      const newTicket = new Ticket(ticketDetails);
      await newTicket.save();
      res.status(201).json({ ticket: newTicket });
   } catch (error) {
      console.error("Error creating ticket:", error);
      res.status(500).json({ error: "Failed to create ticket" });
   }
};

// export const getUserTickets = async (req, res) => {
//    try {
//       const tickets = await Ticket.find({ userId: req.params.userId });
//       res.json(tickets);
//    } catch (error) {
//       res.status(500).json({ error: "Failed to fetch tickets" });
//    }
// };

// Get all tickets
export const getAllTickets = async (req, res) => {
   try {
      const tickets = await Ticket.find();
      res.json(tickets);
   } catch (error) {
      console.error("Error fetching tickets:", error);
      res.status(500).json({ error: "Failed to fetch tickets" });
   }
};

// Get tickets by user ID
export const getUserTickets = async (req, res) => {
   const { userId } = req.params;
   try {
      const tickets = await Ticket.find({ userId });
      res.json(tickets);
   } catch (error) {
      console.error("Error fetching user tickets:", error);
      res.status(500).json({ error: "Failed to fetch user tickets" });
   }
};

// Get tickets by event ID
export const getTicketsByEventId = async (req, res) => {
   const { eventId } = req.params;
   try {
      const tickets = await Ticket.find({ eventId });
      res.json(tickets);
   } catch (error) {
      console.error("Error fetching tickets for event:", error);
      res.status(500).json({ error: "Failed to fetch event tickets" });
   }
};

// Delete a ticket by ID
export const deleteTicket = async (req, res) => {
   const { id } = req.params;
   try {
      await Ticket.findByIdAndDelete(id);
      res.status(204).send();
   } catch (error) {
      console.error("Error deleting ticket:", error);
      res.status(500).json({ error: "Failed to delete ticket" });
   }
};
