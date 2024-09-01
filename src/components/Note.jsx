import React, { useState } from "react";
import "../styles/Note.css";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { AiFillFolder } from "react-icons/ai";
import { AiFillFolderOpen } from "react-icons/ai";
import { API_URL } from "../config";

import axios from "axios";
import DeleteNote from "./DeleteNote";

export default function Note({
  note,
  setEditingNote,
  setEditingId,
  reflectChanges,
  setReflectChanges,
}) {
  const { id, title, content, archived } = note;
  const [deletingNote, setDeletingNote] = useState(false);

  /**
   * deleteNote
   */
  const handleDelete = async () => {
    await axios
      .delete(API_URL + `note/delete/${id}`)
      .catch((error) => {
        console.error(error);
      });
    setReflectChanges(!reflectChanges);
  };

  /**
   * toggleArchived
   */
  const handleArchive = async () => {
    await axios
      .patch(API_URL + `note/archived/${id}`)
      .catch((error) => {
        console.error(error);
      });
    setReflectChanges(!reflectChanges);
  };

  const handleUpdate = () => {
    setEditingId(id);
    setEditingNote(true);
    setReflectChanges(!reflectChanges);
  };

  return (
    <div key={id} className="item" >
      <h3 style={{ marginBottom: "4px", marginTop: "0px" }}>Title</h3>
      <p style={{ marginTop: "0px", marginBottom: "8px" }}>{title}</p>
      <hr style={{ width: "90%" }} />
      <h3 style={{ marginBottom: "4px", marginTop: "16px" }}>Content</h3>
      <p style={{ marginTop: "0px", marginBottom: "8px", width:"90%", overflowWrap: "break-word", wordBreak: "break-word", textAlign:"center"}}>
      {content}</p>
      <div style={{  width:"100%", marginTop:"auto"}}>

      <hr style={{  width: "90%"}} />
      <div className="buttons">
        <button onClick={() => handleArchive()}>
          {archived ? (
            <AiFillFolderOpen
            style={{ width: "25px", height: "25px", margin: "5px" }}
            />
          ) : (
            <AiFillFolder
            style={{ width: "25px", height: "25px", margin: "5px" }}
            />
          )}
        </button>
        <button onClick={() => handleUpdate()}>
          <AiFillEdit
            style={{ width: "25px", height: "25px", margin: "5px" }}
            />
        </button>
        <button onClick={() => setDeletingNote(true)}>
          <AiFillDelete
            style={{ width: "25px", height: "25px", margin: "5px" }}
            />
        </button>
      </div> 
      </div>
      {deletingNote && (
        <DeleteNote
          handleDelete={handleDelete}
          setDeletingNote={setDeletingNote}
        />
      )}
    </div>
  );
}
