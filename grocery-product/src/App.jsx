// import AppRoutes from "./routes/AppRoutes";

import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { LocationProvider } from "./context/LocationContext";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

function App() {

  const isSellerPath = useLocation().pathname.includes("seller");

  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <OrderProvider>
            <LocationProvider>
               <Toaster position="top-right" />
              {isSellerPath ? null : <Navbar />} 

              {/* <AppRoutes /> */}
              <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32 "} `}>
                <Routes>
                  <Route path="/" element={<Home/>}/>
                </Routes>
              </div>
            </LocationProvider>
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
