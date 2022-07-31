import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import "../App.css";

const SingleProuct = ({ product }) => {
  const options = {
    value: product && product.ratings,
    size: "large",
    precision: 0.5,
    readOnly: true,
  };
  return (
    <Link to={`/product/${product._id}`}>
      <div className="productCard">
        <div className="product-img">
          <img src={product.images[0].url} alt="productimage" />
        </div>
        <div className="product-details">
          <h3 className="productName">{product.name}</h3>
          <span className="addedBy">{product.description}</span>
          <div className="ratings">
            <Rating {...options} />
            <span>
              {" "}
              {product.numOfReviews === 0
                ? `No reviews yet`
                : `${product.numOfReviews} Review`}
            </span>
          </div>
          <div className="price-cart">
            <span className="price">
              <i className="fa-solid fa-indian-rupee-sign"></i> {product.price}
            </span>
            <button className="cartBtn">
              <span>Add to Cart</span>
              <i className="fa-solid fa-cart-arrow-down"></i>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default SingleProuct;
