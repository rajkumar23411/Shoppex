import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SingleProuct from "../components/SingleProuct";
import Slider from "@material-ui/core/Slider";
import { clearErrors, getProduct } from "../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/loader";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import ReactStars from "react-rating-stars-component";
import "../App.css";
const Products = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const [displaySizeFilter, setDisplaySizeFilter] = useState(false);
  const [displayPriceFilter, setDisplayPriceFilter] = useState(false);
  const [displayRatingFilter, setDisplayRatingFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([0, 8000]);
  const {
    loading,
    error,
    products,
    totalProducts,
    resultPerPage,
    // filteredProductCount
  } = useSelector((state) => state.products);

  const priceHanlder = (e, newPrice) =>{
    setPrice(newPrice);
  }
  const HandleSizeFilter = () => {
    setDisplaySizeFilter(!displaySizeFilter);
  };
  const HandlePriceFilter = () => {
    setDisplayPriceFilter(!displayPriceFilter);
  };
  const HandleRatingFilter = () => {
    setDisplayRatingFilter(!displayRatingFilter);
  };
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "#ffb400",
    isHalf: true,
    size: 25,
 };
 const categories = [
  "Jeans",
  "Trouser",
  "Shirt",
  "TShirt",
  "Footware",
  "EyeWare",
];
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, rating, category, price));
  }, [dispatch, error, alert, keyword, currentPage, rating, category, price]);
  // const productsCount = filteredProductCount;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className="allProducts">
            <div className="page-heading">
              <h3>All Products </h3>
              <div className="sort-div">
                <div className="sort-heading">Sort By:</div>
                <select>
                  <option defaultValue disabled>
                    Sort Products
                  </option>
                  <option value="low">Price--Low to High</option>
                  <option value="high">Price--High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>
            <div className="main">
              <div className="filters">
                <div className="filter-heading">
                  <span>filters</span>
                  <i
                    className="fa-solid fa-arrow-down-a-z"
                    style={{ fontSize: "20px", color: "#fff" }}
                  ></i>
                </div>
                <div className={displaySizeFilter ? "category-filter active" : "category-filter"}>
                  <div className="filter-name" onClick={HandleSizeFilter}>
                    <span>other categories</span>
                    <i className={displaySizeFilter ? "fa-solid fa-angle-down" : "fa-solid fa-angle-up" }></i>
                  </div>
                  <div className="all-categories">
                    {
                      categories.map((cat)=>(
                        <span key={cat} onClick={()=>setCategory(cat)}>{cat}</span>
                      ))
                    }
                  </div>
                </div>
                <div className={displayPriceFilter ? "price-filter active" : "price-filter"}>
                  <div className="filter-name" onClick={HandlePriceFilter}>
                    <span>Price</span>
                    <i className={displayPriceFilter ? "fa-solid fa-angle-down": "fa-solid fa-angle-up"}></i>
                  </div>
                  <div className="price-slider">
                    <Slider 
                      value={price}
                      onChange={priceHanlder}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      min={0}
                      max={8000}
                    /> 
                  </div>
                </div>
                <div className={displayRatingFilter ? "rating-filter active" : "rating-filter"}>
                  <div className="filter-name" onClick={HandleRatingFilter}>
                    <span>Customer Ratings</span>
                    <i className={displayRatingFilter ? "fa-solid fa-angle-down" : "fa-solid fa-angle-up"}></i>
                  </div>
                  <div className="ratingSlider">
                      <span onClick={()=> setRating(4)}><ReactStars {...options} value= {4} /> (& Up)</span>
                      <span onClick={()=> setRating(3)}><ReactStars {...options} value= {3} /> (& Up)</span>
                      <span onClick={()=> setRating(2)}><ReactStars {...options} value= {2}/> (& Up)</span>
                      <span onClick={()=> setRating(1)}><ReactStars {...options} value= {1}/> (& Up)</span>
                  </div>
                </div>
              </div>
              <div className="all-products">
                {products &&
                  products.sort(()=> Math.random() - 0.5).map((product) => (
                    <SingleProuct product={product} key={product._id} />
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
      {resultPerPage < totalProducts && (
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={totalProducts}
          onChange={setCurrentPageNo}
          prevPageText="< PREV"
          nextPageText="NEXT >"
          itemClass="page-item"
          linkClass="page_link"
          activeClass="pageActive"
          activeLinkClass="PageActiveLink"
          firstPageText="FIRST"
          lastPageText="LAST"
        />
      )}
      <Footer />
    </>
  );
};

export default Products;