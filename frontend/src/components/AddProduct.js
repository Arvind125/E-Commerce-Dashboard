import React, { useState } from "react";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productCompany, setProductCompany] = useState("");
  const [error, setError] = useState(false);

  const auth = localStorage.getItem("user");

  const addProductHandler = async () => {
    if (!productName || !productPrice || !productCategory || !productCompany) {
      setError(true);
      return;
    }

    let response = await fetch("http://localhost:5000/add-product", {
      method: "POST",
      body: JSON.stringify({
        name: productName,
        price: productPrice,
        category: productCategory,
        company: productCompany,
        userId: JSON.parse(auth)._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    if (response.name) {
      alert("Product added successfully!");
      setProductName("");
      setProductPrice("");
      setProductCategory("");
      setProductCompany("");
    } else {
      alert("Failed to add product!");
    }
  };

  return (
    <div>
      <h1>Add Product</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product name"
        onChange={(e) => setProductName(e.target.value)}
        value={productName}
      />
      {error && !productName && (
        <p className="error-text">Invalid Product Name</p>
      )}

      <input
        className="inputBox"
        type="text"
        placeholder="Enter product price"
        onChange={(e) => setProductPrice(e.target.value)}
        value={productPrice}
      />
      {error && !productPrice && (
        <p className="error-text">Invalid Product Price</p>
      )}

      <input
        className="inputBox"
        type="text"
        placeholder="Enter product category"
        onChange={(e) => setProductCategory(e.target.value)}
        value={productCategory}
      />
      {error && !productCategory && (
        <p className="error-text">Invalid Product category</p>
      )}

      <input
        className="inputBox"
        type="text"
        placeholder="Enter product company"
        onChange={(e) => setProductCompany(e.target.value)}
        value={productCompany}
      />
      {error && !productCompany && (
        <p className="error-text">Invalid Product company</p>
      )}

      <button className="myButton" type="button" onClick={addProductHandler}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
