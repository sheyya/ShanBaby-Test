import React, { Component } from "react";

import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";

import OnImg from "../../asserts/Images/online.png";

class Online extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    console.log(this.props);
  }

  render() {
    console.log("testttttttt", this.props.location.total);

    return (
      <div className="wrapper">
        <MainNavbar></MainNavbar>
        <div className="container-fluid px-5">
          <div className="row">
            <div className="col-md-12">
              <center>
                <img src={OnImg} alt="Order Success" className="w-50 p-3" />
              </center>
            </div>
          </div>
        </div>
        <Footer className="mt-10"></Footer>
      </div>
    );
  }
}

export default Online;
