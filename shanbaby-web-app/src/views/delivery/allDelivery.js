import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import moment from "moment";
import {
  markRecevied,
  getAllOrdersWithDelivery,
} from "../../controllers/Delivery";

class allDelivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      orders: [],
    };
  }

  componentDidMount() {
    this.loadDelivery();
  }

  loadDelivery = () => {
    getAllOrdersWithDelivery()
      .then((result) => {
        console.log(result);
        this.setState({ orders: result });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getStyle = (item) => {
    console.log("Get Style: ", item.deleteRequest);
    return {
      backgroundColor: item.deleteRequest ? "#ffa1a1" : "#FFFFFF",
    };
  };

  render() {
    const { orders } = this.state;
    let reversedOrders = orders.reverse();

    let ShippedOrders = reversedOrders.filter((ord) => !ord.recieved);
    let DeliveredOrders = reversedOrders.filter((ord) => ord.recieved);

    return (
      <div className="bg-light wd-wrapper">
        <AdminSidebar active={"orders"} />
        <div className="wrapper-wx">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                  Deliveries
                </h5>
                {/* -------------------------------------------------- */}
                <div className="col-12 px-0">
                  <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                    <h6 className="text-dark bold-normal py-2 bg-white px-2">
                      Shipped Orders
                    </h6>
                    <div className="table-responsive px-2">
                      <table className="table table-stripped">
                        <thead>
                          <tr>
                            <th scope="col">Date</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Address</th>
                            <th scope="col">Method</th>
                            <th scope="col">Tracking No</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ShippedOrders.map((item) =>
                            this.renderOrdersTable(item)
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* -------------------------------------------------- */}
                <div className="col-12 px-0">
                  <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                    <h6 className="text-dark bold-normal py-2 bg-white px-2">
                      Delivered Orders
                    </h6>
                    <div className="table-responsive px-2">
                      <table className="table table-stripped">
                        <thead>
                          <tr>
                            <th scope="col">Date</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Address</th>
                            <th scope="col">Method</th>
                            <th scope="col">Tracking No</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {DeliveredOrders.map((item) =>
                            this.renderOrdersTable(item)
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* ----------------------------------------------------- */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  updateReceived = (item) => {
    markRecevied({ id: item._id })
      .then((result) => {
        this.loadDelivery();
      })
      .catch((err) => {});
  };

  renderOrdersTable = (item) => {
    return (
      <tr key={item._id} style={this.getStyle(item.order_details)}>
        <td>
          <b>
            {moment(new Date(item.order_details.date)).format("DD , MMM YYYY")}
          </b>
        </td>
        <td>
          <h6 className="form-label mt-1">LKR {item.order_details.amount}</h6>
        </td>
        <td>{item.order_details.userName}</td>
        <td>{item.order_details.deliveryAddress}</td>
        <td>{item.deliveryMethod}</td>
        <td>{item.TrackingInfo}</td>
        <td>
          {!item.recieved ? (
            <button
              className="btn btn-light btn-sm px-2 mr-2 btn-outline-dark"
              onClick={() => this.updateReceived(item)}
            >
              Mark Delivered
            </button>
          ) : (
            <span className="bg-success text-white px-2 py-1 rounded">
              Delivered
            </span>
          )}
        </td>
      </tr>
    );
  };
}
export default withRouter(allDelivery);
