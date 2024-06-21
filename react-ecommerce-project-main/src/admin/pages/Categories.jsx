import React, { useState, useEffect } from "react";
import { getCategories, deleteCategory, createCategory, updateCategory } from './../apiFunction/apiService';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", description: "", img: null });
  const [editCategory, setEditCategory] = useState({ id_category: null, name_category: "", description_category: "", img_category: null });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newCategory.name_category);
      formData.append("description", newCategory.description_category);
      formData.append("img", newCategory.img_category);

      await createCategory(formData);
      setNewCategory({ name_category: "", description_category: "", img_category: null });
      fetchCategories();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name_category", editCategory.name_category);
      formData.append("description_category", editCategory.description_category);
      formData.append("img_category", editCategory.img_category);

      await updateCategory(editCategory.id_category, formData);
      setEditCategory({ id_category: null, name_category: "", description_category: "", img_category: null });
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleEditClick = (category) => {
    setEditCategory(category);
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
                <td>{category.img_category}</td>
                <td>{category.name_category}</td>
                <td>{category.description_category}</td>
                <td>
                  <button
                    className="btn btn-success px-3 me-3 animated fadeInUp"
                    data-bs-toggle="modal"
                    data-bs-target="#editCategoryModal"
                    onClick={() => handleEditClick(category)}
                  >
                    Modify
                  </button>
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
                    name="name_category"
                    value={newCategory.name_category}
                    onChange={(e) => setNewCategory({ ...newCategory, name_category: e.target.value })}
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
                    name="description_category"
                    value={newCategory.description_category}
                    onChange={(e) => setNewCategory({ ...newCategory, description_category: e.target.value })}
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
                    name="img_category"
                    onChange={(e) => setNewCategory({ ...newCategory, img_category: e.target.files[0] })}
                  />
                </div>
                <button type="submit" className="btn btn-warning px-5 fw-bold">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Category Modal */}
      <div
        className="portfolio-modal modal fade bg"
        id="editCategoryModal"
        tabIndex="-1"
        aria-labelledby="editCategoryModalLabel"
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
              <h1 className="text-warning mb-3">Modify Category</h1>
              <form onSubmit={handleUpdateCategory} className="mb-5">
                <div className="mb-3">
                  <label
                    htmlFor="editNameCategory"
                    className="form-label fw-bold text-black"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control text-black"
                    id="editNameCategory"
                    value={editCategory.name_category}
                    onChange={(e) => setEditCategory({ ...editCategory, name_category: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="editDescriptionCategory"
                    className="form-label fw-bold text-black"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control text-black"
                    id="editDescriptionCategory"
                    value={editCategory.description_category}
                    onChange={(e) => setEditCategory({ ...editCategory, description_category: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="editImgCategory"
                    className="form-label fw-bold text-black"
                  >
                    Choose Image
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="editImgCategory"
                    onChange={(e) => setEditCategory({ ...editCategory, img_category: e.target.files[0] })}
                  />
                </div>
                <button type="submit" className="btn btn-warning px-5 fw-bold">
                  Update
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
