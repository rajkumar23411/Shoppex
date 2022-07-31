import React from 'react'
import { Link } from 'react-router-dom'

const SingleNewArrivedProduct = ({ product }) => {
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
            </div>
          </div>
    </div>
  </Link>
  )
}

export default SingleNewArrivedProduct;
