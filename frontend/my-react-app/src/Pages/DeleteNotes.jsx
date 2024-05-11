//DeleteNotes.jsx
import React from "react";
import "../index.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoChevronBackCircle } from "react-icons/io5";

const DeleteNotes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:4000/note/${id}`);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <div
      className="flex items-center
			justify-center min-h-screen"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <div
          className="flex flex-col 
								items-center justify-center"
        >
          <div className="absolute left-8 top-11">
            <Link to="/">
              <IoChevronBackCircle
                className="-mt-6 text-5xl float-left 
							cursor-pointer hover:shadow-outline"
              />
            </Link>
          </div>
          <div className="md:w-[50%] lg:w-[40%] p-8">
            <p className="text-3xl text-center font-bold mb-6">
              Do you really want to delete the note you created? Rethink and
              then click the button below!
            </p>
            <button
              type="submit"
              className="w-full outline-none
								border-purple-950 border-2 
								rounded-md bg-blue-100 
								text-purple-800 hover:text-cyan-50
								hover:bg-slate-950 duration-100
								text-3xl submitBTN"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteNotes;
