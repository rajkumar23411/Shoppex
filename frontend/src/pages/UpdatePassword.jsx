import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearErrors, updatePassword } from "../redux/actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../redux/constants/userConstant";
import "../App.css";
import Loader from "../components/loader";
import Navbar from "../components/Navbar";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useNavigate();
  const { user } = useSelector((state) => state.user);

  const { loading, isUpdated, error } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Password Updated Successfully");
      history("/my_account");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, alert, history, isUpdated, user]);
  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="forms">
          <form action="#" onSubmit={updatePasswordSubmit} className="forgotPasswordForm">
            <div className="form-heading">
              <h3>CHNAGE PASSWORD</h3>
              <small>Please fill in the information below:</small>
            </div>
            <div className="input-field">
              <input
                type="text"
                placeholder="Enter old password"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Enter new password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Re-enter new password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="input-field">
              <button>UPDATE PASSWORD</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdatePassword;