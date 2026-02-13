import React, { useEffect, useState } from "react";
import "./AdminCategories.css";

const API_URL = "https://6981e61cc9a606f5d44864fa.mockapi.io/category";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [editingImage, setEditingImage] = useState(null);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Image handling
  const handleNewImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setEditingImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Add new category
  const handleAdd = async () => {
    if (!newCategory.trim()) return;

    const newCat = {
      name: newCategory.trim(),
      image: newImage || "",
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCat),
      });
      const data = await res.json();
      setCategories([...categories, data]);
      setNewCategory("");
      setNewImage(null);
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  // Edit category
  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setEditingName(cat.name);
    setEditingImage(cat.image || null);
  };

  // Update category
  const handleUpdate = async () => {
    const updatedCat = {
      name: editingName,
      image: editingImage || "",
    };

    try {
      const res = await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCat),
      });
      const data = await res.json();
      setCategories(
        categories.map((cat) => (cat.id === editingId ? data : cat))
      );
      setEditingId(null);
      setEditingName("");
      setEditingImage(null);
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  return (
    <div className="admin-layout">
      <br />
      <br />
      <div className="admin-body">
        <div className="admin-content">
          <h2>Categories</h2>
          <br />
          <div className="add-category">
            <input
              type="text"
              placeholder="Enter category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <input type="file" accept="image/*" onChange={handleNewImageChange} />
            {newImage && (
              <img src={newImage} alt="Preview" className="category-preview" />
            )}
            <button onClick={handleAdd}>Add</button>
          </div>

          {categories.length === 0 ? (
            <p>No categories found</p>
          ) : (
            <ul className="category-list">
              {categories.map((cat) => (
                <li key={cat.id}>
                  {editingId === cat.id ? (
                    <>
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleEditImageChange}
                      />
                      {editingImage && (
                        <img
                          src={editingImage}
                          alt="Preview"
                          className="category-preview"
                        />
                      )}
                      <button onClick={handleUpdate}>Update</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      {cat.image && (
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="category-preview"
                        />
                      )}
                      <span>{cat.name}</span>
                      <button onClick={() => handleEdit(cat)}>Edit</button>
                      <button onClick={() => handleDelete(cat.id)}>Delete</button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
