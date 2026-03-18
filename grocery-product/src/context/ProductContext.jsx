import { createContext, useContext, useState } from "react";
import { dummyProducts } from "../assets/assets";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

  
  const [products, setProducts] = useState(dummyProducts);

  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(false);

 
  const addProduct = (product) => {
    setProducts((prev) => [
      ...prev,
      { ...product, _id: Date.now().toString() }
    ]);
  };

  
  const removeProduct = (_id) => {
    setProducts((prev) =>
      prev.filter((p) => p._id !== _id)
    );
  };

 
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const value = {
    products,
    filteredProducts,
    searchQuery,
    setSearchQuery,
    addProduct,
    removeProduct,
    loading,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};


export const useProducts = () => useContext(ProductContext);