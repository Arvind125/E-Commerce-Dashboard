import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  const fetchAllProducts = async () => {
    let result = await fetch("http://localhost:5000/products");
    result = await result.json();
    setProducts(result);
    // console.log(result);
  };

  const searchProducts = async (searchKey) => {
    let result = await fetch(`http://localhost:5000/search/${searchKey}`);
    result = await result.json();
    // console.log(response);
    setProducts(result);
  };

  useEffect(() => {
    // for 1st time data load
    fetchAllProducts();
  }, []);

  const itemDeleteHandler = async (id) => {
    let response = await fetch(`http://localhost:5000/product/${id}`, {
      method: "DELETE",
    });
    response = await response.json();
    if (response) {
      const newProductList = products.filter((item) => item._id !== id);
      setProducts(newProductList);
    } else {
      alert("Failed to delete Product!");
    }
  };

  const searchKeyChangeHandler = (event) => {
    const key = event.target.value;
    if (key) {
      searchProducts(key);
    } else {
      fetchAllProducts();
    }
  };

  const productTable = (
    <>
      <ul>
        <li>S No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Comppany</li>
        <li>Operations</li>
      </ul>
      {products.map((item, index) => (
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>$ {item.price}</li>
          <li>{item.category}</li>
          <li>{item.company}</li>
          <li>
            <button
              onClick={() => {
                itemDeleteHandler(item._id);
              }}
              type="button"
            >
              Delete now
            </button>
            <Link to={`/update/${item._id}`}>Update</Link>
          </li>
        </ul>
      ))}
    </>
  );

  return (
    <div className="product-list">
      <h2>Product List</h2>

      <input
        className="search-box"
        placeholder="Search a Item"
        type="text"
        onChange={searchKeyChangeHandler}
      />
      {products.length ? productTable : <p>No Products Found !</p>}
    </div>
  );
};

export default ProductsList;
