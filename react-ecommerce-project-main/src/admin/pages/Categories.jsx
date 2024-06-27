import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    img: null,
  });
  const imgRef = useRef();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name_category: "",
    description_category: "",
    img_category: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", newCategory.name);
    formData.append("description", newCategory.description);
    formData.append("img", imgRef.current.files[0]);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/categories/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Category added:", response.data.category);
      setCategories([...categories, response.data.category]);
      setLoading(false);
      resetForm();
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewCategory({
      name: "",
      description: "",
      img: null,
    });
    imgRef.current.value = "";
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCategory({
      ...newCategory,
      [name]: value,
    });
  };

  const handleModifyCategory = (category) => {
    setSelectedCategory(category);
    setFormData({
      name_category: category.name_category,
      description_category: category.description_category,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    const updatedCategory = {
      name_category: formData.name_category,
      description_category: formData.description_category,
      img_category: formData.img_category,
    };

    try {
      const url = `http://127.0.0.1:8000/api/categories/${selectedCategory.id_category}`;
      const response = await axios.put(url, updatedCategory);
      console.log("Category updated successfully:", response.data);
      const updatedCategories = categories.map((category) =>
        category.id_category === selectedCategory.id_category ? response.data.category : category
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/categories/${id}`);
      console.log("Category deleted successfully");
      setCategories(categories.filter((category) => category.id_category !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <>
      <div className="main-title">
        <h3>Categories Management</h3>
        <button
          className="btn btn-primary px-3 me-3 animated fadeInUp"
          data-bs-toggle="modal"
          data-bs-target="#addCategoryModal"
        >
          Add
        </button>
      </div>

      <div>
        <table className="table table-striped animated fadeInUp">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.id_category}>
                <th scope="row">{index + 1}</th>
                <td><img src={`/src/assets/images/shop/${category.img_category}`} style={{width: '100px'}}/></td>
                <td>{category.name_category}</td>
                <td>{category.description_category}</td>
                <td>
                  <button
                    className="btn btn-danger px-3 animated fadeInUp"
                    onClick={() => handleDeleteCategory(category.id_category)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Category Modal */}
      <div
        className="portfolio-modal modal fade bg"
        id="addCategoryModal"
        tabIndex="-1"
        aria-labelledby="addCategoryModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="mx-5">
              <h1 className="text-warning mb-3">Add Category</h1>
              <form onSubmit={handleAddCategory} className="mb-5">
                <div className="mb-3">
                  <label
                    htmlFor="nameCategory"
                    className="form-label fw-bold text-black"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control text-black"
                    id="nameCategory"
                    name="name"
                    value={newCategory.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="descriptionCategory"
                    className="form-label fw-bold text-black"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control text-black"
                    id="descriptionCategory"
                    name="description"
                    value={newCategory.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="imgCategory"
                    className="form-label fw-bold text-black"
                  >
                    Choose Image
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="imgCategory"
                    name="img"
                    ref={imgRef}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className="btn btn-warning px-5 fw-bold" disabled={loading}>
                  {loading ? "Adding..." : "Add"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Categories;
