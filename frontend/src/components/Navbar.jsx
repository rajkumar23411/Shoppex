import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import React from "react";
import { logOut } from "../redux/actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
const Navbar = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [stickyNavBar, setStickyNavBar] = useState(false);
  const [SearchPage, setSearchPage] = useState(false);
  const [toggleNavBar, setToggleNavBar] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const StickyNavBar = () => {
    if (window.scrollY > 720) {
      setStickyNavBar(true);
    } else {
      setStickyNavBar(false);
    }
  };
  window.addEventListener("scroll", StickyNavBar);
  const showSearchPage = () => {
    setSearchPage(true);
  };
  const removeSearchPage = () => {
    setSearchPage(false);
  };
  // eslint-disable-next-line
  const DisplayMenu = () => {
    setToggleNavBar(!toggleNavBar);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history(`/products/${keyword}`);
    } else {
      history(`/products`);
    }
  };

  function logoutUser() {
    dispatch(logOut());
    alert.success("Logged out Successfully");
    navigate("/")
  }

  return (
    <>
      <nav>
        <div className={stickyNavBar ? "bottom active" : "bottom"}>
          <div className="left">
            <Link to="/"><h3>Shoppex</h3></Link>
          </div>
          <div className="right">
          <ul className={toggleNavBar ? "navTags active" : "navTags"}>
            <Link to="/">
              <li >Home</li>
            </Link>
            <Link to="/products">
              <li>Products</li>
            </Link>
            <Link to="/about">
              <li>About Us</li>
            </Link>
            <Link to="/contact">
              <li>Contact Us</li>
            </Link>
            {!isAuthenticated ? (
              <>
                <Link to="/register">
                  <li>Register</li>
                </Link>
                <Link to="/login">
                  <li>Login</li>
                </Link>
              </>
            ) : (
              " "
            )}
          </ul>
          <div className="navIcons">
          <div className="searcIcon" onClick={showSearchPage}>
              <img src="/search-normal.svg" alt="Icon" className="Icon" />
          </div>
          <div className="accountIcon">
              <img src="/profile-circle.svg" alt="user" className="Icon" />
              <p>Profile</p>
              <div className="account-menu">
                <div className="section-1">
                  {
                      isAuthenticated === false ? (
                      <div className="unauthUserGreet">
                        <>Hi there!</>
                        <p>Please login to access</p>
                        <Link to="/login">
                          <div className="login-signup-btn">LOGIN / SIGNUP</div>
                        </Link>
                      </div>
                  ) : (
                      <div className="authUserGreet">
                        <h3>Hello!</h3>
                        <p>
                          <img src={user && user.avatar && user.avatar.url} alt="user-profile" />
                          {user && user.name}
                        </p>
                      </div>
                  )
                }
                </div>
                <div className="section-2">
                  {
                    user && user.role === "admin" &&
                    <Link to="/admin/dashboard">
                      <p>
                        <i className="fa-light fa-border-all"></i>
                        <span>Dashboard</span>
                      </p>
                    </Link>
                  }
                    <Link to="/my_account">
                      <p>
                        <i className="fa-light fa-circle-user"></i>
                        <span>Account</span>
                      </p>
                    </Link>
                    <Link to="/orders">
                      <p>
                        <i className="fa-light fa-truck-fast"></i>
                        <span>Orders</span>
                      </p>
                    </Link>
                    <Link to="/cart">
                      <p>
                        <i className="fa-light fa-basket-shopping"></i>
                        <span>Cart</span>
                      </p>
                    </Link>
                </div>
                {!isAuthenticated ? (
                  " "
                ) : (
                  <div className="section-3">
                    <span onClick={logoutUser}>
                      Logout
                    </span>
                  </div>
                )}
              </div>
            </div>
            <Link to="/cart">
              <div className="cartIcon">
                {
                cartItems.length === 0 ? "" : (
                    <span>{cartItems.length}</span>
                )       
                }
                <img src="/bag.svg" alt="cart" className="Icon" style={{width: "1.3rem"}} />
                <p>Bag</p>
              </div>
            </Link>
          </div>
          </div>
        </div>
      </nav>

      <div className={SearchPage ? "searchPage active" : "searchPage"}>
        <div className="search-div">
          <form onSubmit={searchSubmitHandler}>
            <div className="search-options">
              <input
                type="text"
                placeholder="search here products, brands and more.."
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              <div className="cross" onClick={removeSearchPage}>
                &times;
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Navbar;
