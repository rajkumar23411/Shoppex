import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/loader";
import { clearErrors, forgotPassword } from "../redux/actions/userAction";
import { useAlert } from "react-alert";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [ email, setEmail ] = useState("");
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, alert, error, message]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="forms">
          <div className="left">
            <img src="Forgot-password.svg" alt="forgot password" />
            <h3>Forgot Your Password ?</h3>
            <span>No worries! Your can reset it now</span>
          </div>
          <form action="#" onSubmit={forgotPasswordSubmit}>
            <div className="form-heading">
              <h3>RECOVER PASSWORD</h3>
              <small>Please enter your e-mail:</small>
            </div>
            <div className="input-field">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <button>Recover</button>
            </div>
            <div className="goTo">
              <small>
                Remember your password?{" "}
                <span>
                  <Link to="/login">Back to Login</Link>
                </span>
              </small>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
