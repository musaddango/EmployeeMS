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
      },
    ]
  },
  {
    path: '/employee_dashboard',
    element: <EmployeeDashboard />,
    ErrorBoundary: <ErrorElement />,
    children: [
      {
        path: './profile/:email',
        element: <EmployeeProfile />,
        loader: <EmployeeProfileLoader />
      },
    ]
  }
])


function App() {

    // const [loggedUser, setLogUser] = useState({name:'', email:'',id:''});
    // const user =(data)=>{
    //   setLogUser({name: data.name, email:data.email, id:data.id})
    // } 

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
