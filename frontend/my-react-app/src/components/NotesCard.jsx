//NotesCard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaNoteSticky } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import Spinner from "./Spinner";
import { MdDelete } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import NotesModal from "../Models/NotesModal";
import DatesModal from "../Models/DatesModal";

const NotesCard = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [notesModal, setNotesModal] = useState(false);
  const [datesModal, setDatesModal] = useState(false);

  const API_URL = "http://localhost:4000/note";

  const getNotes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL);
      setNotes(response.data.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const openNotesModal = (index) => {
    setSelectedIndex(index);
    setNotesModal(true);
  };

  const closeNotesModal = () => {
    setSelectedIndex(null);
    setNotesModal(false);
  };

  const openDatesModal = (index) => {
    setSelectedIndex(index);
    setDatesModal(true);
  };

  const closeDatesModal = () => {
    setSelectedIndex(null);
    setDatesModal(false);
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div
          className="flex items-center
								justify-between mt-[100px]"
        >
          <div className="grid ">
            <div
              className="grid mt-10 ml-10 mr-4
										grid-cols-2 gap-8 
										min-w-[400px] 
										sm:grid-cols-4 
										lg:grid-cols-4 
										xl:grid-cols-4"
            >
              {notes.map((note, index) => (
                <div
                  key={note.id}
                  className="border-cyan-600 hover:shadow-2xl
											text-[20px] text-pretty
											text-2xl bg-blue-50 
											border-4 rounded-md p-6"
                >
                  <div className="text-2xl text-purple-950">
                    <span className="font-bold">S.No :</span>
                    {index + 1}
                  </div>
                  <div className="mt-6">
                    <span className="font-bold ">Topic :</span>
                    {note.topic}
                  </div>
                  <div className="mt-4">
                    <span className="font-bold ">Status :</span>
                    {note.status}
                  </div>
                  <div className="mt-4">
                    <span className="font-bold ">Date : </span>
                    {new Date(note.createdAt).toDateString()}
                  </div>
                  <div
                    className="flex items-center 
													justify-evenly mt-6
													mr-2 text-4xl"
                  >
                    <FaNoteSticky
                      className="text-purple-950 
																cursor-pointer"
                      onClick={() => openNotesModal(index)}
                    />
                    <Link to={`/notes/edit/${note._id}`}>
                      <MdEdit
                        className="text-green-800 
															cursor-pointer"
                      />
                    </Link>
                    <Link to={`/notes/delete/${note._id}`}>
                      <MdDelete
                        className="text-red-800 
																cursor-pointer"
                      />
                    </Link>
                    <CiCalendarDate
                      className="text-yellow-500 
																text-5xl 
																cursor-pointer"
                      onClick={() => openDatesModal(index)}
                    />
                  </div>
                  {notesModal && selectedIndex === index && (
                    <NotesModal onClose={closeNotesModal} note={note} />
                  )}
                  {datesModal && selectedIndex === index && (
                    <DatesModal onClose={closeDatesModal} note={note} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesCard;
