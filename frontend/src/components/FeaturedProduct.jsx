import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleFeaturedProduct from "./SingleFeaturedProduct";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";
import Loader from "./loader";
import { getProductsAdmin } from "../redux/actions/productActions";
const FeaturedProduct = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.products);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000
  };
  useEffect(()=>{
    dispatch(getProductsAdmin());
  },[dispatch])
  return (
    <div className="featured">
      <div className="heading">
        <h3>Top Selling Products</h3>
      </div>
      <div className="featuredProducts">
        {loading ? (
          <Loader />
        ) : (
          <Slider {...settings}>
            {products &&
              products.map((product) => (
                product.stock <= 4 && 
                  <SingleFeaturedProduct product={product} key={product._id} />
              ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default FeaturedProduct;
