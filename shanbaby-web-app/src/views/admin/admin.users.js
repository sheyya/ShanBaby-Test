/*  eslint-disable */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
// import config
import C_Config from "../../controllers/Config";
import AdminSidebar from "../../components/AdminSidebar";
import "../../asserts/commoncss/sidebar.css";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { getAllCategories } from "../../controllers/Category";
import Config from "../../controllers/Config";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenAlt,
  faEye,
  faEnvelope,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import U_User from "../../controllers/User";
import Uniqid from "uniqid";
import A_Admin from "../../controllers/Admin";
import image from "../../asserts/Images/user.png";
import { Line as LineChart, Bar, Doughnut } from "react-chartjs-2";
import { connect } from "react-redux";

class AdminManagers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserModal: false,
      addManagerState: false,
      fname: "",
      lname: "",
      email: "",
      users: [],
      managersState: 0,
      viewUser: "",
      browsers: [],
      lastLogins: [],
      statsBrowser: [],
      statYears: [],
      Yyears: [],
      Yuser: [],
      monthBaseUsers: [],
      monthBaseMonths: [],
      userUsage: [],
      MonthBasedYear: "2020",
      data_labels: [],
      data_value: [],
      data_browsers: [],
      data_brow_values: [],
    };
  }

  //sentMonth wise usge
  sentMonthwiseusge = async () => {
    console.log(this.state.monthBaseUsers);

    var monthandusers = this.state.monthBaseUsers;
    var months = [];
    var user = [];
    //  var year = monthandusers[0].year
    console.log(monthandusers);
    for (var i = 0; i < monthandusers.length; i++) {
      months[i] = monthandusers[i].month;
      user[i] = monthandusers[i].usersCount;
    }

    await this.setState({
      monthBaseMonths: months,
      userUsage: user,
      MonthBasedYear: "2020",
    });

    // console.log(this.state.monthBaseMonths)
    // console.log(this.state.userUsage)
  };

  // get users from monthbase use

  setMonthBasedUsers = () => {
    return new Promise((resolve, reject) => {
      return A_Admin.getUsageOfMonthBased(
        this.props.auth.user.token,
        this.props.auth.user
      )
        .then((result) => {
          resolve({ code: 200, data: result.data });
          console.log(
            "++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
          );
          console.log(result.data);
          console.log(
            "++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
          );

          //
          console.log(result);

          this.setState({
            data_labels: result.data.data.data_labels,
            data_value: result.data.data.data_values,
            monthBaseUsers: result.data.monthBasedUser,
          });

          console.log("Labls", this.state.data_labels);
          console.log(this.state.data_value);
        })
        .catch((err) => {
          reject({ code: 0, error: err });
        });
    });
  };

  // set users from year

  setUsersfromyear = async () => {
    var ss = await this.state.statYears;
    var years = [];
    var user = [];
    for (var i = 0; i < ss.length; i++) {
      years[i] = await ss[i].year;
      user[i] = await ss[i].usersCount;
    }

    await this.setState({
      Yyears: years.reverse(),
      Yuser: user.reverse(),
    });
  };

  // get user stats
  getAllUsersStats = () => {
    return new Promise((resolve, reject) => {
      return A_Admin.getUserStats(
        this.props.auth.user.token,
        this.props.auth.user.type
      )
        .then((result) => {
          resolve({ code: 200, data: result.data });
          // console.log(result.data);

          this.setState({
            statsBrowser: result.data.senDetails.browser,
            statYears: result.data.senDetails.userInYear,
          });
        })
        .catch((err) => {
          reject({ code: 0, error: err });
        });
    });
  };

  // get user details
  getAllUsers = () => {
    return new Promise((resolve, reject) => {
      return A_Admin.getAllUsersAdmin(
        this.props.auth.user.token,
        this.props.auth.user.type
      )
        .then((result) => {
          resolve({ code: 200, data: result.data });
          console.log("dsdsdsD", result);

          this.setState({
            users: result.data.users,
          });
        })
        .catch((err) => {
          reject({ code: 0, error: err });
        });
    });
  };

  // get browser details
  getBrowsers = () => {
    return new Promise((resolve, reject) => {
      return A_Admin.getUsersBrowsers(
        this.props.auth.user.token,
        this.props.auth.user.type
      )
        .then((result) => {
          resolve({ code: 200, data: result.data });
          console.log(result.data);

          // console.log(result.data);

          this.setState({
            data_browsers: result.data.data.data_browsers,
            data_brow_values: result.data.data.data_brow_values,
          });

          // console.log(this.state.data_browsers);
          // console.log(this.state.data_brow_values);
        })
        .catch((err) => {
          reject({ code: 0, error: err });
        });
    });
  };
  // get lastlogin  details
  getLastLogins = () => {
    return new Promise((resolve, reject) => {
      return A_Admin.getUserLastLogin(
        this.props.auth.user.token,
        this.props.auth.user.type
      )
        .then((result) => {
          resolve({ code: 200, data: result.data });
          // console.log(result.data);

          this.setState({
            lastLogins: result.data.lastlogins,
          });
        })
        .catch((err) => {
          reject({ code: 0, error: err });
        });
    });
  };

  async componentWillMount() {
    await this.getSignInStatus();
    await this.setMonthBasedUsers();
    await this.getAllUsers();
    await this.getBrowsers();
    await this.getLastLogins();
    await this.getAllUsersStats();
    // await this.sentMonthwiseusge()
    await this.setUsersfromyear();
  }

  // checksignIn
  async getSignInStatus() {
    if (this.props.auth.isAuthenticated == false) {
      this.props.history.push("/admin");
    }
  }

  // -------------------------------------------------------------- user functions ------------------------
  // view user modal
  async showViewUser(i) {
    var singleUser = this.state.users.filter((user) => user._id == i);
    await this.setState({
      showUserModal: true,
      viewUser: singleUser[0],
    });
    // console.log(this.state.viewUser);
  }
  render() {
    const {
      users,
      fname,
      lname,
      email,
      viewUser,
      statsBrowser,
      statYears,
      Yyears,
      Yuser,
      userUsage,
      MonthBasedYear,
    } = this.state;
    console.log(Yuser);
    console.log(this.state.data_labels);

    return (
      <div className="bg-light wd-wrapper">
        <AdminSidebar active={"users"} />
        <div className="wrapper-wx">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                  User Managment
                  {/*<span className="badge badge-success mx-2  " onClick={() => this.setUsersfromyear()}>Add Manager</span>*/}
                </h5>
              </div>
              <div
                className="col-12"
                style={{
                  display:
                    this.state.addManagerState == true ? "none" : "block",
                }}
              >
                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                  <div className="row m-1 p-1"></div>
                </div>
                {/* charts --------------- */}
                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                  <div className="row">
                    <div className="col-md-12 ">
                      <div className="campaign ct-charts px-3">
                        <h6 className="mt-2 mb-3">User Sessions in 2020</h6>
                        <LineChart
                          data={{
                            labels: this.state.data_labels,
                            datasets: [
                              {
                                label: "Users",
                                backgroundColor: "rgba(26, 188, 156,0.5)",
                                borderColor: "rgba(39, 174, 96,0.4)",
                                data: this.state.data_value,
                              },
                            ],
                          }}
                          options={options2}
                          width="600"
                          height="220"
                        />
                      </div>
                    </div>

                    <div className="col-md-6 mt-3">
                      <div className="campaign ct-charts px-3">
                        <h6 className="mt-2 mb-3">
                          User Registration in past years
                        </h6>
                        <Bar
                          data={{
                            labels: Yyears,
                            datasets: [
                              {
                                label: "Users",
                                backgroundColor: "rgba(220, 231, 117,0.5)",
                                borderColor: "rgba(220, 231, 117,1.0)",
                                borderWidth: 1,
                                hoverBackgroundColor: "rgba(220, 231, 117,0.4)",
                                hoverBorderColor: "rgba(220, 231, 117,1)",
                                data: Yuser,
                              },
                            ],
                          }}
                          options={options1}
                          width="600"
                          height="220"
                        />
                      </div>
                    </div>
                    <div className="col-md-6  mt-3">
                      <div className="campaign ct-charts px-3">
                        <h6 className="mt-2 mb-3">User Browsers in 2020 </h6>

                        <Doughnut
                          data={{
                            labels: this.state.data_browsers,
                            datasets: [
                              {
                                label: "Users",
                                backgroundColor: [
                                  "#4FC3F7",
                                  "rgba(161, 136, 127,1.0)",
                                  "rgba(144, 164, 174,1.0)",
                                  "rgba(121, 134, 203,1.0)",
                                  "rgba(255, 138, 101,1.0)",
                                ],
                                hoverBackgroundColor: [
                                  "#4FC3F7",
                                  "rgba(161, 136, 127,1.0)",
                                  "rgba(144, 164, 174,1.0)",
                                  "rgba(121, 134, 203,1.0)",
                                  "rgba(255, 138, 101,1.0)",
                                ],
                                data: this.state.data_brow_values,
                              },
                            ],
                          }}
                          width="600"
                          height="220"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ----------------------------------------------------------- */}
              <div className="col-12">
                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                  <h5 className="text-dark bold-normal py-2 bg-white px-2">
                    All Users
                  </h5>
                  <div className="table-responsive px-2">
                    <table className="table table-stripped">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Join Date</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((item) => this.displayAllUsers(item))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*======================================*/}
        {/*=============== View User===============*/}
        {/*======================================*/}
        <Modal
          size="lg"
          show={this.state.showUserModal}
          centered
          onHide={() => this.setState({ showUserModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>View User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-4">
                <div className="IS_UI_profilePic">
                  <div className="profilePicture">
                    <img
                      src={
                        viewUser.profilepic == undefined ||
                        viewUser.profilepic == null
                          ? image
                          : `${C_Config.host}${C_Config.port}/${viewUser.profilepic}`
                      }
                      alt="lucidex user"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-12">
                    <h5 className="card-title">
                      {" "}
                      <b>Details </b>
                    </h5>
                  </div>
                  <div className="col-md-5">
                    <p>
                      <b>Name : </b> {viewUser.fname} &nbsp; {viewUser.lname}
                    </p>
                  </div>

                  <div className="col-md-7">
                    {" "}
                    <p>
                      <b>Email : </b> {viewUser.email}
                    </p>
                  </div>

                  <div className="col-md-12">
                    <p>
                      <b>Created At : </b> {viewUser.created_at}{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <center>
                  <a
                    className="btn btn-info btn-sm px-2 mr-2 mt-1"
                    href={`mailto:${viewUser.email}`}
                  >
                    <FontAwesomeIcon icon={faEnvelope} /> Send Email
                  </a>
                </center>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }

  displayAllUsers = (item) => {
    return (
      <tr key={item._id}>
        <td>
          <b>
            {item.fname} {item.lname}
          </b>
        </td>
        <td>{item.email}</td>
        <td>{moment(new Date(item.created_at)).format("YYYY MMM DD")}</td>
        <td>
          <button
            className="btn btn-success btn-sm px-2 mr-2 mt-1"
            onClick={() => this.showViewUser(item._id)}
          >
            <FontAwesomeIcon icon={faEye} /> View
          </button>
        </td>
      </tr>
    );
  };
}

const options1 = {
  scaleShowGridLines: false,
  scaleGridLineColor: "rgba(0,0,0,.05)",
  scaleGridLineWidth: 0,
  scaleShowHorizontalLines: true,
  scaleShowVerticalLines: true,
  bezierCurve: true,
  bezierCurveTension: 0.4,
  pointDot: true,
  pointDotRadius: 4,
  pointDotStrokeWidth: 1,
  pointHitDetectionRadius: 20,
  datasetStroke: true,
  datasetStrokeWidth: 2,
  datasetFill: true,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
  },
};
const options2 = {
  fill: false,
  lineTension: 0.1,
  backgroundColor: "rgba(75,192,192,0.4)",
  borderColor: "rgba(75,192,192,1)",
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: "miter",
  pointBorderColor: "rgba(75,192,192,1)",
  pointBackgroundColor: "#fff",
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: "rgba(75,192,192,1)",
  pointHoverBorderColor: "rgba(220,220,220,1)",
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
  },
};

const mapStateToProps = (state) => ({
  auth: state.auth || {},
});

export default connect(mapStateToProps)(AdminManagers);
