import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

const ShopCategory = ({ filterItem, setProducts, selectedCategory }) => {
  const [categories, setCategories] = useState([]); // State to store categories

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div className='widget-header'>
        <h5 className='ms-2'> All Categories </h5>
      </div>

      <div>
        <button onClick={() => setProducts([])} className={`m-2 ${selectedCategory === "All" ? "bg-warning" : ""}`}> All </button>
        {
          categories.map((category, index) => (
            <button
              className={`m-2 ${selectedCategory === category.name_category ? "bg-warning" : ""}`}
              key={index}
              onClick={() => filterItem(category.name_category)}
            > {category.name_category} </button>
          ))
        }
      </div>
    </>
  );
};

export default ShopCategory;
