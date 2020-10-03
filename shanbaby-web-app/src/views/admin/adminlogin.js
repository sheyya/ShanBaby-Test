/*  eslint-disable */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import A_Admin from "../../controllers/Admin";
import C_Config from "../../controllers/Config";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getCart } from "../../actions/cartActions";
import { setCurrentUser } from "../../actions/authActions";

class Adminlogin extends Component {
  constructor() {
    super();
    // this.savepassword = this.savepassword.bind(this);

    this.state = {
      uEmail: "",
      uPass: "",
      isChecked: false,
      error: "",
      browserUser: "",
    };
  }

  formValueChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // savepassword() {
  //     this.setState({
  //         isChecked: !this.state.isChecked
  //     })
  //     console.log(this.state.isChecked);

  // }

  checkUserBrowser() {
    // Get the user-agent string
    let userAgentString = navigator.userAgent;
    // Detect Chrome
    let chromeAgent = userAgentString.indexOf("Chrome") > -1;

    // Detect Internet Explorer
    let IExplorerAgent =
      userAgentString.indexOf("MSIE") > -1 ||
      userAgentString.indexOf("rv:") > -1;

    // Detect Firefox
    let firefoxAgent = userAgentString.indexOf("Firefox") > -1;

    // Detect Safari
    let safariAgent = userAgentString.indexOf("Safari") > -1;

    // Discard Safari since it also matches Chrome
    if (chromeAgent && safariAgent) safariAgent = false;

    // Detect Opera
    let operaAgent = userAgentString.indexOf("OP") > -1;

    if (chromeAgent && operaAgent) chromeAgent = false;

    var loginBrowes = null;
    if (safariAgent) loginBrowes = "Safari";
    if (chromeAgent) loginBrowes = "Chrome";
    if (IExplorerAgent) loginBrowes = "IExplorer";
    if (operaAgent) loginBrowes = "Opera";
    if (firefoxAgent) loginBrowes = "Firefox";

    this.setState({
      browserUser: loginBrowes,
    });
  }

  validateLoginForm = () => {
    let { uEmail, uPass, error } = this.state;
    let count = 0;
    if (uEmail.length <= 0) {
      error = "Enter email";
      count++;
    } else if (uPass.length <= 0) {
      error = "Enter password";
      count++;
    }

    if (count > 0) {
      return false;
    } else {
      return true;
    }
  };

  onLogin = async (e) => {
    e.preventDefault();

    console.log(this.validateLoginForm());

    if (this.validateLoginForm() != false) {
      console.log(this.state.uEmail);
      console.log(this.state.uPass);

      await this.checkUserBrowser();
      var userBrowser = this.state.browserUser;

      var status = await A_Admin.adminSignIn(
        this.state.uEmail,
        this.state.uPass,
        userBrowser
      );
      console.log(status);

      switch (status) {
        // user not found
        case 401:
          await this.setState({
            loading: false,
          });
          await C_Config.showAlert(
            "No account associated to email. Please sign up"
          );
          await window.location.replace("/signup");
          return -1;
        // Invalid Password
        case 403:
          await this.setState({
            loading: false,
          });
          await C_Config.showAlert("Invalid password");
          return -1;
        // network error
        case 600:
          await this.setState({
            loading: false,
          });
          C_Config.showAlert("Please check your network connection", "Oops!");
          return -1;
        case 200:

        default:
          break;
      }

      //   set user details
      var curretUser = status;

      await console.log(
        "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
      );
      await console.log("User Details");
      await console.log(curretUser);

      this.props.setCurrentUser(curretUser);
      this.props
        .getCart(curretUser.id)
        .then((result) => {
          this.props.history.push("/admin/dashboard");
        })
        .catch((error) => console.log(error));
    }
  };

  render() {
    return (
      <div className="wrapper">
        {/* // ======================================================== */}
        {/* // =============== Nav Bar =============== */}
        {/* // ========================================================  */}
        {/* // ======================================================== */}
        {/* // ===============  Register Section Begin  =============== */}
        {/* // ========================================================  */}
        {/* // ======================================================== */}
        {/* // =============== Breadcrumb Section Begin  =============== */}
        {/* // ========================================================  */}
        <div className="breacrumb-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-text">
                  <span>Admin Sign In Area</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* // ======================================================== */}
        {/* // =============== Breadcrumb Form Section end  =============== */}
        {/* // ========================================================  */}

        {/* // ======================================================== */}
        {/* // =============== Login Section Begin  =============== */}
        {/* // ========================================================  */}
        <div className="register-login-section spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <div className="login-form">
                  <h4 className="font-weigh-bold mt-3 mb-4 text-dark">
                    <b>Admin Portal</b>
                  </h4>
                  <form
                    onSubmit={(e) => {
                      this.onLogin(e);
                    }}
                  >
                    <div className="group-input">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="uEmail"
                        pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,}$"
                        placeholder="johndoe@gmail.com"
                        onChange={(e) => this.formValueChange(e)}
                        required
                      />
                    </div>
                    <div className="group-input">
                      <label>Password *</label>
                      <input
                        type="password"
                        id="pass"
                        required
                        name="uPass"
                        onChange={(e) => this.formValueChange(e)}
                      />
                    </div>

                    <button type="submit" className="site-btn login-btn">
                      Sign In
                    </button>
                  </form>
                  {/* <div className="switch-login">
                                    <Link to="/signup" className="or-login">Or Sign Up</Link>
                                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* // ======================================================== */}
        {/* // =============== Register Form Section End  =============== */}
        {/* // ========================================================  */}

        {/* // ======================================================== */}
        {/* // =============== Footer =============== */}
        {/* // ========================================================  */}
      </div>
    );
  }
}

export default connect(null, { setCurrentUser, getCart })(
  withRouter(Adminlogin)
);
