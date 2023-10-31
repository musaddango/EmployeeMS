import {useState} from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, {
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import {  useNavigate } from 'react-router-dom';
import '../../components/Sidebar.css';
import axios from "axios";


function EmployeeSideNav (props) {

    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () =>{
      // Call the logout server endpoint
      axios.get('http://localhost:4000/logout')
      .then((res) => {
        navigate('/')
      })
      .catch((err)=> console.log(`Error login out`))
    }


    return (
      <SideNav   className='bg-success'>
        <SideNav.Toggle
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        />
        <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="dashboard" onClick={()=> navigate('./employee_dashboard')}>
              <NavIcon>
                <i 
                  className="fa fa-tachometer" 
                  style={{ fontSize: "1.5em" }} 
                />
              </NavIcon>
              <NavText className='text'> Dashboard </NavText>
          </NavItem>
          <NavItem eventKey="profile" onClick={()=> navigate('./employee_profile')}>
            <NavIcon>
              <i
                className="fa fa-user"
                style={{ fontSize: "1.5em" }}
                aria-hidden="true"
              />
            </NavIcon>
            <NavText className='text'>Profile</NavText>
          </NavItem>
          <NavItem eventKey="logout" onClick={handleLogout}>
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

export default EmployeeSideNav;