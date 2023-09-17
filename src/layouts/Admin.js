import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Routes, useLocation, Switch } from "react-router-dom";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import Login from "views/Login.js";
import Logoff from "views/Logoff";
import Register from "views/Register.js";

import routes from "routes.js";


var ps;

  function DashBoard(props) {
    const [backgroundColor, setBackgroundColor] = React.useState("black");
    const [activeColor, setActiveColor] = React.useState("info");
    const mainPanel = React.useRef();
    const location = useLocation();
    React.useEffect(() => {
      if (navigator.platform.indexOf("Win") > -1) {
        ps = new PerfectScrollbar(mainPanel.current);
        document.body.classList.toggle("perfect-scrollbar-on");
      }
      return function cleanup() {
        if (navigator.platform.indexOf("Win") > -1) {
          ps.destroy();
          document.body.classList.toggle("perfect-scrollbar-on");
        }
      };
    });
    React.useEffect(() => {
      mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }, [location]);
    const handleActiveClick = (color) => {
      setActiveColor(color);
    };
    const handleBgClick = (color) => {
      setBackgroundColor(color);
    };
    
  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={ routes }
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className="main-panel" ref={mainPanel}>
        <DemoNavbar {...props} />
          <Routes>
            <Route
              path={"/dashboard"}
              element={<Dashboard />}
              key={"Dashboard"}
              exact
            />
            <Route
              path={"/login"}
              element={<Login />}
              key={"Login"}
              exact
            />
            <Route
              path={"/user-register"}
              element={<Register />}
              key={"Register"}
              exact
            />
            <Route
              path={"/tables"}
              element={<TableList />}
              key={"TableList"}
              exact
            />
            <Route
              path={"/icons"}
              element={<Icons />}
              key={"Icons"}
              exact
            />
            <Route
              path={"/logoff"}
              element={<Logoff />}
              key={"Logoff"}
              exact
            />
          </Routes>
        <Footer fluid />
      </div>
    </div>
  );
}

export default DashBoard;
