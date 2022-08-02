import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
   return (
      <div className="footer">
         <div className="div-1">
            <div className="logo">
               <div className="logo-name">
                  <h3>Shoppex</h3>
               </div>
               <div className="social-icons">
                  <i className="fa-brands fa-whatsapp"></i>
                  <i className="fa-brands fa-instagram"></i>
                  <i className="fa-brands fa-facebook-f"></i>
                  <i className="fa-brands fa-twitter"></i>
               </div>
            </div>
            <div className="quickLinks">
               <span>Info</span>
               <ul className="tags">
                  <Link to="/" style={{"color":"unset"}}><li>Home</li></Link>
                  <Link to="/products" style={{"color":"unset"}}><li>Products</li></Link>
                  <Link to="/products" style={{"color":"unset"}}><li>Categories</li></Link>
                  <Link to="/contact" style={{"color":"unset"}}><li>Contact Us</li></Link>
                  <Link to="/about" style={{"color":"unset"}}><li>About Us</li></Link>
               </ul>
            </div>
            <div className="coustomerCare">
               <span>Customer care</span>
               <ul>
                  <Link to="/my_account" style={{"color":"unset"}}><li>Account</li></Link>
                  <Link to="/cart" style={{"color":"unset"}}>Cart</Link>
                  <Link to="/orders" style={{"color":"unset"}}>Orders</Link>
                  <Link to="/payment" style={{"color":"unset"}}><li>Payments</li></Link>
                  <Link to="/sizing"><li>Inclusive Sizing</li></Link>
               </ul>
            </div>
            <div className="newsLetter">
               <span>Subscribe to recieve updates and special offers</span>
               <form action="#">
                  <div className="input-div">
                     <input type="text" placeholder="your email address" />
                     <button>Subscribe</button>
                  </div>
               </form>
            </div>
         </div>
         <div className="div-2">
            <div>&copy;Shoppex - All Rights Reserved</div>
            <div>
               <span>Customercare@Shoppex.com | </span>
               <small>
               <i
                  className="fa-solid fa-phone"
                  style={{ fontSize: "10px" }}
               ></i>{" "}
               + 001 235 6666 | MON - FRI | 9AM - 5PM (IST)
            </small>
            </div>
         </div>
      </div>
   );
};

export default Footer;
