import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAuth } from "../context/AuthContext";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { user } = useAuth();
  const { totalItems } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm px-4 md:px-8 py-3">

      
      <div className="flex items-center justify-between">

       
        <div className="flex items-center gap-4">

         
          <Link to="/">
            <img src={assets.logo} alt="logo" className="h-8" />
          </Link>

          
          <div className="hidden md:flex items-center gap-6 whitespace-nowrap">

            <button className="border px-4 py-1 rounded-full">
              Seller Dashboard
            </button>

            <Link to="/" className="text-gray-700">Home</Link>
            <Link to="/products" className="text-gray-700">All Product</Link>

          </div>
        </div>

      
        <div className="hidden lg:flex items-center bg-gray-100 px-5 py-2 rounded-full w-[420px]">

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

        
        <div className="flex items-center gap-4">

         
          <img
            src={assets.search_icon}
            alt=""
            className="w-6 h-6 lg:hidden"
          />

         
          <div className="relative cursor-pointer">
            <img
              src={assets.cart_icon}
              alt="cart"
              className="w-8 h-8 md:w-9 md:h-9"
            />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1 rounded-full">
                {totalItems}
              </span>
            )}
          </div>

          
          {!user && (
            <button className="hidden md:block bg-green-500 text-white px-6 py-2 rounded-full whitespace-nowrap">
              Login
            </button>
          )}

          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>
        </div>

      </div>

      
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 text-gray-700">

          <button className="border px-4 py-1 rounded-full w-fit">
            Seller Dashboard
          </button>

          <Link to="/">Home</Link>
          <Link to="/products">All Product</Link>

          {!user && (
            <button className="bg-green-500 text-white px-4 py-2 rounded-full w-fit">
              Login
            </button>
          )}

        </div>
      )}

    </nav>
  );
};

export default Navbar;