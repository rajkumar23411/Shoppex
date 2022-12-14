import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../redux/actions/cartAction";
import { Country, State} from "country-state-city";
import Navbar from "../components/Navbar.jsx";
import "../App.css";
import CartSummery from "../components/CartSummery";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import PaymentDetails from "../components/PaymentDetails";
const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [country, setCountry] = useState(shippingInfo.country);
  const [state, setState] = useState(shippingInfo.state);
  const [pincode, setPincode] = useState(shippingInfo.pincode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const subTotal = cartItems.reduce((acc, curr) => {
    return acc + curr.quantity * curr.price;
  }, 0);

  const shippingPrice = 50;

  let shippingDiscount = 0;
  if (subTotal > 1000) {
    shippingDiscount = -50;
  } else {
    shippingDiscount = 0;
  }

  const tax = (subTotal * 5) / 100;
  const Total = subTotal + shippingPrice + shippingDiscount + tax;

  const shippingSubmitHandler = (e) => {
    e.preventDefault();

    if (phoneNo.length > 10 || phoneNo.length < 10) {
      alert.error("Phone no. should be 10 digits");
      return;
    }

    dispatch(
      saveShippingInfo({ address, city, country, state, phoneNo, pincode })
    );

    navigate("/order/confirm");
  };
  return (
    <>
      <Navbar />
      <CheckoutSteps activeSteps={0} />
      <div className="shippingPage">
        <div className="heading">
          <h3>Shipping Address</h3>
          <small>Please fill the below information: </small>
        </div>
        <form encType="multipart/form-data" onSubmit={shippingSubmitHandler}>
          <div className="input-div">
            <input
              required
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label>Address</label>
          </div>
          <div className="input-div">
            <input
              required
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <label>City</label>
          </div>

            <div className="input-div">
              <input
                required
                type="number"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                maxLength="10"
              />
              <label>Contact No.</label>
            </div>
            <div className="input-div">
              <input
                required
                type="number"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                maxLength="6"
              />
              <label>Pin Code</label>
            </div>

          <div className="input-div">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option
                value=""
                defaultValue
                style={{ color: "rgba(0,0,0,0.5)" }}
              >
                Select Country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option value={item.isoCode} key={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
            {/* <label>Country</label> */}
          </div>
          {country && (
            <div className="input-div">
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              >
                <option defaultValue style={{ color: "rgba(0,0,0,0.5)" }}>
                  Select State
                </option>
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
            <button disabled={state ? false : true}>Continue</button>
        </form>
        <div className="orderSummery">
          <div className="heading-section">
            <h4>Order Summary</h4>
            <Link to="/cart">
              <small>Edit cart</small>
            </Link>
          </div>
          <div className="itemsSection">
            {cartItems &&
              cartItems.map((item) => (
                <CartSummery item={item} key={item.product} />
              ))}
          </div>
          {
            cartItems && 
            <PaymentDetails subTotal={subTotal} shippingPrice={shippingPrice} shippingDiscount={shippingDiscount} tax={tax} total={Total}/>
          }
        </div>
      </div>
    </>
  );
};

export default Shipping;
