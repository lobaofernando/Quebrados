import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import Login from "views/Login.js";
import Logoff from "views/Logoff";
import Register from "views/Register.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: <Icons />,
    layout: "/admin",
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: <Notifications />,
  //   layout: "/admin",
  // },
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-single-02",
    component: <Login />,
    layout: "/admin",
  },
  {
    path: "/user-register",
    name: "Register",
    icon: "nc-icon nc-single-02",
    component: <Register />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Extrato",
    icon: "nc-icon nc-tile-56",
    component: <TableList />,
    layout: "/admin",
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: <Typography />,
  //   layout: "/admin",
  // },
  {
    pro: true,
    path: "/logoff",
    name: "Logoff",
    icon: "nc-icon nc-spaceship",
    component: <Logoff />,
    layout: "/admin",
  },
];
export default routes;
