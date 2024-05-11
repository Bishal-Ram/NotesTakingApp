//DatesModal.jsx
import React from "react";
import { CiCalendarDate } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";

const DatesModal = ({ onClose, note }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-60
	top-0 left-0 right-0 
	bottom-0 flex justify-center
		items-center"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full
						bg-white h-fit rounded-xl p-4
						flex flex-col relative"
      >
        <RxCrossCircled
          className="absolute right-6 top-6 
							text-3xl text-red-600
							cursor-pointer"
          onClick={onClose}
        />
        <h4
          className="mt-5 text-2xl 
							font-bold underline"
        >
          {note.topic}
        </h4>
        <div
          className="flex items-center
							gap-3 my-8"
        >
          <CiCalendarDate
            className="text-red-500 
								text-3xl"
          />
          <h2>{new Date(note.createdAt).toDateString()}</h2>
        </div>
        <p>
          Created at:
          <span className="mt-4">
            {new Date(note.createdAt).getFullYear()}-
            {new Date(note.createdAt).getMonth() + 1}-
            {new Date(note.createdAt).getDate()}
            {new Date(note.createdAt).toTimeString().split(" ")[0]}
          </span>
        </p>
        <p>
          Updated at :
          <span className="mt-4">
            {new Date(note.updatedAt).getFullYear()}-
            {new Date(note.updatedAt).getMonth() + 1}-
            {new Date(note.updatedAt).getDate()}
            {new Date(note.updatedAt).toTimeString().split(" ")[0]}
          </span>
        </p>
      </div>
    </div>
  );
};

export default DatesModal;
