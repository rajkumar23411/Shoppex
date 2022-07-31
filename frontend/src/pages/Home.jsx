import React from "react";
import Banner from "../components/Banner";
import Category from "../components/Category";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../App.css";
import { getProduct } from "../redux/actions/productActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import FeaturedProduct from "../components/FeaturedProduct";
import NewArrivals from "../components/NewArrivals";
import Specification from "../components/Specification";
import Offer from "../components/Offer";
const Home = () => {
   const dispatch = useDispatch();
   // const {loading, error, products, productsCount} = useSelector(state => state.products)

   useEffect(()=>{
      dispatch(getProduct())
   },[dispatch]);
   return (
      <>
         <Navbar />
         <Banner />
         <Specification />
         <Category />
         <FeaturedProduct />
         <Offer />
         <NewArrivals />
         <Footer />
      </>
   );
};

export default Home;
