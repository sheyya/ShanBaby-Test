import AllUsers from "../views/allusers/allusers";

import AdminCategory from "../views/admin/admin.category";
import AddProducts from "../views/admin/admin.add.products";
import AllProducts from "../views/admin/admin.products";
import Dashboard from "../views/admin/admin.dashboard";
import Orders from "../views/orders/allOrders";
import getOrders from "../views/orders/moreDetails";
import updateProduct from "../views/admin/admin.update.products";
import Delivery from "../views/delivery/allDelivery";

import UserManagment from "../views/admin/admin.users";

let adminRoutes = [
  {
    path: "/all",
    name: "AllUsers",
    component: AllUsers,
    exact: true,
  },
  {
    path: "/admin/dashboard",
    name: "/admin/dashboard",
    component: Dashboard,
    exact: true,
  },
  {
    path: "/admin/category",
    name: "admin_category",
    component: AdminCategory,
    exact: true,
  },
  {
    path: "/admin/user/managment",
    name: "admin_user_managment",
    component: UserManagment,
    exact: true,
  },
  {
    path: "/admin/products/add",
    name: "admin/products/add",
    component: AddProducts,
    exact: true,
  },
  {
    path: "/admin/products",
    name: "admin/products",
    component: AllProducts,
    exact: true,
  },
  {
    path: "/admin/orders",
    name: "admin/orders",
    component: Orders,
    exact: true,
  },
  {
    path: "/admin/delivery",
    name: "admin/delivery",
    component: Delivery,
    exact: true,
  },
  {
    path: "/admin/orders/getOrder/:id",
    name: "/admin/orders/getOrder",
    component: getOrders,
    exact: true,
  },
  {
    path: "/admin/products/update/:id",
    name: "/admin/products/update/",
    component: updateProduct,
    exact: true,
  },
];

export default adminRoutes;
