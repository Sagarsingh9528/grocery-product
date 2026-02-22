import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAuth } from "../context/AuthContext";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { user } = useAuth();
  const { totalItems } = useContext(CartContext);

  return (
    <nav className="bg-white shadow-sm px-8 py-3 flex items-center justify-between">

     
      <div className="flex items-center gap-6 flex-nowrap">

       
        <Link to="/" className="flex items-center">
          <img
            src={assets.logo}
            alt="logo"
            className="h-8"
          />
        </Link>

        
        <button className="border px-4 py-1 rounded-full text-gray-700 whitespace-nowrap">
          Seller Dashboard
        </button>

       
        <div className="flex gap-6 text-gray-700 font-medium whitespace-nowrap">
          <Link to="/">Home</Link>
          <Link to="/products">All Product</Link>
        </div>

      </div>

      
      <div className="flex items-center bg-gray-100 px-5 py-2 rounded-full w-[420px]">

        <input
          type="text"
          placeholder="Search products"
          className="bg-transparent outline-none flex-1 text-sm"
        />

        <img
          src={assets.search_icon}
          alt="search"
          className="w-5 h-5 opacity-70"
        />
      </div>

      
      <div className="flex items-center gap-6">

       
        <div className="relative cursor-pointer">

          <img
            src={assets.cart_icon}
            alt="cart"
            className="w-9 h-9"   
          />

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1 rounded-full">
              {totalItems}
            </span>
          )}

        </div>

        
        {!user && (
          <button className="bg-green-500 text-white px-6 py-2 rounded-full font-medium">
            Login
          </button>
        )}

      </div>

    </nav>
  );
};

export default Navbar;