import React from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MyOrderCard from "../components/MyOrderCard";
import Navbar from "../components/Navbar";
import { clearErrors, myOrders } from "../redux/actions/orderAction";
import "../App.css";
import Loader from "../components/loader";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";
const MyOrder = () => {
  const { loading, error, orders } = useSelector((state) => state.myOrder);
  const {isAuthenticated} = useSelector(state => state.user);
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(isAuthenticated === false){
      navigate("/login");
    }else{
      dispatch(myOrders());
    }
  }, [error, dispatch, alert, navigate,isAuthenticated]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className="all-orderd-products">
            {
              orders && orders.length === 0 ? (
                <div className="no-orders">
                  <img src="./marketplace-pana.svg" alt="marketplace" />
                  <h2>oops! Seems like you have not ordered anything yet!</h2>
                  <span>SHOP NOW</span>
                </div>
              ) :
              (
               orders &&  
               orders.map((item, i) => <MyOrderCard item={item} key={i} />)
              )
             
            }
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default MyOrder;
