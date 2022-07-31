import React from "react";
import '../App.css'
const PaymentDetails = ({subTotal, shippingPrice,shippingDiscount, tax, total}) => {
  return (
    <>
      <div className="priceInfo">
        <p>
          <span>Subtotal</span>
          <span>{subTotal.toFixed(2)}</span>
        </p>
        <p>
          <span>Shipping</span>
          <span>{shippingPrice.toFixed(2)}</span>
        </p>
        <p>
          <span>Shipping Discount</span>
          <span>{shippingDiscount.toFixed(2)}</span>
        </p>
        <p>
          <span>Tax</span>
          <span>{tax.toFixed(2)}</span>
        </p>
      </div>
      <div className="totalPrice">
        <span>Total</span>
        <span>
          <p>₹</p>
          {total.toFixed(2)}
        </span>
      </div>
    </>
  );
};

export default PaymentDetails;
