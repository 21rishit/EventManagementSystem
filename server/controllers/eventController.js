import { Event } from "../models/eventModel.js";

export const createEvent = async (req, res) => {
  try {
    const event = new Event({ ...req.body, createdBy: req.user.id });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: "Error creating event" });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name");
    res.json(events);
  } catch (err) {
    res.status(400).json({ message: "Error fetching events" });
  }
};

export const joinEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event.attendees.includes(req.user.id)) {
      event.attendees.push(req.user.id);
      await event.save();
    }
    res.json({ message: "Joined event" });
  } catch (err) {
    res.status(400).json({ message: "Error joining event" });
  }
};
