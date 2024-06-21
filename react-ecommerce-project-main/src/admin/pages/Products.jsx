import React, { useState, useEffect } from "react";
import {
  getProduct,
  deleteProduct,
  getCategories,
  createProduct
} from "./../apiFunction/apiService";

function Products() {
  const [products, setProducts] = useState([]);
  const [ newProduct, setNewProduct] = useState({ name: "", description: "", img: "mage.png", price: null, stock: null, brand:"", quantity: null, category_id: null});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsData = await getProduct();
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDeleteProducts = async (productId) => {
    try {
      await deleteProduct(productId);
      fetchProducts(); // Refresh categories after deletion
    } catch (error) {
      console.error("Error deleting products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id_category === categoryId);
    return category ? category.name_category : "Unknown";
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    const formData = new FormData();
    formData.append('name', newProduct.name_product);
    formData.append('description', newProduct.description_product);
    formData.append('img', newProduct.img_product);
    formData.append('price', newProduct.price_product);
    formData.append('brand', newProduct.brand_product);
    formData.append('quantity', newProduct.quantity_product);
    formData.append('category_id', newProduct.category_id);

    try {
      console.log(newProduct);
      await createProduct(formData);
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <div className="main-title">
        <h3>Products managment</h3>
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
                        onChange={(e) => setNewProduct({ ...newProduct, name_product: e.target.value })}
                      ></input>
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
                        onChange={(e) => setNewProduct({ ...newProduct, description_product: e.target.value })}
                      ></input>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="formFile"
                        className="form-label fw-bold text-black"
                      >
                        Choise Image
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        name="img_product"
                        onChange={(e) => setNewProduct({ ...newProduct, img_product: e.target.files[0] })}
                      ></input>
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
                        onChange={(e) => setNewProduct({ ...newProduct, price_product: e.target.value })}
                      ></input>
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
                        onChange={(e) => setNewProduct({ ...newProduct, brand_product: e.target.value })}
                      ></input>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputQuentity"
                        className="form-label fw-bold text-black"
                      >
                        Quantity
                      </label>
                      <input
                        type="text"
                        className="form-control text-black"
                        id="exampleInputQuentity"
                        name="quantity_product"
                        onChange={(e) => setNewProduct({ ...newProduct, quantity_product: e.target.value })}
                      ></input>
                    </div>
                    <input
                        type="text"
                        className="form-control text-black"
                        id="exampleInputPrice"
                        name="category_id"
                        onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
                      ></input>
                    <button
                      type="submit"
                      className="btn btn-warning px-5 fw-bold"
                    >
                      Add
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
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
              <th scope="col">Brand</th>
              <th scope="col">Quantity</th>
              <th scope="col">Category</th>
              <th scope="col">name Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id_product}>
                <th scope="row">{index + 1}</th>
                <td>{product.name_product}</td>
                <td>{product.description_product}</td>
                <td>{product.price_product}</td>
                <td>{product.stock_product}</td>
                <td>{product.brand_product}</td>
                <td>{product.quantity_product}</td>
                <td>{product.category_id}</td>
                <td>{getCategoryName(product.category_id)}</td>
                <td>
                  <a
                    className="btn btn-success px-3 me-3 animated fadeInUp"
                    data-bs-toggle="modal"
                    data-bs-target="#portfolioModal3"
                  >
                    Modify
                  </a>
                  <a
                    className="btn btn-danger px-3 animated fadeInUp"
                    onClick={() => handleDeleteProducts(product.id_product)}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="portfolio-modal modal fade bg"
        id="portfolioModal3"
        tabIndex="-1"
        aria-labelledby="portfolioModal3"
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
              <h1 className="text-warning mb-3">Modify Product</h1>

              <form className="mb-5">
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
                  ></input>
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
                  ></input>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="formFile"
                    className="form-label fw-bold text-black"
                  >
                    Choise Image
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                  ></input>
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
                  ></input>
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
                  ></input>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputQuentity"
                    className="form-label fw-bold text-black"
                  >
                    Quantity
                  </label>
                  <input
                    type="text"
                    className="form-control text-black"
                    id="exampleInputQuentity"
                  ></input>
                </div>
                <select
                  className="form-select fw-bold mb-3"
                  aria-label="Default select example"
                  value="5"
                >
                  <option selected value="4">
                    Open this select menu
                  </option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
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

export default Products;
