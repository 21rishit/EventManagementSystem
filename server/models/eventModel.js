import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

export const Event = mongoose.model("Event", eventSchema);
