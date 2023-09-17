import Login from "views/Login.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Login />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: <Login />,
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
    component: <Login />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: <Login />,
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
    path: "/upgrade",
    name: "Logoff",
    icon: "nc-icon nc-spaceship",
    component: <Login />,
    layout: "/admin",
  },
];
export default routes;
