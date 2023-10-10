import {useState} from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, {
  // onToggle,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import {  useNavigate } from 'react-router-dom';
import './Sidebar.css';


function SideNavBar (props) {
 
    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();
    return (
      <SideNav  defaultExpanded expanded={isVisible} style={{backgroundColor: 'rgb(79, 55, 222)'}}>
        <SideNav.Toggle
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        />
        <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="dashboard" onClick={()=> navigate('./home')}>
              <NavIcon>
                <i 
                  className="fa fa-tachometer" 
                  style={{ fontSize: "1.5em" }} 
                />
              </NavIcon>
              <NavText className='text'> Dashboard</NavText>
          </NavItem>
          <NavItem eventKey="profile" onClick={()=> navigate('./profile')}>
            <NavIcon>
              <i
                className="fa fa-user"
                style={{ fontSize: "1.5em" }}
                aria-hidden="true"
              />
            </NavIcon>
            <NavText className='text'>Profile</NavText>
          </NavItem>
          <NavItem eventKey="employees" onClick={()=> navigate('./employees')}>
            <NavIcon>
              <i
                className="fa fa-users"
                style={{ fontSize: "1.5em" }}
                aria-hidden="true"
              />
            </NavIcon>
            <NavText className='text'>Manage Employees</NavText>
          </NavItem>
          <NavItem eventKey="logout" onClick={()=> navigate('/')}>
            <NavIcon>
              <i
                className="fa fa-power-off"
                style={{ fontSize: "1.5em" }}
                aria-hidden="true"
              />
            </NavIcon>
            <NavText className='text'>Log out</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    );
  }

export default SideNavBar;
