import React, { useState } from "react";
import NotesCard from "../components/NotesCard";
import NotesTable from "../components/NotesTable";
import { Link } from "react-router-dom";
import { FaSquarePlus } from "react-icons/fa6";

const Heading = () => {
  const [tableNotes, setTableNotes] = useState(false);
  const [cardNotes, setCardNotes] = useState(false);

  return (
    <div className="bg-blue-200 py-8 px-4 md:py-16 md:px-8">
      <h2 className="text-4xl text-center font-bold text-blue-600 mb-8">
        Notes Taking Application
      </h2>

      <div className="flex justify-center mb-8">
        <div className="flex items-center justify-center gap-4">
          <button
            className={`py-2 px-4 text-lg font-semibold rounded border-2 border-purple-600 transition duration-100 ${
              tableNotes
                ? "bg-violet-800 text-white"
                : "bg-indigo-200 text-purple-600"
            } hover:bg-violet-800 hover:text-white`}
            onClick={() => {
              setTableNotes(true);
              setCardNotes(false);
            }}
          >
            Table
          </button>
          <button
            className={`py-2 px-4 text-lg font-semibold rounded border-2 border-purple-600 transition duration-100 ${
              cardNotes
                ? "bg-violet-800 text-white"
                : "bg-indigo-200 text-purple-600"
            } hover:bg-violet-800 hover:text-white`}
            onClick={() => {
              setCardNotes(true);
              setTableNotes(false);
            }}
          >
            Card
          </button>
        </div>
      </div>
      <div className="md:float-right pr-12 float-right mt-6">
        <Link to="/notes/create">
          <FaSquarePlus className="text-5xl cursor-pointer hover:shadow-lg" />
        </Link>
      </div>
      {tableNotes ? <NotesTable /> : <NotesCard />}
    </div>
  );
};

export default Heading;
