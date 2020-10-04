/*  eslint-disable */

import React from "react";
// import rect router
import { Link } from "react-router-dom";
import U_User from "../controllers/User";
import A_Admin from "../controllers/Admin";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { SignOut } from "../actions/authActions";
import Config from "../controllers/Config";
import { withRouter } from "react-router-dom";

class MainNavbar extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props)
    this.state = {
      loginState: false,
      Title: "Sign",
      adminState: false,
      mangerState: false,
      search: "",
    };
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      this.setState({
        loginState: true,
        Title: "My Account",
      });

      var type = this.props.auth.isAuthenticated
        ? this.props.auth.user.type
        : "";

      if (type == "admin") {
        this.setState({
          adminState: true,
        });
      } else {
        this.setState({
          adminState: false,
        });
      }
    } else {
      console.log("called q");
      this.setState({
        loginState: false,
        Title: "Sign In",
      });
    }
  }

  signoutuser = () => {
    this.props.SignOut && this.props.SignOut();
    U_User.signOut();
    this.setState({
      loginState: false,
    });

    this.props.history.push("/");
  };

  searchProducts = () => {
    if (this.state.search.length > 0) {
      this.props.history.push(`/search/${this.state.search}`);
    }
  };

  checkButton = () => {
    const { loginState, adminState, mangerState } = this.state;
    if (loginState == true && adminState == true) {
      return (
        <Link
          to="/admin/dashboard"
          className="login-panel px-3 font-weight-bold text-dark"
        >
          <i className="fa fa-user"></i>Admin Dashboard
        </Link>
      );
    } else if (
      loginState == true &&
      adminState != true &&
      mangerState != true
    ) {
      return (
        <Link
          to="/myaccount"
          className="login-panel px-3 font-weight-bold text-dark"
        >
          <i className="fa fa-user"></i>My Account
        </Link>
      );
    } else if (
      loginState == true &&
      adminState != true &&
      mangerState == true
    ) {
      return (
        <Link
          to="/admin/dashboard"
          className="login-panel font-weight-bold text-dark px-3"
        >
          <i className="fa fa-user"></i>
          Manager Dashboard
        </Link>
      );
    } else {
      return (
        <Link to="/signin" className="login-panel font-weight-bold text-dark">
          <i className="fa fa-user"></i>Sign In
        </Link>
      );
    }
  };

  render() {
    const cateogories = this.props.cart.categories;
    const cart = this.props.cart.cart;
    const length = cart.length;
    return (
      <header className="header-section">
        <div className="header-top">
          <div className="container">
            <div className="ht-left">
              <div className="mail-service font-weight-bold text-dark">
                <i className=" fa fa-envelope px-2" />
                info@shanbabay.lk
              </div>
              <div className="phone-service font-weight-bold text-dark">
                <i className=" fa fa-phone"></i>
                (+94)76 6191256
              </div>
            </div>

            {this.state.loginState && (
              <div className="ht-right">
                <Link
                  to=""
                  className="login-panel font-weight-bold text-dark"
                  onClick={() => this.signoutuser()}
                >
                  Sign Out
                  <i className="fa fa-sign-out-alt px-2"></i>
                </Link>
              </div>
            )}

            <div className="ht-right">{this.checkButton()}</div>
          </div>
        </div>
        <div className="container">
          <div className="inner-header">
            <div className="row justify-content-center">
              <div className="col-lg-2 col-md-2">
                <div className="logo">
                  <a href="/">
                    <img src="images/logo.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="col-lg-7 col-md-7">
                <div className="advanced-search">
                  <div className="input-group">
                    <input
                      style={{ color: "#000000" }}
                      type="text"
                      value={this.state.search}
                      placeholder="Search Anything .."
                      onChange={(e) =>
                        this.setState({ search: e.target.value })
                      }
                    />
                    <button onClick={this.searchProducts} type="button">
                      search
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 text-right col-md-3">
                <ul className="nav-right">
                  <li className="cart-icon mr-3">
                    <Link to="/cart">
                      <FontAwesomeIcon
                        icon={faShoppingCart}
                        className="text-dark "
                      />
                      {length != 0 && <span>{length}</span>}
                    </Link>
                  </li>
                  <Link to="/cart">
                    <li className="cart-price click text-dark">
                      LKR {Config.calcualte_total(cart)}
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="nav-item">
          <div className="container">
            <nav className="nav-menu mobile-menu">
              <ul>
                <li
                  className={
                    this.props.active && this.props.active == "home"
                      ? "active"
                      : ""
                  }
                >
                  <Link to="/">Home</Link>
                </li>
                <li
                  className={
                    this.props.active && this.props.active == "category"
                      ? "active"
                      : ""
                  }
                >
                  <Link>Categories</Link>
                  <ul class="dropdown">
                    {cateogories &&
                      cateogories.map((item, i) => (
                        <li key={i}>
                          <Link to={`/categories/${item.name.trim()}`}>
                            {item.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </li>
                {/* <li
                  className={
                    this.props.active && this.props.active == "offers"
                      ? "active"
                      : ""
                  }
                >
                  <Link to="/offers">Offers</Link>
                </li>
                <li
                  className={
                    this.props.active && this.props.active == "aboutus"
                      ? "active"
                      : ""
                  }
                >
                  <Link to="/aboutus">About Us</Link>
                </li>
                <li
                  className={
                    this.props.active && this.props.active == "contactus"
                      ? "active"
                      : ""
                  }
                >
                  <Link to="/contactus">Contact Us</Link>
                </li> */}
              </ul>
            </nav>
            <div id="mobile-menu-wrap"></div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart || {},
  auth: state.auth || {},
});

const mapDispatchToProps = {
  SignOut,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainNavbar));
