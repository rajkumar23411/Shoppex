import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from "@material-ui/lab";

const SingleFeaturedProduct = ({product}) => {
  const options = {
    value: product && product.ratings,
    size: "small",
    precision: 0.5,
    readOnly: true,
  };
  return (
  <Link to={`/product/${product._id}`}>
      <div className='featuredProductCard'>
          <div className="product-image">
                    <img src={product.images[0].url} alt="product preview" />
          </div>
          <div className="featured-product-details">
            <span className='productName'>{product.name}</span>
            <span className='productDsc'>{product.description}...</span>
            
            <div className='productPrice'>
              <span><i className="fa-solid fa-indian-rupee-sign"></i> {product.price}</span>
              <Rating {...options} />
            </div>
          </div>
    </div>
  </Link>
  )
}

export default SingleFeaturedProduct