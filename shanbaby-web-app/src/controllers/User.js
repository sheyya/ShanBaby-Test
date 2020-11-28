// user class functions
// import Axios
import Axios from "axios";

// import config
import Config from "./Config";

// import hashmethod
import Crypto from "crypto-js";

// import cookies
import Cookies from "js-cookie";

import C_Config from "../controllers/Config";

class User {
  constructor() {
    // user related apis
    this.api = {
      test: "/api/news/my",
      addUser: "/user/adduser",
      signin: "/user/signin",
      resetPassoword: "/user/reset/user/pw",
      profilepic: "/user/u/pp/up",
      getSpecificUser: "/user/u/my/user",
      chengeusername: "/user/u/my/uname",
      getLstLOgindetails: "/user/get/l/login/user",
      deleteUser: "/user/d/r/ur",
    };
  }
  // ======================================================== ================================================================================================================
  // =============== Sign Up      begins here =============== ================================================================================================================
  // ======================================================== ================================================================================================================
  async Signup(uFname, uLname, uEmail, uPass) {
    var hashedPass = Crypto.SHA256(uPass).toString();
    var createdDateandTime = new Date().toLocaleString();
    var requestData = {
      firstname: uFname,
      lastname: uLname,
      useremail: uEmail,
      password: hashedPass,
      created_at: createdDateandTime,
    };

    var resp = 201;

    console.log("User Details +++++++++++++++++++++++++++++++");
    console.log(requestData);

    await Axios.post(
      `${Config.host}${Config.port}${this.api.addUser}`,
      requestData
    )
      .then((Response) => {
        resp = Response.status;
      })
      .catch((err) => {
        console.error(err);
        try {
          resp = err.response.status;
        } catch (error) {
          resp = 600;
        }
      });

    return resp;
  }
  // ======================================================== ================================================================================================================
  // =============== Sign Up      end    here =============== ================================================================================================================
  // ======================================================== ================================================================================================================

  // ======================================================== ================================================================================================================
  // ===============   Sign In ============================== ================================================================================================================
  // ======================================================== ================================================================================================================
  async userSignIn(email, password, userBrowser) {
    //=============================== hashed user passowrd          start     =====================================
    var hashedPass = Crypto.SHA256(password).toString();

    //=============================== hashed user passowrd          end       =====================================
    //=============================== after get salt and hashed password then user sign request sent start       =====================================
    var requestData = {
      uEmail: email,
      uPass: hashedPass,
      userBrowser: userBrowser,
    };
    console.log("Sign inf dta");
    console.log(requestData);
    var userData = {};
    var resp = 600;
    await Axios.post(
      `${Config.host}${Config.port}${this.api.signin}`,
      requestData
    )
      .then((Response) => {
        resp = Response.status;
        userData = Response.data.userData;
      })
      .catch((err) => {
        console.error(err);
        try {
          console.error(err);
          resp = err.response.status;
        } catch (error) {
          console.log(error);

          resp = 600;
        }
      });

    if (resp === 200) {
      return userData;
    }
    return resp;
  }
  //=============================== after get salt and hashed password then user sign request sent end       =====================================

  // ======================================================= ================================================================================================================
  // ===============   Sign In end here====================== ================================================================================================================
  // ======================================================== ================================================================================================================

  // ======================================================= ================================================================================================================
  // ===============   Reset Password              start here  ===============================================================================================================
  // ======================================================== ================================================================================================================

  async resetPassoword(password, email, token, id) {
    console.log("BEFORE HAS", password);

    var hashedPass = Crypto.SHA256(password).toString();
    // var _id = this.getId()

    var requestData = {
      userEmail: email,
      userId: id,
      newHashedPass: hashedPass,
      token: token,
    };

    var resp = 201;

    await Axios.post(
      `${Config.host}${Config.port}${this.api.resetPassoword}`,
      requestData
    )
      .then((Response) => {
        resp = Response.status;
      })
      .catch((err) => {
        console.error(err);
        try {
          resp = err.response.status;
        } catch (error) {
          resp = 600;
        }
      });

    return resp;
  }

  // ======================================================= ================================================================================================================
  // ===============   Reset Password              end  here  ===============================================================================================================
  // ======================================================== ================================================================================================================

