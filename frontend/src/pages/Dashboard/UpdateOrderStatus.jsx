import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import SideNavbar from "../../components/Dashboard/SideNavbar";
import "../../Dashboard.css";
import {
  clearErrors,
  getSingleOrder,
  updateOrderStatus,
} from "../../redux/actions/orderAction";
import { useNavigate, useParams } from "react-router";
import { UPDATE_ORDER_RESET } from "../../redux/constants/orderConstant";
import Loader from "../../components/loader";

const UpdateOrderStatus = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { order, loading, error } = useSelector((state) => state.singleOrder);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const [status, setStatus] = useState(" ");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Order status updated successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
      navigate("/admin/orders");
    }

    dispatch(getSingleOrder(id));
  }, [dispatch, error, updateError, isUpdated, id, alert, navigate]);

  const updateOrderStatusHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrderStatus(id, myForm));
  };
  return (
    <div className="dashboard orderStatus">
      <div className="left">
        <SideNavbar />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="right">
            <div className="orderInfo">
            <div className="order-id-details">
              <p>
                <span>Order ID: </span>
                <span className="orderId">{order && order._id}</span>
              </p>
              <p>
                <span>Ordered On: </span>
                <span>{order && order.createdAt && order.createdAt.substring(0, 10)}</span>
              </p>
            </div>
              <div className="shippingInfo">
                <h3>Shipping Info</h3>
                <p>
                  <span>Name:</span>
                  <span>{order && order.user && order.user.name}</span>
                </p>
                <p>
                  <span>Email:</span>
                  <span>{order && order.user && order.user.email}</span>
                </p>
                <p>
                  <span>Contact No.:</span>
                  <span>
                    {order && order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </p>
                <p>
                  <span>Pin Code: </span>
                  <span>
                    {order && order.shippingInfo && order.shippingInfo.pinCode}
                  </span>
                </p>
                <p>
                  <span>Address:</span>
                  <span>
                    {order && order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country}`}
                  </span>
                </p>
              </div>
              <div className="paymentInfo">
                <h3>Payment Info</h3>
                <p>
                  <span className="paymentStatus"><i className="fa-solid fa-circle-check"></i> {order && order.paymentInfo && order.paymentInfo.status}</span>
                </p>
                <p>
                  <span>Paid at: </span>
                  <span>
                    {order && order.paidAt &&
                      `${order.paidAt.substring(0, 10)} at ${order.paidAt.substring(11, 19)}`}
                  </span>
                </p>
              </div>
              <div className="orderStatus" >
                <h3>Order Status: </h3>
                <span className={order && order.orderStatus && order.orderStatus === "Processing" ? "redColor" : "greenColor"}>{ order && order.orderStatus}</span>
                {
                  order && order.orderStatus === "Delivered" && (
                    <p>
                      <span>Delivered At: </span>
                      <span>{order && order.deliveredAt && `${order.deliveredAt.substring(0, 10)} at ${order.deliveredAt.substring(11, 19)}`}</span>
                    </p>
                  )
                }
              </div>
              <div className="cart-items">
                <h3>Ordered Items</h3>
                {order &&
                  order.orderItems &&
                  order.orderItems.map((item) => (
                    <div className="item-box" key={item._id}>
                      <p>
                        <img src={item.image} alt="product" style={{"height": "6rem"}}/>
                        <p>
                        <span className="itemName">{item.name}</span>
                        <span className="itemQuantity">Quantity: {item.quantity}</span>
                        <span className="itemPrice">Price: <i className="fa-light fa-indian-rupee-sign"></i>{item.price}</span>
                        </p>
                      </p>
                      <p>
                        <span>{`${item.quantity} x ₹${item.price} = ₹${order.itemsPrice}`}</span>
                      </p>
                    </div>
                  ))}
              </div>
            </div>
            <div className="update-status" style={{ display : order && order.orderStatus === "Delivered" ? "none" : "block"}}>
              <h3>Update Order Status</h3>
              <form onSubmit={updateOrderStatusHandler}>
                <div className="input">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option defaultValue value="">Choose Order Status</option>
                    {order && order.orderStatus === "Processing" && (
                      <option value="Shipped">Shipped</option>
                    )}
                    {
                     order && order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )
                    }
                  </select>
                </div>
                <button
                  disabled={
                    loading ? true : false || status === "" ? true : false
                  }
                >
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateOrderStatus;
