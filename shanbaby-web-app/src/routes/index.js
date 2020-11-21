import Home from "../views/home";

import Category from "../views/products/category";

import searchProduct from "../views/products/searchProduct";

// import SignUp
import SignUp from "../views/signup/signUp";

// import sign in
import SignIn from "../views/signin/signIn";

// admin components
import AdminLogin from "../views/admin/adminlogin";

//single product page
import SingleProduct from "../views/products/singleProduct";

import AboutUs from "../views/staticpages/aboutus";

import ContactUs from "../views/staticpages/contactus";

import Boys from "../views/genderfilter/Boys";

import Girls from "../views/genderfilter/Girls";

let indexRoutes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    exact: true,
  },

  // sign up route
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    exact: true,
  },
  // sign in route
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
    exact: true,
  },
  {
    path: "/admin",
    name: "Adminlogin",
    component: AdminLogin,
    exact: true,
  },
  {
    path: "/contactus",
    name: "Contact_Us",
    component: ContactUs,
    exact: true,
  },
  {
    path: "/aboutus",
    name: "AboutUs",
    component: AboutUs,
    exact: true,
  },
  {
    path: "/girls",
    name: "Girls",
    component: Girls,
    exact: true,
  },
  {
    path: "/boys",
    name: "Boys",
    component: Boys,
    exact: true,
  },
  // {
  //   path: "/pp",
  //   name: "PP",
  //   component: PP,
  //   exact: true,
  // },
  // {
  //   path: "/tos",
  //   name: "TOS",
  //   component: TOS,
  //   exact: true,
  // },
  {
    path: "/categories/:id",
    name: "Category",
    component: Category,
    exact: true,
  },
  {
    path: "/search/:search",
    name: "Search",
    component: searchProduct,
    exact: true,
  },
  {
    path: "/product/:id",
    name: "Product",
    component: SingleProduct,
    exact: true,
  },

  {
    path: "/*",
    name: "SignIn",
    component: SignIn,
  },
];

export default indexRoutes;
