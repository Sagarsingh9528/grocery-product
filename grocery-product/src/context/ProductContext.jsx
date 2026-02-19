import { createContext, useContext, useEffect, useState } from "react";

export const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {

  const [products, setProducts] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const dummyProducts = [
      {
        id: 1,
        name: "Fresh Apples",
        price: 80,
        category: "Fruits",
        image: "https://via.placeholder.com/150",
        sellerId: 101,
      },
      {
        id: 2,
        name: "Milk 1L",
        price: 60,
        category: "Dairy",
        image: "https://via.placeholder.com/150",
        sellerId: 102,
      },
      {
        id: 3,
        name: "Bread",
        price: 40,
        category: "Bakery",
        image: "https://via.placeholder.com/150",
        sellerId: 101,
      },
    ];

    setProducts(dummyProducts);
    setLoading(false);

  }, []);

  const addProduct = (product) => {
    setProducts((prev) => [
      ...prev,
      { ...product, id: Date.now() }
    ]);
  };

  const removeProduct = (id) => {
    setProducts((prev) =>
      prev.filter((p) => p.id !== id)
    );
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const value = {
    products,
    loading,
    addProduct,
    removeProduct,
    searchQuery,
    setSearchQuery,
    filteredProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// custom hook
export const useProducts = () =>
  useContext(ProductContext);