  async getUserLastLoginDetails(email, token) {
    var requestData = {
      uEmail: email,
      token: token,
    };

    var resp = 600;
    var userData = {};

    await Axios.post(
      `${Config.host}${Config.port}${this.api.getLstLOgindetails}`,
      requestData
    )
      .then((Response) => {
        resp = Response.status;
        userData = Response.data;
      })
      .catch((err) => {
        console.error(err);
        try {
          console.error(err);
          resp = err.response.status;
        } catch (error) {
          console.log(error);

          resp = 600;
        }
      });

    if (resp === 200) {
      return userData;
    }
    return resp;
  }

  // ======================================================= ================================================================================================================
  // ===============   set cookies when user login  start here ===============================================================================================================
  // ======================================================== ================================================================================================================

  setCookies(token, fname, lname, email, createdat, lastSignin, id, persist) {
    var secureState = false;
    var sign = true;
    var type = "user";
    if (persist) {
      Cookies.set("cNf", btoa(lname), { expires: 30, secure: secureState });
      Cookies.set("cNl", btoa(fname), { expires: 30, secure: secureState });
      Cookies.set("cM", btoa(email), { expires: 30, secure: secureState });
      Cookies.set("cTok", token, { expires: 30, secure: secureState });
      Cookies.set("cCre", btoa(createdat), {
        expires: 30,
        secure: secureState,
      });
      Cookies.set("cLsi", btoa(lastSignin), {
        expires: 30,
        secure: secureState,
      });
      Cookies.set("cId", btoa(id), { expires: 30, secure: secureState });
      Cookies.set("type", type, { expires: 30, secure: secureState });
      Cookies.set("sin", btoa(sign), { expires: 30, secure: secureState });
    } else {
      Cookies.set("cNf", btoa(lname), { secure: secureState });
      Cookies.set("cNl", btoa(fname), { secure: secureState });
      Cookies.set("cM", btoa(email), { secure: secureState });
      Cookies.set("cTok", token, { secure: secureState });
      Cookies.set("cCre", btoa(createdat), { secure: secureState });
      Cookies.set("cLsi", btoa(lastSignin), { secure: secureState });
      Cookies.set("sin", btoa(sign), { secure: secureState });
      Cookies.set("cId", btoa(id), { secure: secureState });
      Cookies.set("type", type, { secure: secureState });
    }
  }

