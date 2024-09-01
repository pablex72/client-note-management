import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/EditNote.css";
import AddCategory from "./AddCategory";
import "../styles/CategoriesContainer.css";
import { AiFillCloseSquare } from "react-icons/ai";
import { API_URL } from "../config";

function EditNote({
  setEditingNote,
  editingId,
  reflectChanges,
  setReflectChanges,
}) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const initialNote = { title: "", content: "", archived: false };
  const [note, setNote] = useState(initialNote);

  /**
   * getNoteById
   */
  useEffect(() => {
    axios
      .get(API_URL + `note/${editingId}`)
      .then(function (response) {
        setNote(response.data);
        setSelectedCategories(
          response.data.categoryList &&
            response.data.categoryList.map((cat) => cat.id)
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [editingId]);

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
   * updateNote byId
   */
  const handleSubmit = async () => {
    try {
      await axios.patch(API_URL + `note/update/${note.id}`, {
        ...note,
        categoryList: note.categoryList,
      });
    } catch (error) {
      console.log(error);
    }
    setEditingNote(false);
    setReflectChanges(!reflectChanges);
  };

  function createNewCategoryPrev() {
    if (newCategory.trim() !== "" && note !== null) {
      setNote((prevNote) => ({
        ...prevNote,
        categoryList: [...prevNote.categoryList, { name: newCategory }],
      }));
      setNewCategory("");
    }
  }

  function handleRemoveTag(name) {
    setNote((prevNote) => ({
      ...prevNote,
      categoryList: note.categoryList.filter((tag) => tag.name !== name),
    }));
  }

  return (
    <div className="edit-form">
      <h3>Edit Note</h3>
      <label>
        Title:
        <input
          name="title"
          value={note.title}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Content:
        <input
          name="content"
          value={note.content}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <div className="categories-container">
        {note.categoryList &&
          note.categoryList.map((category, index) => (
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
        <button onClick={() => setEditingNote(false)}>Cancel</button>
        <button onClick={() => handleSubmit()}>Save</button>
      </div>
    </div>
  );
}

export default EditNote;
