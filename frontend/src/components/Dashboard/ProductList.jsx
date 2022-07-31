import React, { useEffect } from "react";
import {
  getProductsAdmin,
  clearErrors,
  deleteProductAdmin,
} from "../../redux/actions/productActions.js";
import { useDispatch, useSelector } from "react-redux";
import SideNavbar from "../../components/Dashboard/SideNavbar";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { DELETE_PRODUCT_RESET } from "../../redux/constants/productsContstant.js";
const ProductList = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, products } = useSelector((state) => state.products);
  const {error: deleteError, isDelete} = useSelector(state => state.deleteProduct);
  
  const deleteProductHandler = (id) => {
    dispatch(deleteProductAdmin(id));
  }
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(deleteError){
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if(isDelete){
      alert.success("Item deleted successfully");
      navigate("/admin/dashboard");
      dispatch({type: DELETE_PRODUCT_RESET});
    }
    dispatch(getProductsAdmin());
  }, [dispatch, error, deleteError, navigate, isDelete, alert]);
  return (
    <div className="dashboard">
      <div className="left">
        <SideNavbar />
      </div>
      <div className="right">
        <div className="header">ALL PRODUCTS</div>
        {products && (
          <table  cellPadding="1" cellSpacing="1">
            <thead>
                <th>Order ID</th>
                <th>Product Name</th>
                <th>Ratings</th>
                <th>Total Price</th>
                <th>Stock</th>
                <th>Actions</th>
            </thead>
            <tbody>
              {products &&
                products.map((item) => (
                  <tr key={item._id}>
                   <td>{item._id}</td>
                    <td className="image-id">
                      <span>{
                        item && 
                        <img src={item.images[0].url} alt="product preview" style={{ "width":"2rem" }}/>
                      }</span>
                      <span> {item.name} </span>
                      </td>
                    <td>{item.ratings === 0 ? (
                      <>0{" "}<i class="fa-solid fa-star" style={{fontSize:"13px", color:"#f39c12"}}></i></> 
                    ) : (
                     <>{item.ratings}{" "}<i class="fa-solid fa-star" style={{fontSize:"13px", color:"#f39c12"}}></i></> 
                    )}</td>
                    <td><i className="fa-light fa-indian-rupee-sign"></i> {item.price}</td>
                    <td>{item.stock}</td>
                    <td className="edit-delete-option">
                       <Link to={item._id}><i className="fa-light fa-pen-to-square"></i></Link>
                      <i className="fa-light fa-trash-can" onClick={()=>deleteProductHandler(item._id)}></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductList;
