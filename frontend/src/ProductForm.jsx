import { useState } from "react";

const ProductForm = ({ existingProduct = {}, updateCallback }) => {
  const [name, setName] = useState(existingProduct.name || "");
  const [description, setDescription] = useState(
    existingProduct.description || ""
  );
  const [price, setPrice] = useState(existingProduct.price || 0);
  const [quantity, setQuantity] = useState(existingProduct.quantity || 0);

  const updating = Object.entries(existingProduct).length !== 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    };
    const url =
      "http://127.0.0.1:5000/products" +
      (updating ? `/${existingProduct.id}` : "");
    const options = {
      method: updating ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      alert(data.message);
    } else {
      updateCallback();
    }
  };

  return (
    <form onSubmit={onSubmit} className="forms">
      <h3>{updating ? "Update" : "Create Product"}</h3>
      <div className="Inputs">
        <label htmlFor="name">Product Name:</label>
        <input
          className="field"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="Inputs">
        <label htmlFor="description">Description:</label>
        <input
          className="field"
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="Inputs">
        <label htmlFor="price">Price:</label>
        <input
          className="field"
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="Inputs">
        <label htmlFor="quantity">Quantity:</label>
        <input
          className="field"
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <button type="submit" className="createBtn">
        {updating ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default ProductForm;
