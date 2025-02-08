// import { Event } from "../models/eventModel.js";

// export const createEvent = async (req, res) => {
//   try {
//     const event = new Event({ ...req.body, createdBy: req.user.id });
//     await event.save();
//     res.status(201).json(event);
//   } catch (err) {
//     res.status(400).json({ message: "Error creating event" });
//   }
// };

// export const getEvents = async (req, res) => {
//   try {
//     const events = await Event.find().populate("createdBy", "name");
//     res.json(events);
//   } catch (err) {
//     res.status(400).json({ message: "Error fetching events" });
//   }
// };

// export const joinEvent = async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);
//     if (!event.attendees.includes(req.user.id)) {
//       event.attendees.push(req.user.id);
//       await event.save();
//     }
//     res.json({ message: "Joined event" });
//   } catch (err) {
//     res.status(400).json({ message: "Error joining event" });
//   }
// };


import Event from "../models/eventModel.js";

export const createEvent = async (req, res) => {
   try {
      const eventData = req.body;
      eventData.image = req.file ? req.file.path : "";
      const event = new Event(eventData);
      await event.save();
      res.status(201).json(event);
   } catch (error) {
      res.status(500).json({ error: "Failed to create event" });
   }
};

export const getAllEvents = async (req, res) => {
   try {
      const events = await Event.find();
      res.json(events);
   } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
   }
};

export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.json(event);
    } catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).json({ error: "Server error" });
    }
};
