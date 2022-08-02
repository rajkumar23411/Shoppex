import React, { Fragment, useEffect, useState } from "react";
import Footer from "../components/Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {clearErrors, getProductDetails, newReview} from "../redux/actions/productActions";
import "../App.css";
import Loader from "../components/loader";
import ReviewCard from "../components/ReviewCard";
import { useAlert } from "react-alert";
import {addToCartItems} from "../redux/actions/cartAction"
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {Rating} from "@material-ui/lab"
import { NEW_REVIEW_RESET } from "../redux/constants/productsContstant";
const SingleProductPage = () => {
  const { id } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { product, error, loading } = useSelector(
    (state) => state.productDetails
  );
  const {success, error: reviewError} = useSelector(state => state.newReview);

  const options = {
    value: product && product.ratings,
    size: "large",
    precision: 0.5,
    readOnly: true
  };
  
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(" ");

  const increaseQty = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };
  const descreaseQty = () => {
    if (quantity <= 1) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () =>{
    dispatch(addToCartItems(id, quantity));
    alert.success("Item added to cart");
  }

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  }

  const reviewCancelHandler = () => {
    setOpen(false);
  }

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productID", id);

    dispatch(newReview(myForm));
    setOpen(false);
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if(reviewError){
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if(success){
      alert.success("Review submitted successfully");
      dispatch({type: NEW_REVIEW_RESET});
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);
  return (
    <Fragment>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="productDetailsCard">
            <div className="productImage">
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                      <img
                      src={item.url}
                      alt={`${i} slide`}
                      key={item.url}
                      className="carouselImage"  />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="productDetails">
                <div className="heading-block">{product && product.name}</div>
                <div className="desc-block">{product && product.description}</div>
                {loading ? (
                  <Loader />
                ) : (
                  <div className="ratings">
                    <Rating {...options} />
                    <p>
                      (
                      {product.ratings && product.ratings === 0
                        ? `No ratings yet`
                        : `${product.ratings} Rating${
                            product.ratings === 1 ? "" : "s"
                          }`}
                      )
                    </p>
                  </div>
                )}
                 <div className="add-review-btn" onClick={submitReviewToggle}>Add a review</div>
                <div className="price-block">₹{product.price}</div>
                <div className={product.stock < 1 ? "productStockRed" : "productStockGreen"}>
                  {product.stock < 1 ? "Temporarily out of stock" : "Product in stock"}
                </div>
                <div className="cart-block">
                  <div className="minus" onClick={descreaseQty}>
                    <i className="fa-solid fa-minus"></i>
                  </div>
                  <div className="value">{quantity}</div>
                  <div className="plus" onClick={increaseQty}>
                    <i className="fa-solid fa-plus"></i>
                  </div>
                </div>
                <div className="add-to-cart-btn">
                  <button disabled={product.stock === 0 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
                </div>
              </div>

              <div className="productReview">
                <div className="header">
                  <h3>Ratings & Reviews</h3>(
                  {product.ratings === 0 && product.numOfReviews === 0
                    ? `No ratings & No reviews yet`
                    : `${product.ratings} Ratings & ${product.numOfReviews} Reviews`}
                  )
                </div>
                {product.reviews && product.reviews[0] ? (
                  <div className="allReviews">
                    {product.reviews &&
                      product.reviews.map((review) => (
                        <ReviewCard review={review} key={review._id} />
                      ))}
                  </div>
                ) : (
                  <div className="no-review-rating">
                    <img src="/no-review.svg" alt="no review and rating" />
                    <h4>No ratings & reviews has been added yet!</h4>
                  </div>
                )}
              </div>
              <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={submitReviewToggle} className="dialog-box">
                <DialogTitle className="review-header">Submit Review</DialogTitle>
                <DialogTitle className="review-title">share your valuable review with us!</DialogTitle>
                <DialogContent className="submitDialog">
                  <Rating onChange={(e) => setRating(e.target.value)} value={rating} size="large" name="rating" />
                  <textarea className="reviewCommentArea" cols="40" rows="5" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write here your valuable comment"></textarea>
                </DialogContent>
                <DialogActions className="dialog-btns">
                  <Button color="secondary" variant="outlined" onclick={reviewCancelHandler}>Cancel</Button>
                  <Button color="primary" variant="outlined" onClick={reviewSubmitHandler}>Submit</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </>
      )}
      <Footer />
    </Fragment>
  );
};

export default SingleProductPage;