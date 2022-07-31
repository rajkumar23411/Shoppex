import React, { useEffect } from "react";
import "../../Dashboard.css";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import SideNavbar from "../../components/Dashboard/SideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAdmin } from "../../redux/actions/productActions";
import { getAllOrders } from "../../redux/actions/orderAction";
import { allUser } from "../../redux/actions/userAction";
const AdminDashboard = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const {users} = useSelector(state => state.allUsers);
  let outOfStock = 0;
  let totalIncome = 0; 

  orders && orders.forEach((order)=>{
    totalIncome += order.totalPrice;
  })
  products && 
  products.forEach(element => {
    if(element.stock === 0){
      outOfStock += 1;
    }
  });
  useEffect(() => {
    dispatch(getProductsAdmin());
    dispatch(getAllOrders());
    dispatch(allUser());
  }, [dispatch]);
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total AMount",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalIncome],
      },
    ],
  };

  const doughnutState = {
    labels: [" Out of stock", "In stock"],
    datasets: [
      {
        backgroundColor: ["#00A684", "#680084"],
        hoverBackgroundColor: ["#485000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  return (
    <div className="dashboard">
      <div className="left">
        <SideNavbar />
      </div>
      <div className="right">
        <div className="header">Dashboard</div>
        <div className="total-earning">
          <span>
            Total Income:{" "}
            <i className="fa-solid fa-indian-rupee-sign">{" "}{totalIncome}</i>
          </span>
        </div>
        <div className="product-order-user">
          <div className="product">
            <span className="header">Product</span>
            <span className="value">{products.length && products.length}</span>
          </div>
          <div className="order">
            <span className="header">Orders</span>
            <span className="value">{orders && orders.length}</span>
          </div>
          <div className="user">
            <span className="header">Users</span>
            <span className="value">{users && users.length}</span>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState}></Line>
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;