import React from "react";
import "../App.css";
const CartSummery = ({ item }) => {

  return (
    <>
      <div className="cartItems">
        <div>
          <img src={item.image} alt="cartItem" className="productImg" />
          <span>
            {item.quantity} x {item.name}
          </span>
        </div>
        <div>₹ {item.quantity * item.price}</div>
      </div>
      
    </>
  );
};

export default CartSummery;
