import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Note from "./Note";
import axios from "axios";
import EditNote from "./EditNote";
import "../styles/Archived.css";
import { API_URL } from "../config";

export default function Archived() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [reflectChanges, setReflectChanges] = useState(false);

  /**
   * getNotesArchived
   */
  useEffect(() => {
    axios
      .get(API_URL + "note/archived")
      .then(function (response) {
        setNotes(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [reflectChanges]);

  return (
    <>
      <div className="archived-container">
        <h1>Archived notes</h1>
        <Link className="homeButton" to="/">
          Return
        </Link>
      </div>
      <section className="grid-1">
        {notes ? (
          notes.map((note) => (
            <Note
              key={note.id}
              setEditingNote={setEditingNote}
              setEditingId={setEditingId}
              note={note}
              reflectChanges={reflectChanges}
              setReflectChanges={setReflectChanges}
            />
          ))
        ) : (
          <p>Cargando</p>
        )}
        {editingNote && (
          <EditNote
            setEditingNote={setEditingNote}
            editingId={editingId}
            reflectChanges={reflectChanges}
            setReflectChanges={setReflectChanges}
          />
        )}
      </section>
    </>
  );
}
