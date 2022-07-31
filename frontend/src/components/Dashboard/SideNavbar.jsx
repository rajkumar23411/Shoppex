import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideNavbar = () => {
          const [productsTag, setProductsTag] = useState(false);
          const displayProductsSubTag = () =>{
                    setProductsTag(!productsTag);
          }
  return (
    <>
      <div className="brandName"><Link to="/" style={{color: "unset"}}>Shoppex</Link></div>
      <ul>
        <Link to="/admin/dashboard" style={{color: "unset"}}><li>
          <i className="fa-light fa-archway"></i>Dashboard
        </li></Link>
       <Link to="/admin/orders" style={{color: "unset"}}> 
          <li><i className="fa-light fa-basket-shopping"></i>Orders</li>
       </Link>
        <li className="products-tag" onClick={displayProductsSubTag}>
          <span>
            <i className="fa-light fa-feather-pointed"></i>Products
          </span>
        </li>
        <div
          className={
            productsTag ? "products-sub-tag active" : "products-sub-tag"
          }
        >
          <Link to="/admin/products" style={{color: "unset"}}>
            <span>
              <i className="fa-light fa-indent"></i>All Products
            </span>
          </Link>
          <Link to="/admin/product/new" style={{color: "unset"}}>
          <span>
            <i className="fa-light fa-plus"></i> Create Products
          </span>
          </Link>
        </div>
        <Link to="/admin/users" style={{color: "unset"}}>
        <li>
          <i className="fa-light fa-users"></i>Users
        </li>
        </Link>
        <Link to="/admin/reviews" style={{color: "unset"}}>
        <li>
          <i className="fa-light fa-star"></i>Reviews
        </li>
        </Link>
      </ul>
    </>
  );
};

export default SideNavbar;
