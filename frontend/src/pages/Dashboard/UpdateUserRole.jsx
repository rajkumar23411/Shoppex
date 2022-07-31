import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import SideNavbar from "../../components/Dashboard/SideNavbar";
import { clearErrors, getUserDetails, updateUser } from "../../redux/actions/userAction";
import { UPDATE_USER_RESET } from "../../redux/constants/userConstant";
import Loader from "../../components/loader";

const UpdateUserRole = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const {id} = useParams();
  const {loading, error, user} = useSelector(state => state.userDetails)
  const {loading: updateLoading, error: updateError, isUpdated} = useSelector(state => state.profile)
  const [role, setRole] = useState("");

  useEffect(() => {
    if(user && user._id !== id){
      dispatch(getUserDetails(id));
    }else{
      setRole(user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(updateError){
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if(isUpdated){
          alert.success("User Updated Successfully");
          navigate("/admin/users");
          dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, loading, navigate, isUpdated, id, updateError, alert, user]);

  const updateUserRoleHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("role", role);

    dispatch(updateUser(id, myForm));
  };

  return (
    <div className="dashboard">
      <div className="left">
        <SideNavbar />
      </div>
      {
          updateLoading ? <Loader /> : <div className="right">
          <div className="header">Update User Role</div>
          <div className="createProductForm">
            <form onSubmit={updateUserRoleHandler}>
              <div className="input-div">
              <i className="fa-light fa-pen-to-square"></i>
                <input
                  type="text"
                  placeholder="Name"
                  defaultValue={user && user.name}
                  readOnly
                />
              </div>
              <div className="input-div">
              <i className="fa-light fa-envelope-circle-check"></i>
                <input
                  type="email"
                  placeholder="Email"
                  defaultValue={user && user.email}
                  readOnly
                />
              </div>
              <div className="input-div">
              <i className="fa-light fa-arrow-up-right-from-square"></i>
                <select
                  name="category"
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                >
                  <option defaultValue >Choose Role</option>
                  <option defaultValue value="admin">Admin</option>
                  <option defaultValue value="User">User</option>
                </select>
              </div>
              <button type="submit" disabled={updateLoading ? true : false || role === "" ? true : false}>UPDATE ROLE</button>
            </form>
          </div>
        </div>
      }
    </div>
  );
};

export default UpdateUserRole;
