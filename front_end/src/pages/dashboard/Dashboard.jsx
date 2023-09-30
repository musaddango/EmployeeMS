import SideNavBar from "../../components/Sidebar";

export default function Dashboard() {
  return (
    <>
      <div className='row'>
        <div className="col">
          <SideNavBar />
        </div>
      </div>
      <div className="col p-0 m-0">
        <div className="p-2 d-flex justify-content-center shadow">
          <h2>Employee Management System</h2>
        </div>
      </div>
      
    </>
  );
}