import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name_product: "",
    description_product: "",
    img_product: null,
    price_product: "",
    brand_product: "",
    quantity_product: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/categories/"); // Adjust endpoint as needed
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/products/"); // Adjust endpoint as needed
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", newProduct.name_product);
    formData.append("description", newProduct.description_product);
    formData.append("img", imgRef.current.files[0]);
    formData.append("price", newProduct.price_product);
    formData.append("brand", newProduct.brand_product);
    formData.append("quantity", newProduct.quantity_product);
    formData.append("category_id", newProduct.category_id);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/products/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Product added:", response.data.product);
      setProducts([...products, response.data.product]);
      setLoading(false);
      resetForm();
    } catch (error) {
      console.error("Error adding product:", error);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewProduct({
      name_product: "",
      description_product: "",
      img_product: null,
      price_product: "",
      brand_product: "",
      quantity_product: "",
      category_id: "",
    });
    imgRef.current.value = "";
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`);
      console.log('Product deleted successfully');
      setProducts(products.filter(product => product.id_product !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <div className="main-title">
        <h3>Products Management</h3>
        <div>
          <button
            className="btn btn-primary px-3 me-3 animated fadeInUp"
            data-bs-toggle="modal"
            data-bs-target="#portfolioModal2"
          >
            Add
          </button>

          <div
            className="portfolio-modal modal fade bg"
            id="portfolioModal2"
            tabIndex="-1"
            aria-labelledby="portfolioModal2"
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
                  <h1 className="text-warning mb-3">Add Product</h1>

                  <form className="mb-5" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputTextName"
                        className="form-label fw-bold text-black"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control text-black"
                        id="exampleInputTextName"
                        name="name_product"
                        value={newProduct.name_product}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputDescription"
                        className="form-label fw-bold text-black"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        className="form-control text-black"
                        id="exampleInputDescription"
                        name="description_product"
                        value={newProduct.description_product}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="formFile"
                        className="form-label fw-bold text-black"
                      >
                        Choose Image
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        ref={imgRef}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPrice"
                        className="form-label fw-bold text-black"
                      >
                        Price
                      </label>
                      <input
                        type="text"
                        className="form-control text-black"
                        id="exampleInputPrice"
                        name="price_product"
                        value={newProduct.price_product}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputBrand"
                        className="form-label fw-bold text-black"
                      >
                        Brand
                      </label>
                      <input
                        type="text"
                        className="form-control text-black"
                        id="exampleInputBrand"
                        name="brand_product"
                        value={newProduct.brand_product}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputQuantity"
                        className="form-label fw-bold text-black"
                      >
                        Quantity
                      </label>
                      <input
                        type="text"
                        className="form-control text-black"
                        id="exampleInputQuantity"
                        name="quantity_product"
                        value={newProduct.quantity_product}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputCategory"
                        className="form-label fw-bold text-black"
                      >
                        Category
                      </label>
                      <select
                        className="form-select fw-bold"
                        aria-label="Default select example"
                        name="category_id"
                        value={newProduct.category_id}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select category</option>
                        {categories.map((category) => (
                          <option key={category.id_category} value={category.id_category}>
                            {category.name_category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-warning px-5 fw-bold"
                      disabled={loading}
                    >
                      {loading ? "Adding..." : "Add"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <table className="table table-striped animated fadeInUp">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Brand</th>
              <th scope="col">Quantity</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td><img src={`/src/assets/images/shop/${product.img_product}`} style={{width: '100px'}} /></td>
                <td>{product.name_product}</td>
                <td>{product.description_product}</td>
                <td>{product.price_product}</td>
                <td>{product.brand_product}</td>
                <td>{product.quantity_product}</td>
                <td>
                  <button
                    className="btn btn-danger px-3 animated fadeInUp"
                    onClick={() => handleDeleteProduct(product.id_product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Products;
