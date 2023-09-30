import React from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import SideNav, {
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";

class SideNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    };
  }

  render() {
    return (
      <SideNav expanded={this.state.isVisible} style={{'background-color': '#4f37de'}}>
        <SideNav.Toggle
          onClick={() => {
            this.setState({ isVisible: !this.state.isVisible });
          }}
        />
        <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="dashboard">
            <NavIcon>
              <i 
                className="fa fa-tachometer" 
                style={{ fontSize: "1.5em" }} 
              />
            </NavIcon>
            <NavText>Dashboard</NavText>
          </NavItem>
          <NavItem eventKey="profile">
            <NavIcon>
              <i
                className="fa fa-user"
                style={{ fontSize: "1.5em" }}
                aria-hidden="true"
              />
            </NavIcon>
            <NavText>Profile</NavText>
          </NavItem>
          <NavItem eventKey="employees">
            <NavIcon>
              <i
                className="fa fa-users"
                style={{ fontSize: "1.5em" }}
                aria-hidden="true"
              />
            </NavIcon>
            <NavText>Manage Employees</NavText>
          </NavItem>
          <NavItem eventKey="logout">
            <NavIcon>
              <i
                className="fa fa-power-off"
                style={{ fontSize: "1.5em" }}
                aria-hidden="true"
              />
            </NavIcon>
            <NavText>Log out</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    );
  }
}

export default SideNavBar;
