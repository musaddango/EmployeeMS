import { Outlet } from "react-router-dom";
import SideNavBar from "../../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="">
      <div className='row d-flex'>
        <div className="col">
          <SideNavBar />
        </div>
      </div>
      <div className="col p-0 m-0">
        <div className="p-2 d-flex justify-content-center shadow">
          <h2>Employee Management System</h2>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}