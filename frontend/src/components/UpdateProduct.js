import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = (props) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productCompany, setProductCompany] = useState("");
  const [error, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProductById = async () => {
      let result = await fetch(`http://localhost:5000/product/${params.id}`);
      result = await result.json();
      //   console.log(result);
      if (result.name) {
        setProductName(result.name);
        setProductPrice(result.price);
        setProductCategory(result.category);
        setProductCompany(result.company);
      } else {
        alert("Failed to fetch corressponding product data");
      }
    };
    getProductById();
  }, [params]);

  const updateProductHandler = async () => {
    if (!productName || !productPrice || !productCategory || !productCompany) {
      setError(true);
      return;
    }
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: productName,
        price: productPrice,
        category: productCategory,
        company: productCompany,
      }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    // console.log(result);
    if (result.acknowledged) {
      // alert("Product Data Updated");
      navigate("/");
    } else {
      alert("Failed to Update Data");
    }
  };

  return (
    <div>
      <h1>Update Product</h1>
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

      <button className="myButton" type="button" onClick={updateProductHandler}>
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
