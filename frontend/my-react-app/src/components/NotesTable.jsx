//NotesTable.jsx
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const NotesTable = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const URL = "http://localhost:4000/note";

  const fetchNotes = async () => {
    try {
      const notesData = await axios.get(URL);
      setNotes(notesData.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <table
          className="w-full border-separate 
							border-spacing-4 p-4 mt-4"
        >
          <thead>
            <tr>
              <th
                className="border-purple-600 text-xl 
										border-2 rounded-md p-2"
              >
                S.No
              </th>
              <th
                className="border-purple-600 text-xl 
										border-2 rounded-md p-2"
              >
                Topic
              </th>
              <th
                className="border-purple-600 text-xl 
										border-2 rounded-md p-2 
										max-md:hidden"
              >
                Status
              </th>
              <th
                className="border-purple-600 text-xl 
										border-2 rounded-md
										p-2 max-md:hidden"
              >
                Date
              </th>
              <th
                className="border-purple-600 text-xl 
										border-2 rounded-md p-2"
              >
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {notes.map((item, index) => (
              <tr key={item.id}>
                <td
                  className="text-center border-purple-600
											border-2 rounded-md p-2 "
                >
                  {index + 1}
                </td>
                <td
                  className="border-purple-600 border-2 
											rounded-md p-2"
                >
                  {item.topic}
                </td>
                <td
                  className="max-md:hidden outline-none 
											border-purple-600 border-2 
											rounded-md p-2"
                >
                  {item.status}
                </td>
                <td
                  className="max-md:hidden border-purple-600
											border-2 rounded-md p-2"
                >
                  {new Date(item.createdAt).toString()}
                </td>
                <td>
                  <p
                    className="border-purple-600 min-h-[116px]
												border-2 outline-none
												rounded-md p-2"
                  >
                    {item.notes}
                  </p>
                </td>
                <td
                  className="flex items-center
											justify-around p-2"
                >
                  <Link to={`/notes/edit/${item._id}`}>
                    <FaEdit
                      className="cursor-pointer
														text-3xl "
                    />
                  </Link>
                  <Link to={`/notes/delete/${item._id}`}>
                    <MdDelete
                      className="cursor-pointer
															text-3xl "
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NotesTable;
