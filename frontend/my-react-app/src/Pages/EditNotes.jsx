import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { IoChevronBackCircle } from "react-icons/io5";

const EditNotes = () => {
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const URL = `http://localhost:4000/note/${id}`;
  const data = { topic, status, notes };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(URL);
        setTopic(response.data.topic);
        setStatus(response.data.status);
        setNotes(response.data.notes);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, []);

  const handleEdit = async () => {
    try {
      setIsLoading(true);
      await axios.put(URL, data);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="absolute left-8 top-11">
        <Link to="/">
          <IoChevronBackCircle className="-mt-6 text-5xl float-left cursor-pointer" />
        </Link>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="bg-green-100 flex min-w-[460px] items-center justify-center p-10 flex-col w-[450px] m-auto mt-20 mb-20 rounded-md">
          <div className="text-left text-2xl bold">Edit Notes</div>
          <input
            type="text"
            className="border-black w-[416px] mt-6 border-2 outline-none p-2 rounded-md focus:ring focus:border-purple-800"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <input
            type="text"
            className="border-black w-[416px] mt-6 border-2 outline-none p-2 rounded-md focus:ring focus:border-purple-800"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <textarea
            type="text"
            className="border-black w-[416px] mt-6 border-2 outline-none p-2 rounded-md h-[105px] focus:ring focus:border-purple-800 resize-none"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <button
            className="p-2 border-2 border-purple-900 text-2xl m-2 rounded-md font-bold text-green-950 transition duration-100 hover:bg-violet-300 hover:text-black delay-75 w-[416px] mt-6"
            onClick={handleEdit}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default EditNotes;
