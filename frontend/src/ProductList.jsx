import React, { useState } from "react";


const ProductList = ({
  products,
  updateProduct,
  updateCallback,
  openCreateModal,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust the number of items per page as needed

  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(
        `http://127.0.0.1:5000/products/${id}`,
        options
      );

      if (response.ok) {
        updateCallback();
      } else {
        console.error("Failed to delete the product.");
        alert("Failed to delete the product.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred while trying to delete the product.");
    }
  };

  const displayProducts = products;

  // Calculate the products to display on the current page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = displayProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate total pages
  const totalPages = Math.ceil(displayProducts.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="MainProduct">
      <div className="HeaderTopSection">
        <h2>Products</h2>{" "}
        <button className="createBtn1" onClick={openCreateModal}>
          Create New Product
        </button>
      </div>

      <table className="Table">
        <thead>
          <tr className="Rows">
            <th>No</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product, index) => (
            <tr className="Columns" key={product.id}>
              <td>{index + indexOfFirstProduct + 1}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td className="buttons">
                <button className="Edit" onClick={() => updateProduct(product)}>
                  Update
                </button>
                <button className="delete" onClick={() => onDelete(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}>
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
