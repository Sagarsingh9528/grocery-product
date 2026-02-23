import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAuth } from "../context/AuthContext";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const [profileOpen, setProfileOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white shadow-sm px-4 md:px-8 py-3">
      
      <div className="flex items-center justify-between">
       
        <div className="flex items-center gap-4">
          
          <Link to="/">
            <img src={assets.logo} alt="logo" className="h-8" />
          </Link>

         
          <div className="hidden md:flex items-center gap-6 whitespace-nowrap">
            <button
              onClick={() => navigate("/seller")}
              className="border px-4 py-1 rounded-full"
            >
              Seller Dashboard
            </button>

            <NavLink to="/" className="text-gray-700">
              Home
            </NavLink>

            <NavLink to="/products" className="text-gray-700">
              All Product
            </NavLink>
          </div>
        </div>

        
        <div className="hidden lg:flex items-center bg-gray-100 px-5 py-2 rounded-full w-[420px]">
          <input
            type="text"
            placeholder="Search products"
            className="bg-transparent outline-none flex-1 text-sm"
          />
          <img src={assets.search_icon} alt="" className="w-5 h-5 opacity-70" />
        </div>

       
        <div className="flex items-center gap-4">
         
          <img
            src={assets.search_icon}
            alt=""
            className="w-6 h-6 lg:hidden cursor-pointer"
          />

          
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
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

          
          {!user ? (
            <button
              onClick={() => navigate("/login")}
              className="hidden md:block bg-green-500 text-white px-6 py-2 rounded-full whitespace-nowrap"
            >
              Login
            </button>
          ) : (
            <div className="relative">
             
              <img
                src={assets.profile_icon}
                alt=""
                className="w-10 cursor-pointer"
                onClick={() => setProfileOpen(!profileOpen)}
              />

             
              {profileOpen && (
                <ul className="absolute top-12 right-0 bg-white shadow border border-gray-200 py-2 w-36 rounded-md text-sm z-40">
                  <li
                    onClick={() => {
                      navigate("/my-orders");
                      setProfileOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    My Orders
                  </li>

                  <li
                    onClick={() => {
                      logout();
                      navigate("/login");
                      setProfileOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              )}
            </div>
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
          <button
            onClick={() => {
              navigate("/seller");
              closeMenu();
            }}
            className="border px-4 py-1 rounded-full w-fit"
          >
            Seller Dashboard
          </button>

          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/products" onClick={closeMenu}>
            All Product
          </NavLink>

          {user && (
            <NavLink to="/my-orders" onClick={closeMenu}>
              My Orders
            </NavLink>
          )}

          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>

          {!user && (
            <button
              onClick={() => {
                navigate("/login");
                closeMenu();
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-full w-fit"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
