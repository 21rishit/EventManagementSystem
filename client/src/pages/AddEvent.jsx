import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function AddEvent() {
  const { user } = useContext(UserContext);

  // Initial State for Event Form
  const [formData, setFormData] = useState({
    owner: user ? user.name : "",
    title: "",
    optional: "",
    description: "",
    organizedBy: "",
    eventDate: "",
    eventTime: "",
    location: "",
    ticketPrice: 0,
    image: null, // Updated to handle file properly
    likes: 0
  });

  // Handle Input Changes for Text Fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => ({ ...prevState, image: file }));
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Creating a FormData object to send files properly
    const eventData = new FormData();
    Object.keys(formData).forEach((key) => {
      eventData.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        'events/createEvent', // Adjust API endpoint if needed
        eventData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }, // Important for file uploads
          withCredentials: true, // Ensures session cookies (if used)
        }
      );

      alert('Event created successfully!');
      console.log("Event Response:", response.data);

      // Clear form after successful submission
      setFormData({
        owner: user ? user.name : "",
        title: "",
        optional: "",
        description: "",
        organizedBy: "",
        eventDate: "",
        eventTime: "",
        location: "",
        ticketPrice: 0,
        image: null,
        likes: 0
      });

    } catch (error) {
      console.error("Error creating event:", error);
      alert('Failed to create event. Please try again.');
    }
  };

  return (
    <div className='flex flex-col ml-20 mt-10'>
      <div><h1 className='font-bold text-[36px] mb-5'>Post an Event</h1></div>
      
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>

        <label className='flex flex-col'>
          Title:
          <input
            type="text"
            name="title"
            className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            value={formData.title}
            onChange={handleChange}
          />
        </label>

        <label className='flex flex-col'>
          Optional:
          <input
            type="text"
            name="optional"
            className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            value={formData.optional}
            onChange={handleChange}
          />
        </label>

        <label className='flex flex-col'>
          Description:
          <textarea
            name="description"
            className='rounded mt-2 pl-5 px-4 py-2 ring-sky-700 ring-2 h-20 border-none'
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <label className='flex flex-col'>
          Organized By:
          <input
            type="text"
            name="organizedBy"
            className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            value={formData.organizedBy}
            onChange={handleChange}
          />
        </label>

        <label className='flex flex-col'>
          Event Date:
          <input
            type="date"
            name="eventDate"
            className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            value={formData.eventDate}
            onChange={handleChange}
          />
        </label>

        <label className='flex flex-col'>
          Event Time:
          <input
            type="time"
            name="eventTime"
            className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            value={formData.eventTime}
            onChange={handleChange}
          />
        </label>

        <label className='flex flex-col'>
          Location:
          <input
            type="text"
            name="location"
            className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            value={formData.location}
            onChange={handleChange}
          />
        </label>

        <label className='flex flex-col'>
          Ticket Price:
          <input
            type="number"
            name="ticketPrice"
            className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            value={formData.ticketPrice}
            onChange={handleChange}
          />
        </label>

        <label className='flex flex-col'>
          Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            className='rounded mt-2 pl-5 px-4 py-2 ring-sky-700 ring-2 h-12 border-none'
            onChange={handleImageUpload}
          />
        </label>

        <button className='primary' type="submit">Submit</button>

      </form>
    </div>
  );
}
