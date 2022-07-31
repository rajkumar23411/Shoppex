import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import SingleProductPage from "./pages/SingleProductPage";
import MyAccount from "./pages/MyAccount";
import store from "./redux/store";
import { loadUser } from "./redux/actions/userAction";
import ProtectedRoutes from "./protectedRoutes";
import UpdateProfile from "./pages/UpdateProfile";
import UpdatePassword from "./pages/UpdatePassword";
import ResetPassword from "./pages/ResetPassword";
import Shipping from "./pages/Shipping";
import ConfirmOrder from "./pages/ConfirmOrder";
import axios from "axios";
import Payment from "./pages/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccessfull from "./pages/OrderSuccessfull";
import MyOrder from "./pages/MyOrder";
import SingleOrder from "./pages/SingleOrder";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import ProductList from "./components/Dashboard/ProductList";
import NewProduct from "./pages/Dashboard/NewProduct";
import UpdateProduct from "./pages/Dashboard/UpdateProduct";
import AllOrders from "./pages/Dashboard/AllOrders";
import UpdateOrderStatus from "./pages/Dashboard/UpdateOrderStatus";
import UserList from "./pages/Dashboard/UserList";
import UpdateUserRole from "./pages/Dashboard/UpdateUserRole";
import ProductReviews from "./pages/Dashboard/ProductReviews";
import LostPage from "./pages/404";
const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState(null);
  
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/sendApiKey");
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/product/:id" exact element={<SingleProductPage />} />
      <Route path="/products/:keyword" element={<Products />} />
      <Route path="/my_account" element={<ProtectedRoutes> <MyAccount /> </ProtectedRoutes>} />
      <Route path="/me/update" element={<ProtectedRoutes><UpdateProfile /></ProtectedRoutes>} />
      <Route path="/update/password" element={<ProtectedRoutes><UpdatePassword /></ProtectedRoutes>} />
      <Route path="/password/reset/:token" element={<ResetPassword />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shipping" element={<ProtectedRoutes><Shipping /></ProtectedRoutes>}/>
      <Route path="/order/confirm" exact element={<ProtectedRoutes><ConfirmOrder /></ProtectedRoutes>}/>
      <Route path="/process/payment" exact element={<ProtectedRoutes>{stripeApiKey && (<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>)}</ProtectedRoutes>}/>
      <Route path="/order/success" element={<ProtectedRoutes><OrderSuccessfull /></ProtectedRoutes>}/>
      <Route path="/orders" element={<ProtectedRoutes> <MyOrder /> </ProtectedRoutes>} />
      <Route path="/order/:id" element={<ProtectedRoutes> <SingleOrder /> </ProtectedRoutes>} />
      <Route path="/admin/dashboard" element={<ProtectedRoutes> <AdminDashboard /> </ProtectedRoutes>} />
      <Route path="/admin/products" element={<ProtectedRoutes><ProductList/></ProtectedRoutes>} />
      <Route path="/admin/product/new" element={<ProtectedRoutes><NewProduct/></ProtectedRoutes>}  />
      <Route path="/admin/products/:id" element={<ProtectedRoutes><UpdateProduct/></ProtectedRoutes>}  />
      <Route path="/admin/orders" element={<ProtectedRoutes> <AllOrders /> </ProtectedRoutes>}  />
      <Route path="/admin/order/:id" element={<ProtectedRoutes><UpdateOrderStatus /></ProtectedRoutes>} />
      <Route path="/admin/users" element={<ProtectedRoutes><UserList /></ProtectedRoutes>} />
      <Route path="/admin/user/:id" element={<ProtectedRoutes><UpdateUserRole /></ProtectedRoutes>} />
      <Route path="/admin/reviews" element={<ProtectedRoutes><ProductReviews /></ProtectedRoutes>} />
      <Route path="*" element={<LostPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
