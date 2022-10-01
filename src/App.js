import React from "react";
import ProductDetails from "./pages/productDetails/ProductDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { path } from "./routes";
import Home from "./pages/home/Home";
import LoginPage from "./pages/login/LoginPage";
import Cart from "./pages/cart/Cart.jsx";
import RegisterPage from "./pages/register/RegisterPage";
import CheckOut from "./pages/checkout/CheckOut";
import ContactPage from './pages/contact/ContactPage'

import Products from './pages/products/Products.jsx'
import NavBar from "./components/navBar/NavBar";


function App() {
  return (
    <>
      <section style={{ width: "100%" }}>
        <BrowserRouter>
          
          <Routes >


           
 <Route exact path='/nav' element={<NavBar/>} />
            <Route exact path={path.homepage} element={<Home />} />


            <Route exact path={path.loginPage} element={<LoginPage />} />
            <Route exact path={path.registerpage} element={<RegisterPage />} />
            <Route exact path={path.cart} element={<Cart />} />

            <Route exact path={path.checkout} element={<CheckOut />} />
            <Route exact path={path.product} element={<Products />} />

            {/* <Route exact path="/contact" element={<ContactPage />} />

            <Route exact path="/details" element={<ProductDetails/>} /> */}
            <Route exact path="*" element={<h1>404</h1>} />

           

          </Routes>
        </BrowserRouter>
      </section>

      
    </>
  );
}

export default App;
