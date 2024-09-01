import React from "react";
import "../styles/DeleteNote.css";
export default function DeleteNote({ setDeletingNote, handleDelete }) {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        padding: 20,
        gap: 12,
        top: "30%",
        left: "30%",
        transform: "translate(-50%, -50%)",
        boxShadow: "5px 6px 34px 0px rgba(0,0,0,0.75)",
      }}
    >
      <h3>Are you sure you want to delete?</h3>
      <div className="delete-buttons">
        <button onClick={() => setDeletingNote(false)}>Cancel</button>
        <button onClick={() => handleDelete()}>Delete</button>
      </div>
    </div>
  );
}
