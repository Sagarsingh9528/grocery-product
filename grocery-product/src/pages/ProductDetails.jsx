import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";
import { useProducts } from "../context/ProductContext";

const ProductDetails = () => {
  const { id, category } = useParams();
  const { addItem } = useContext(CartContext);
  const { products } = useProducts();

  const product = products.find((p) => p._id === id);

  const [mainImage, setMainImage] = useState("");

  // ✅ FIX: jab product load ho tab image set karo
  useEffect(() => {
    if (product) {
      setMainImage(product.image[0]);
    }
  }, [product]);

  if (!product) {
    return <p className="mt-20 text-center">Loading...</p>;
  }

  return (
    <div className="mt-16 px-4 md:px-10">

      {/* BREADCRUMB */}
      <p className="text-sm text-gray-500 mb-6">
        Home / Products / {category} /{" "}
        <span className="text-green-600">{product.name}</span>
      </p>

      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT SIDE */}
        <div className="flex gap-4">

          {/* THUMBNAILS */}
          <div className="flex flex-col gap-3">
            {product.image.map((img, index) => (
              <img
                key={index}
                src={img} // ✅ FIX
                onClick={() => setMainImage(img)}
                className={`w-16 h-16 object-contain border rounded cursor-pointer ${
                  mainImage === img ? "border-green-500" : ""
                }`}
              />
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className="border rounded-lg p-6 flex-1 flex items-center justify-center">
            <img
              src={mainImage}
              alt={product.name}
              className="max-h-[350px] object-contain"
            />
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div>

          <h1 className="text-3xl font-semibold mb-2">
            {product.name}
          </h1>

          <div className="flex items-center gap-1 mb-3 text-green-500">
            ⭐⭐⭐⭐☆
            <span className="text-gray-500 text-sm ml-2">(4)</span>
          </div>

          <p className="text-gray-400 line-through">
            MRP: ₹{product.price}
          </p>

          <p className="text-2xl font-semibold mb-2">
            ₹{product.offerPrice}
          </p>

          <p className="text-sm text-gray-500 mb-4">
            (inclusive of all taxes)
          </p>

          <div className="mb-6">
            <p className="font-semibold mb-2">About Product</p>
            <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
              {product.description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">

            <button
              onClick={() => {
                addItem(product);
                toast.success("Added to cart 🛒");
              }}
              className="flex-1 border py-3 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Add to Cart
            </button>

            <button className="flex-1 bg-green-500 text-white py-3 rounded-md hover:bg-green-600">
              Buy now
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetails;