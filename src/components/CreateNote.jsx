import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/CategoriesContainer.css";
import "../styles/CreateNote.css";
import { AiFillCloseSquare } from "react-icons/ai";
import AddCategory from "./AddCategory";
import { API_URL } from "../config";

function CreateNote({ setCreatingNote, reflectChanges, setReflectChanges }) {
  
  const initialNote = { title: "", content: "", archived: false };
  const [newCategory, setNewCategory] = useState("");
  const [note, setNote] = useState(initialNote);

  function handleChange(e) {
    setNote((note) => ({
      ...note,
      [e.target.name]: e.target.value,
    }));
  }
  function handleNewCategory(e) {
    setNewCategory(e.target.value);
  }

  /**
   * createNote
   */
  const handleSubmit = async () => {
    try {
      await axios.post(API_URL + "note/create/", 
        { ...note,
        categoryList: activeNote.note.categoryList,
      });
    } catch (error) {
      console.log(error);
    };
    setCreatingNote(false);
    setReflectChanges(!reflectChanges);
  };

  const [activeNote, setActiveNote] = useState({
    note: { categoryList: [] },
  });

  function createNewCategoryPrev() {
    if (newCategory.trim() !== "" && activeNote.note !== null) {
      setActiveNote((prevActiveNote) => ({
        ...prevActiveNote,
        note: {
          ...prevActiveNote.note,
          categoryList: [
            ...prevActiveNote.note.categoryList,
            { name: newCategory },
          ],
        },
      }));
      setNewCategory("");
    }
  }
  /**
   * Remove Category
   */
  function handleRemoveTag(name) {
    setActiveNote((prevActiveNote) => ({
      ...prevActiveNote,
      note: {
        ...prevActiveNote.note,
        categoryList: prevActiveNote.note.categoryList.filter(
          (tag) => tag.name !== name
        ),
      },
    }));
  }

  return (
    <div className="edit-form">
      <h3>Create Note</h3>
      <label>
        Title: <input name="title" onChange={(e) => handleChange(e)} />
      </label>
      <label>
        Content: <input name="content" onChange={(e) => handleChange(e)} />
      </label>
      <div className="categories-container" key={activeNote.note.id}>
        {activeNote.note.categoryList &&
          activeNote.note.categoryList.map((category, index) => (
            <div className="edit-container" key={index}>
              <div className="category-texto">{category.name}</div>
              <div
                className="edit-container-icons"
                onClick={() => handleRemoveTag(category.name)}
              >
                <AiFillCloseSquare className="delete-icono" />
              </div>
            </div>
          ))}
      </div>
      <AddCategory
        newCategory={newCategory}
        handleNewCategory={handleNewCategory}
        createNewCategoryPrev={createNewCategoryPrev}
      />
      <div className="buttons-container">
        <button onClick={() => setCreatingNote(false)}>Cancel</button>
        <button onClick={() => handleSubmit()}>Save</button>
      </div>
    </div>
  );
}
export default CreateNote;
