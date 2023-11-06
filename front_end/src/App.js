import './App.css';
import {createBrowserRouter, RouterProvider } from 'react-router-dom';

// pages
import Login from './pages/Login.jsx';
import Dashboard from './pages/dashboard/Dashboard';
import Employees from './pages/dashboard/Employees';
import Profile from './pages/dashboard/Profile';
import Dashboardhome from './pages/dashboard/Home';
import CreateAccount from './pages/dashboard/modals/CreateAccount';
import EmployeeDashboard, { Loader as EmployeeProfileLoader } from './pages/employee_dashboard/EmployeeProfile';
import EmployeeProfile from './pages/employee_dashboard/EmployeeProfile';
import ErrorElement from './pages/ErrorElement';

const router = createBrowserRouter([
  {
    path: '/',
    element:<Login />
  },
  {
    path:'/dashboard',
    element: <Dashboard />,
    children:[
      {
        path: 'home',
        element: <Dashboardhome />,
        index: true,
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path:'employees',
        element: <Employees />,
        children:[
          {
            path: 'create',
            element: <CreateAccount />
          },
        ]
      }
    ]
  },
  {
    path: '/employeeDashboard',
    element: <EmployeeDashboard />,
    errorElement: <ErrorElement />,
  }
])


function App() {


  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
