/*  eslint-disable */
import React, { Component } from "react";
import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";
import Config from "../../controllers/Config";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { string, func } from "prop-types";
import AdminSidebar from "../../components/AdminSidebar";
import moment from "moment";
import { getAllOrders } from "../../controllers/Order";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

class allOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      orders: [],
    };
  }

  componentDidMount() {
    this.loadOrders();
  }

  loadOrders = () => {
    getAllOrders()
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

    let ShippedOrders = reversedOrders.filter((ord) => {
      return ord.shipped == true;
    });

    let CurrentOrders = reversedOrders.filter((ord) => {
      return ord.shipped == false;
    });

    //location.reload();
    //console.log("Shipped Orders: ", ShippedOrders);
    return (
      <div className="bg-light wd-wrapper">
        <AdminSidebar active={"orders"} />
        <div className="wrapper-wx">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                  Orders
                </h5>

                {/* ----------------------------------------------------------- */}
                <div className="col-12 px-0">
                  <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                    <div className="row m-1 p-1">
                      <button
                        className="btn btn-success btn-sm px-2 mr-2 mt-1"
                        onClick={() => this.downloadAllProducts()}
                      >
                        <FontAwesomeIcon icon={faDownload} /> Download Report
                      </button>
                      <DateRangePicker
                        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) =>
                          this.setState({ startDate, endDate })
                        } // PropTypes.func.isRequired,
                        focusedInput={this.state.focused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={(focusedInput) =>
                          this.setState({ focused: focusedInput })
                        }
                        isOutsideRange={() => false}
                        showClearDates={true} // PropTypes.func.isRequired,
                      />
                    </div>
                  </div>
                  <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                    <h5 className="text-dark bold-normal py-2 bg-white px-2">
                      Current Orders
                    </h5>
                    <div className="table-responsive px-2">
                      <table className="table table-stripped">
                        <thead>
                          <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Amount</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {CurrentOrders.map((item) =>
                            this.renderOrdersTable(item)
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderOrdersTable = (item) => {
    return (
      <tr key={item._id} style={this.getStyle(item)}>
        <td>
          <b>{moment(new Date(item.date)).format("DD , MMM YYYY")}</b>
        </td>
        <td>
          <h6 className="form-label">LKR {item.amount}</h6>
        </td>
        <td>{item.userName}</td>
        <td>{item.deliveryAddress}</td>
        <td>
          <button
            className="btn btn-dark btn-sm px-2 mr-2"
            onClick={() => this.onClickView(item)}
          >
            More Details
          </button>
        </td>
      </tr>
    );
  };

  downloadAllProducts = () => {
    const { orders } = this.state;
    let reversedOrders = orders.reverse();

    let CurrentOrders = reversedOrders.filter((ord) => {
      return ord.shipped == false;
    });

    if (this.state.startDate == null || this.state.endDate == null) {
      alert("Select Date Range Please!");
    } else {
      let data = [];
      let count = 1;
      let col = [
          { dataKey: "count", header: "Count" },
          { dataKey: "cdate", header: "Date" },
          { dataKey: "userName", header: "User Name" },
          { dataKey: "amount", header: "Amount" },
          { dataKey: "address", header: "Address" },
        ],
        doc = new jsPDF();
      doc.page = 1;
      let sdate = moment(new Date(this.state.startDate)).format("YYYY MMM DD");
      let edate = moment(new Date(this.state.endDate)).format("YYYY MMM DD");
      var header = function () {
        var imgData =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMUAAAA2CAYAAAB3Pl1HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ2MCwgMjAyMC8wNS8xMi0xNjowNDoxNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDczMjhGQjlGRjU3MTFFQThDQTBBMkI3NzM5N0Y1MTIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDczMjhGQjhGRjU3MTFFQThDQTBBMkI3NzM5N0Y1MTIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjEgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODQwMTk3Mjc3NTFGMTFFQUE3REZFODQ0MUZGQ0JGNTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODQwMTk3Mjg3NTFGMTFFQUE3REZFODQ0MUZGQ0JGNTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6TZZQMAAAeoklEQVR42uxdWYwc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";

        // doc.fontStyle("normal");

        // move_from_left, move_from_height, width, height
        doc.addImage(imgData, "JPEG", 85, 10, 43, 12);

        doc.setFontSize(13.5);
        // doc.fontStyle("bold");

        // move_from_left, move_from_height
        doc.text(92, 35, "Product Report");
        doc.setFontSize(12);
        doc.text(80, 40, sdate + " - " + edate);
      };

      var options = {
        beforePageContent: header,

        theme: "striped",
        columnStyles: {
          count: { columnWidth: 20 },
          cdate: { columnWidth: 30 },
          userName: { columnWidth: 30 },
          amount: { columnWidth: 30 },
          address: { columnWidth: 70 },
        },

        headStyles: { fillColor: "white", textColor: "black" },
        style: { cellWidth: "auto" },
        margin: { top: 50 },
      };
      // Data Processing
      CurrentOrders.map((item) => {
        let b = {
          count: count,
          cdate: moment(new Date(item.date)).format("YYYY MMM DD"),
          userName: item.userName,
          amount: item.amount,
          address: item.deliveryAddress,
        };
        console.log(b);
        var bool1 = moment(new Date(item.date)).isAfter(this.state.startDate);
        var bool2 = moment(new Date(item.date)).isBefore(this.state.endDate);

        console.log(bool1);
        console.log(bool2);
        if (bool1 && bool2) {
          data.push(b);
        }

        count++;
      });

      doc.setFontSize(12);
      // doc.line(0, 145, width, 145);

      doc.autoTable(col, data, options);

      doc.save("ProductReport.pdf");
    }
  };

  onClickView = (item) => {
    this.props.history.push(`/admin/orders/getOrder/${item._id}`);
  };
}

export default withRouter(allOrders);
