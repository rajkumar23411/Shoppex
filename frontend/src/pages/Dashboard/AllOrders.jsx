import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import SideNavbar from "../../components/Dashboard/SideNavbar";
import Loader from "../../components/loader";
import {
  clearErrors,
  deleteOrder,
  getAllOrders,
} from "../../redux/actions/orderAction";
import { Link, useNavigate } from "react-router-dom";
import { DELETE_ORDER_RESET } from "../../redux/constants/orderConstant";
const AllOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteOrderError, isDeleted } = useSelector(
    (state) => state.order
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    if (deleteOrderError) {
      alert.error(deleteOrderError);
      dispatch(clearErrors());
    }
    dispatch(getAllOrders());
  }, [isDeleted, alert, navigate, deleteOrderError, dispatch, error]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  return (
    <div className="dashboard">
      <div className="left">
        <SideNavbar />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="right">
            <div className="header">ALL ORDERS</div>
            {orders && (
              <table cellPadding="1" cellSpacing="1">
                <thead>
                  <th>Order ID</th>
                  <th>Order Date</th>
                  <th>Order Status</th>
                  <th>Items Quantity</th>
                  <th>Grand Total</th>
                  <th>Payment Status</th>
                  <th>Actions</th>
                </thead>
                <tbody>
                  {orders &&
                    orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <th
                          style={order.orderStatus !== "Delivered" ? { color: "#d63031" } : { color: "#2ecc71" }}>
                          {order.orderStatus}
                        </th>
                        <td>{order.orderItems.length}</td>
                        <td>Rs. {order.totalPrice}</td>
                        <td>{order.paymentInfo.status}</td>
                        <td>
                          <Link to={`/admin/order/${order._id}`}>
                            <i className="fa-light fa-pen-to-square"></i>
                          </Link>
                          <i
                            className="fa-light fa-trash-can"
                            onClick={() => deleteOrderHandler(order._id)}
                          ></i>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AllOrders;