  // ======================================================= ================================================================================================================
  // ===============   chekc signed in start here               ==============================================================================================================
  // ======================================================== ================================================================================================================
  checkSignedIn() {
    if (
      Cookies.get("cId") === undefined ||
      Cookies.get("cM") === undefined ||
      Cookies.get("sin") === undefined ||
      Cookies.get("cTok") === undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  // ======================================================= ================================================================================================================
  // ===============   chekc signed in end   here               ==============================================================================================================
  // ======================================================== ================================================================================================================

  // ======================================================= ================================================================================================================
  // ===============   sign out        start      ==============================================================================================================
  // ======================================================== ================================================================================================================
  signOut() {
    // C_Config.showAlert("Sucessfully logout")
    Cookies.remove("cId");
    Cookies.remove("cM");
    Cookies.remove("sin");
    Cookies.remove("cTok");
    Cookies.remove("cNf");
    Cookies.remove("cCre");
    Cookies.remove("cNl");
    Cookies.remove("cLsi");
    Cookies.remove("type");
    C_Config.showAlert("Sucessfully logout");

    // window.location.replace("/")
    // setTimeout(() => {
    //     window.location.replace("/");
    // }, 2000)
    // window.location.replace("/");
  }

  // ======================================================= ================================================================================================================
  // ===============   sign out      end        ==============================================================================================================
  // ======================================================== ================================================================================================================

  // ======================================================= ================================================================================================================
  // ===============  get user details from cookies  start here =============================================================================================================
  // ======================================================== ================================================================================================================

  // get token
  getToken() {
    if (Cookies.get("cTok") !== null || Cookies.get("cTok") !== undefined) {
      return Cookies.get("cTok");
    }
    return false;
  }
  // get fname
  getLName() {
    return atob(Cookies.get("cNf"));
  }
  // get lname
  getFName() {
    return atob(Cookies.get("cNl"));
  }
  // get email
  getEmail() {
    if (Cookies.get("cM") !== null || Cookies.get("cM") !== undefined) {
      return atob(Cookies.get("cM"));
    }
    return false;
  }
  // get created at
  getCreateDate() {
    return atob(Cookies.get("cCre"));
  }
  // get last sign in
  getLastSignin() {
    return atob(Cookies.get("cLsi"));
  }
  // get id
  getId() {
    return atob(Cookies.get("cId"));
  }

  // ======================================================= ================================================================================================================
  // ===============  get user details from cookies  end   here =============================================================================================================
  // ======================================================== ================================================================================================================

  // ======================================================= ================================================================================================================
  // ===============   Upload profile picture  ===============================================================================================================
  // ======================================================== ================================================================================================================
  async uploadProfilePic(file, id, email, token) {
    var requestData = new FormData();
    requestData.set("uId", id);
    requestData.set("uEmail", email);
    requestData.set("token", token);
    requestData.append("photos", file);

    var resp = 500;

    //   await  console.log(requestData.get('photos'));

    await Axios.post(
      `${Config.host}${Config.port}${this.api.profilepic}`,
      requestData
    )
      .then((Response) => {
        resp = Response.status;
      })
      .catch((err) => {
        console.error(err);

        try {
          resp = err.response.status;
        } catch (error) {
          resp = 600;
        }
      });

    console.log(resp);

    return resp;
  }

  // ======================================================= ================================================================================================================
  // ===============  get specific user  ===============================================================================================================
  // ======================================================== ================================================================================================================

  async getSpecificUser(email, token) {
    var requestData = {
      uEmail: email,
      token: token,
    };
    var resp = 500;
    var userData = {};
    //   await  console.log(requestData.get('photos'));

    await Axios.post(
      `${Config.host}${Config.port}${this.api.getSpecificUser}`,
      requestData
    )
      .then((Response) => {
        resp = Response.status;
        userData = Response.data;
      })
      .catch((err) => {
        console.error(err);

        try {
          resp = err.response.status;
        } catch (error) {
          resp = 600;
        }
      });

    console.log(resp);

    var user = {
      res: resp,
      data: userData,
    };

    return user;
  }
  // ======================================================= ================================================================================================================
  // ===============  change user name      ===============================================================================================================
  // ======================================================== ================================================================================================================

  async changeUsernameFunction(fname, lname, email, token) {
    var requestData = {
      fname: fname,
      lname: lname,
      uEmail: email,
      token: token,
    };

    var resp = 500;

    await Axios.post(
      `${Config.host}${Config.port}${this.api.chengeusername}`,
      requestData
    )
      .then((Response) => {
        resp = Response.status;
      })
      .catch((err) => {
        console.error(err);

        try {
          resp = err.response.status;
        } catch (error) {
          resp = 600;
        }
      });

    console.log(resp);

    return resp;
  }
  // ======================================================= ================================================================================================================
  // ===============  delete user     ===============================================================================================================
  // ======================================================== ================================================================================================================

  async deleteUserFunction(email, passowrd, token) {
    var requestData_salt = {
      uEmail: email,
    };
    var resp = 600;
    var userSalt = "";
    await Axios.post(`${Config.host}${Config.port}`, requestData_salt)
      .then((Response) => {
        resp = Response.status;
        userSalt = Response.data._user_salt;
      })
      .catch((err) => {
        console.error(err);
        try {
          resp = err.response.status;
        } catch (error) {
          resp = 600;
        }
      });

    if (resp !== 200) {
      return resp;
    }
    //=============================== first get slat for specific user end    =====================================
    //=============================== hashed user passowrd          start     =====================================
    var hashedPass = Crypto.SHA256(passowrd).toString();

    var requestData2 = {
      uEmail: email,
      uPass: hashedPass,
      token: token,
    };

    resp = 500;

    await Axios.post(
      `${Config.host}${Config.port}${this.api.deleteUser}`,
      requestData2
    )
      .then((Response) => {
        resp = Response.status;
      })
      .catch((err) => {
        console.error(err);

        try {
          resp = err.response.status;
        } catch (error) {
          resp = 600;
        }
      });

    return resp;
  }
}
var UserObject = new User();
export default UserObject;
