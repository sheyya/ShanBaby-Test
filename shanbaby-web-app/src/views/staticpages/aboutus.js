/*  eslint-disable */
import React, { Component } from "react";
//import navbar
import MainNavbar from "../../components/MainNavbar";
// import footer
import Footer from "../../components/Footer";
import "./common.css";
// import how from '../../Images/howrelax1.png'

import newimg from "../../asserts/Images/newnew.png";
import MainSlider from "../../components/MainSlider";

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="wrapper">
        <MainNavbar
          active="aboutus"
          isAuthed={this.props.isAuthed}
        ></MainNavbar>

        <div className="container">
          <div className="row Abou_Div py-5">
            <div className="col-md-12 mt-3">
              <h5 className="bold-normal text-dark">About US</h5>
            </div>
            <div className="col-md-6">
              <p style={{ lineHeight: "30px" }}>
                The mixture of cute, high quality and contemporary clothing for
                kids has made ShanBaby Products a stunning online children
                clothing shop.
                <br />
                Our store offers super cute apparel to boys, girls and baby who
                value versatility, style, and comfort. <br />
                We have both kiddie girls and boys clothing to fit all budgets
                while maintaining quality.
                <br />
                You are always wholeheartedly welcome at our site. Whether you
                need assistance in finding a special look or you just want to
                browse on your own, we aim to make you look and feel good.
                <br />
                Whether searching for the perfect clothes ShanBaby Products has
                what you're looking for. <br />
                <b>
                  Sincerely, <br />
                  ShanBaby Products
                </b>
              </p>
            </div>
            <div className="col-md-6">
              {/* <MainSlider></MainSlider> */}
              <div className="row">
                {/* <div className="col-4  mt-3 mb-3 "  >
                                    <img src="https://res.cloudinary.com/dxqwnvudu/image/upload/v1587120985/FashionStore/emailtemplateImages/mains/offer01_nbnk2v.png" alt="" />
                                </div> */}
                {/* <div className="col-4 mt-3 mb-3   "  >
                                    <img src="https://res.cloudinary.com/dxqwnvudu/image/upload/v1587120969/FashionStore/emailtemplateImages/mains/offer03_b4nq9n.png"  alt="" />
                                </div> */}
                <div className="col-4 mt-3 mb-3   ">
                  <img
                    src="https://res.cloudinary.com/dxqwnvudu/image/upload/v1587120874/FashionStore/emailtemplateImages/products/women-large_sszx5b.jpg"
                    alt=""
                  />
                </div>
                <div className="col-4 mt-3 mb-3   ">
                  <img
                    src="https://res.cloudinary.com/dxqwnvudu/image/upload/v1587120876/FashionStore/emailtemplateImages/products/man-large_ke7igc.jpg"
                    alt=""
                  />
                </div>
                {/* <div className="col-4 mt-3 mb-3   "  >
                                    <img src="https://res.cloudinary.com/dxqwnvudu/image/upload/v1587120874/FashionStore/emailtemplateImages/products/women-2_cnyyq9.jpg"  alt="" />
                                </div> */}
                <div className="col-4 mt-3 mb-3   ">
                  <img
                    src="https://res.cloudinary.com/dxqwnvudu/image/upload/v1587120978/FashionStore/emailtemplateImages/mains/offer02c_k5sojh.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              {/* <img  src={newimg} className="img-fluid"/>
                        <img  src={newimg} className="img-fluid"/> */}
            </div>
          </div>
        </div>

        {/* // ======================================================== */}
        {/* // =============== Footer =============== */}
        {/* // ========================================================  */}
        <Footer></Footer>
      </div>
    );
  }
}

export default AboutUs;
