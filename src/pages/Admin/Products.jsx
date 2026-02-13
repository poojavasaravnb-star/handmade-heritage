import { useState, useEffect } from "react";
import "./AddProduct.css";

const PRODUCT_API = "https://6985eb3d6964f10bf254eb60.mockapi.io/product";
const CATEGORY_API = "https://6981e61cc9a606f5d44864fa.mockapi.io/category";

function AddProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    image: "",
    category: "",
  });

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      const res = await fetch(PRODUCT_API);
      const data = await res.json();
      console.log("PRODUCT DATA 👉", data);
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= FETCH CATEGORY =================
  const fetchCategories = async () => {
    try {
      const res = await fetch(CATEGORY_API);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "price" || name === "quantity") {
      const onlyNumber = value.replace(/\D/g, "");

      setProduct((prev) => ({
        ...prev,
        [name]: onlyNumber === "" ? "" : Math.max(0, Number(onlyNumber)),
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // ================= IMAGE HANDLE (SAFE) =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProduct((prev) => ({
        ...prev,
        image: reader.result, // BASE64 STRING
      }));
    };

    reader.readAsDataURL(file);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.name ||
      !product.price ||
      !product.quantity ||
      !product.category
    ) {
      alert("Fill all required fields");
      return;
    }

    const payload = {
      ...product,
      price: Number(product.price),
      quantity: Number(product.quantity),
    };

    try {
      if (isEdit) {
        await fetch(`${PRODUCT_API}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        alert("Product Updated");
      } else {
        await fetch(PRODUCT_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        alert("Product Added");
      }

      resetForm();
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setProduct({
      name: item.name || "",
      price: item.price || "",
      quantity: item.quantity || "",
      description: item.description || "",
      image: item.image || "",
      category: item.category || "",
    });

    setIsEdit(true);
    setEditId(item.id);
    setShowForm(true);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await fetch(`${PRODUCT_API}/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  };

  // ================= RESET =================
  const resetForm = () => {
    setProduct({
      name: "",
      price: "",
      quantity: "",
      description: "",
      image: "",
      category: "",
    });

    setIsEdit(false);
    setEditId(null);
  };

  return (
    <div className="add-product-container">
      {/* ================= PRODUCT LIST ================= */}
      {!showForm && (
        <>
          <div className="list-header">
            <h2>Product List</h2>
            <button className="add-new-btn" onClick={() => setShowForm(true)}>
              + Add Product
            </button>
          </div>

          <table className="product-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No Products Found
                  </td>
                </tr>
              ) : (
                products.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.image ? (
                        <img src={item.image} className="table-img" alt="" />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>₹{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <button onClick={() => handleEdit(item)}>Edit</button>
                      <button onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}

      {/* ================= FORM ================= */}
      {showForm && (
        <form className="add-product-form" onSubmit={handleSubmit}>
          <h2>{isEdit ? "Edit Product" : "Add Product"}</h2>

          <input
            name="name"
            value={product.name}
            placeholder="Product Name"
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            name="price"
            value={product.price}
            placeholder="Price"
            onChange={handleChange}
          />

          <input
            name="quantity"
            value={product.quantity}
            placeholder="Quantity"
            onChange={handleChange}
            min="0"
          />

          <textarea
            name="description"
            value={product.description}
            placeholder="Description"
            onChange={handleChange}
          />

          <input type="file" onChange={handleImageChange} />

          {product.image && (
            <img src={product.image} className="preview-image" alt="" />
          )}

          <button type="submit">{isEdit ? "Update" : "Add"}</button>
          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default AddProduct;
