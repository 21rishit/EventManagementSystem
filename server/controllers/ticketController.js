import Ticket from "../models/ticketModel.js";

// Create a new ticket
export const createTicket = async (req, res) => {
   try {
      const { userid, eventid, ticketDetails, count } = req.body;

      if (!userid || !eventid || !ticketDetails) {
         return res.status(400).json({ error: "Missing required fields" });
      }

      const newTicket = new Ticket({
         userid,
         eventid,
         ticketDetails,  // No need to set ticketId initially
         count: count || 1,
      });

      const savedTicket = await newTicket.save(); // Save first

      // Attach the `_id` in the response (without saving again)
      const ticketWithId = savedTicket.toObject(); 
      ticketWithId.ticketDetails.ticketId = savedTicket._id; 

      res.status(201).json({ ticket: ticketWithId }); 
   } catch (error) {
      console.error("Error creating ticket:", error);
      res.status(500).json({ error: "Failed to create ticket" });
   }
};

// Get tickets by user ID
export const getUserTickets = async (req, res) => {
   const { userId } = req.params;
   try {
      // Fetch tickets for the given user ID
      const tickets = await Ticket.find({ userid: userId });

      // Ensure ticket ID is included in the response
      const updatedTickets = tickets.map(ticket => ({
         ...ticket.toObject(),
         ticketDetails: {
            ...ticket.ticketDetails,
            ticketId: ticket._id, // Attach the unique ticket _id
         }
      }));

      res.json(updatedTickets);
   } catch (error) {
      console.error("Error fetching user tickets:", error);
      res.status(500).json({ error: "Failed to fetch user tickets" });
   }
};

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


// Get tickets by event ID
export const getTicketsByEventId = async (req, res) => {
   const { eventId } = req.params;
   try {
      const tickets = await Ticket.find({ eventid: eventId });
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
      const ticket = await Ticket.findByIdAndDelete(id);

      if (!ticket) {
         return res.status(404).json({ error: "Ticket not found" });
      }

      res.status(200).json({ message: "Ticket deleted successfully" });
   } catch (error) {
      console.error("Error deleting ticket:", error);
      res.status(500).json({ error: "Failed to delete ticket" });
   }
};
