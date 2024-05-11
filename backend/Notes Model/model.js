// Notes Modal/model.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const noteSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Notes = mongoose.model("note", noteSchema);
