/*  eslint-disable */
import React, { Component } from "react";
import { getOrderById } from "../../controllers/Order";
import { updateOrder } from "../../controllers/Order";
import { deleteOrder } from "../../controllers/Order";
import { addDelivery } from "../../controllers/Delivery";
import Config from "../../controllers/Config";
import AdminSidebar from "../../components/AdminSidebar";
import { bool } from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

export class MoreDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {},
      id: props.match.params.id,
      loading: true,
      errors: {},
      amount: "",
      deliveryAddress: "",
      userId: "",
      date: Date,
      products: [],
      deleteRequest: bool,
      shipped: false,
      addressLine1: "",
      addressLine2: "",
      postalCode: "",
      province: "",
      method: "",
      trackinginfo: "",
      recived: false,
    };
  }

  componentDidMount() {
    this.loadOrder();
  }

  loadOrder = () => {
    getOrderById(this.state.id)
      .then((result) => {
        console.log("Result in load order: ", result);
        this.setState({
          order: result,
          deliveryAddress: result.deliveryAddress,
          amount: result.amount,
          date: new Date(result.date),
          products: result.products,
          deleteRequest: result.deleteRequest,
          userId: result.userId,
          userName: result.userName,
          shipped: result.shipped,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  formValueChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = async (e) => {
    e.preventDefault();

    console.log(this.state.id);
    console.log(this.state.deliveryAddress);
    console.log(this.state.id);
    console.log(this.state.method);
    console.log(this.state.trackinginfo);
    console.log(this.state.trackinginfo);

    console.log("Order ID: ", this.state.id);
    if (this.validate()) {
      const res = await updateOrder({
        id: this.state.id,
        deliveryAddress: this.state.deliveryAddress,
        shipped: true,
        u_id: this.state.id,
        method: this.state.method,
        trackinginfo: this.state.trackinginfo,
        recieved: this.state.recived,
        products: this.state.products,
      });
      console.log(res);
      if (res.code == 200) {
        Config.setToast(" Order updated Successfully");
        this.props.history.push("/admin/delivery");
      } else {
        Config.setErrorToast("Somthing Went Wrong!");
      }

      // .then((result) => {
      //   console.log("Delivery Details", result);
      //   Config.setToast(" Order updated Successfully");
      //   this.props.history.push("/admin/delivery");
      // })

      // .then((result) => {
      //   console.log(result);
      //   addDelivery({
      //     id: this.state.id,
      //     method: this.state.method,
      //     trackinginfo: this.state.trackinginfo,
      //     recived: this.state.trackinginfo,
      //   }).then((result) => {

      // })
      // .catch((err) => {
      //   console.log(err);
      //   Config.setErrorToast("Somthing Went Wrong!");
      // });
    }
  };

  onDeleteClick = (e) => {
    e.preventDefault();

    deleteOrder(this.state.id, this.props.auth.user.token)
      .then((result) => {
        Config.setToast(" Order Deleted Successfully");
        this.props.history.push("/admin/orders");
      })
      .catch((err) => {
        console.log(err);
        Config.setErrorToast("Somthing Went Wrong!");
      });
  };

  // onShip = (e) => {
  //   e.preventDefault();
  //   this.setState = { shipped: true };
  // };

  render() {
    const {
      amount,
      deliveryAddress,
      userId,
      userName,
      date,
      products,
      shipped,
      deleteRequest,
      method,
      trackinginfo,
      recived,
    } = this.state;

    return (
      <div className="bg-light wd-wrapper">
        <AdminSidebar active={"orders"} />
        <div className="wrapper-wx">
          <div className="container-fluid">
            <div className="row">
              <div className="col-8">
                <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                  Order Details{" "}
                  {!deleteRequest ? null : (
                    <span className="badge badge-danger">
                      User has requested to cansel this order
                    </span>
                  )}
                </h5>
                {console.log("Products list: ", products)}

                <form
                  className=" py-2  px-3"
                  method="POST"
                  onSubmit={(e) => this.onFormSubmit(e)}
                >
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="form-label py-2">Order Amount</h6>
                      <input
                        type="text"
                        name="amount"
                        value={amount}
                        onChange={(e) => this.formValueChange(e)}
                        placeholder="Amount"
                        className="form-control"
                        readOnly
                      />
                    </div>

                    <div className="col-md-6">
                      <h6 className="form-label py-2">User Name</h6>
                      <input
                        type="text"
                        name="username"
                        value={userName}
                        onChange={(e) => this.formValueChange(e)}
                        placeholder="User Name"
                        className="form-control"
                        readOnly
                      />
                    </div>

                    <div className="col-md-12">
                      <h6 className="form-label py-2">Delivery Address</h6>
                      <input
                        type="text"
                        name="deliveryAddress"
                        value={deliveryAddress}
                        onChange={(e) => this.formValueChange(e)}
                        placeholder="Address Line one"
                        className="form-control"
                      />
                    </div>

                    <div className="col-md-12">
                      <h6 className="form-label py-2">Delivery Method</h6>
                      <select
                        className="form-control"
                        value={method}
                        name="method"
                        onChange={(e) => this.formValueChange(e)}
                      >
                        <option selected>Select Method</option>
                        <option value="Pronto">Pronto</option>
                        <option value="Koombiyo">Koombiyo</option>
                        <option value="Domex">Domex</option>
                        <option value="City Pack">City Pack</option>
                      </select>
                    </div>

                    <div className="col-md-12 mb-4">
                      <h6 className="form-label py-2">Tracking Info</h6>
                      <input
                        type="text"
                        name="trackinginfo"
                        value={trackinginfo}
                        onChange={(e) => this.formValueChange(e)}
                        placeholder="Insert Tracking Number"
                        className="form-control"
                      />
                    </div>

                    <div className="col-md-12 mb-2">
                      <h6 className="form-label py-2">Order</h6>
                      {products.map((item) => this.renderOrder(item))}
                    </div>

                    <div className="col-md-12 mt-2">
                      <div className="d-flex">
                        <button
                          className="px-4 btn btn-dark  btn-sm bold-normal"
                          type="submit"
                        >
                          Ship
                        </button>
                        {console.log("Is delete request: ", deleteRequest)}
                        {!deleteRequest ? null : (
                          <button
                            className="px-4 btn btn-danger btn-sm bold-normal ml-4"
                            onClick={(e) => this.onDeleteClick(e)}
                          >
                            Delete{" "}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderOrder = (item) => {
    return (
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Code: {item.id}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Price: {item.price}</h6>
          <h6 className="card-subtitle mb-2 text-muted">
            Quantity: {item.quantity}
          </h6>
          <h6 className="card-subtitle mb-2 text-muted">
            Color: {item.selected_color}
          </h6>
          <h6 className="card-subtitle mb-2 text-muted">
            Size: {item.selected_size}
          </h6>
        </div>
      </div>
    );
  };

  validate = () => {
    console.log("validate submision");

    let { errors, deliveryAddress } = this.state;
    let count = 0;

    if (deliveryAddress.length == 0) {
      errors.deliveryAddress = "Address can not be empty";
      count++;
    } else {
      errors.deliveryAddress = "";
    }

    this.setState({ errors });
    return count == 0;
  };
}
const mapStateToProps = (state) => ({
  auth: state.auth || {},
});

export default connect(mapStateToProps)(withRouter(MoreDetails));
