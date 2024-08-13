import { useState, useEffect } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import "./App.css";
import { auth } from "./components/firebase";
import { Navigate } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({}); // Initialize as an object
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user, "auth");
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    const response = await fetch("http://127.0.0.1:5000/products");
    const data = await response.json();
    setProducts(data.products);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct({}); // Reset to an empty object
  };

  const openCreateModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
      console.log("Opening create modal");
    } else {
      console.log("Modal is already open");
    }
  };

  const openEditModal = (product) => {
    setCurrentProduct(product); // Set the current product
    if (isModalOpen) return;

    setIsModalOpen(true);
    console.log("Opening edit modal with product:", product, currentProduct);
  };

  const onUpdate = () => {
    closeModal();
    fetchProducts();
  };

  return (
    <>
      <ProductList
        products={products}
        updateProduct={openEditModal}
        updateCallback={onUpdate}
        openCreateModal={openCreateModal}
      />
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <ProductForm
              existingProduct={currentProduct} // Pass the current product to the form
              updateCallback={onUpdate}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
