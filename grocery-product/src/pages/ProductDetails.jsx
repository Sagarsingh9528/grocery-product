import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";
import { useProducts } from "../context/ProductContext";

const ProductDetails = () => {
  const { id, category } = useParams();

  const { addItem, removeItem, updateQty, getItemQty } =
    useContext(CartContext);

  const { products, getProductById } = useProducts();
  const navigate = useNavigate();

  const product = getProductById(id);

  const [mainImage, setMainImage] = useState(null);

  const qty = getItemQty(product?._id);

  const relatedProducts = products
    .filter(
      (p) => p.category === product?.category && p._id !== id
    )
    .slice(0, 4);

  useEffect(() => {
    if (product?.image?.length > 0) {
      setMainImage(product.image[0]);
    }
  }, [product]);

  useEffect(() => {
  if (product?.image?.length > 0) {
    setMainImage(product.image[0]);
  }

  window.scrollTo(0, 0);

}, [product]);

  if (!product) {
    return <p className="mt-20 text-center">Loading...</p>;
  }

  return (
    <div className="mt-16 px-4 md:px-10">

      <p className="text-sm text-gray-500 mb-6">
        Home / Products /{" "}
        <span className="capitalize">{category}</span> /{" "}
        <span className="text-green-600">{product.name}</span>
      </p>

      <div className="grid md:grid-cols-2 gap-10">

        <div className="flex gap-4">

          <div className="flex flex-col gap-3">
            {product.image?.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setMainImage(img)}
                className={`w-16 h-16 border rounded cursor-pointer ${
                  mainImage === img ? "border-green-500" : ""
                }`}
              />
            ))}
          </div>

          <div className="border p-6 flex-1 flex items-center justify-center">
            {mainImage && (
              <img src={mainImage} className="max-h-[350px]" />
            )}
          </div>

        </div>

        <div>
          <h1 className="text-3xl font-semibold mb-2">
            {product.name}
          </h1>

          <p className="line-through text-gray-400">
            ₹{product.price}
          </p>

          <p className="text-2xl font-semibold mb-4">
            ₹{product.offerPrice}
          </p>

          <ul className="text-sm text-gray-600 mb-6">
            {product.description?.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>

          <div className="flex gap-4">

            {qty === 0 ? (
              <button
                onClick={() => {
                  addItem(product);
                  toast.success("Added to cart 🛒");
                }}
                className="flex-1 border py-3 rounded"
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex-1 flex items-center justify-center gap-6 border py-3 rounded">

                <button
                  onClick={() => {
                    if (qty === 1) {
                      removeItem(product._id);
                      toast("Removed ❌");
                    } else {
                      updateQty(product._id, qty - 1);
                    }
                  }}
                  className="text-xl px-4"
                >
                  -
                </button>

                <span className="text-lg font-semibold">
                  {qty}
                </span>

                <button
                  onClick={() => {
                    updateQty(product._id, qty + 1);
                    toast.success("Added ➕");
                  }}
                  className="text-xl px-4"
                >
                  +
                </button>

              </div>
            )}

            <button className="flex-1 bg-green-500 text-white py-3 rounded">
              Buy Now
            </button>

          </div>
        </div>
      </div>

      <div className="mt-16">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            Related Products
          </h2>

          <button
            onClick={() => navigate("/products")}
            className="text-green-600 font-medium hover:underline"
          >
            See More →
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <div
              key={item._id}
              onClick={() =>
                navigate(
                  `/products/${item.category.toLowerCase()}/${item._id}`
                )
              }
              className="border p-4 rounded cursor-pointer hover:shadow"
            >
              <img
                src={item.image[0]}
                className="h-32 mx-auto object-contain mb-3"
              />

              <p className="text-sm text-gray-500">
                {item.category}
              </p>

              <h3 className="font-medium text-sm">
                {item.name}
              </h3>

              <p className="text-green-600 font-semibold">
                ₹{item.offerPrice}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;