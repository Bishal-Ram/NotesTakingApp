import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBackCircle } from "react-icons/io5";
import Spinner from "../components/Spinner";
import axios from "axios";

const AddNotes = () => {
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate("");

  const data = { topic, status, notes };
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await axios.post("http://localhost:4000/note", data);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      console.log(error.response);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="absolute left-8 top-11">
        <Link to="/">
          <IoChevronBackCircle className="-mt-6 text-5xl float-left cursor-pointer hover:shadow-outline" />
        </Link>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center mt-20">
          <div className="bg-green-100 p-10 rounded-md max-w-md">
            <label className="text-3xl font-bold" htmlFor="topic">
              Topic:
            </label>
            <input
              type="text"
              id="topic"
              className="border-2 border-black rounded-md w-full p-2 mt-2 focus:ring focus:border-purple-800 outline-none"
              placeholder="Enter topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <label className="text-3xl font-bold mt-4" htmlFor="status">
              Status:
            </label>
            <input
              type="text"
              id="status"
              className="border-2 border-black rounded-md w-full p-2 mt-2 focus:ring focus:border-purple-800 outline-none"
              placeholder="Enter status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <label className="text-3xl font-bold mt-4" htmlFor="notes">
              Notes:
            </label>
            <textarea
              id="notes"
              className="border-2 border-black rounded-md w-full p-2 mt-2 focus:ring focus:border-purple-800 outline-none h-40"
              placeholder="Enter notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <button
              className="w-full mt-4 bg-purple-900 text-white p-2 rounded-md font-bold text-xl transition duration-100 hover:bg-violet-300 hover:text-black"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNotes;
