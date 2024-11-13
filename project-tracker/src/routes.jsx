import App from "./App";
import Login from "./pages/login"
import Signup from "./pages/signup";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home"
import AdminDashboard from "./pages/adminDashboard.jsx";
import StudentDashboard from "./pages/studentDashboard.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup", 
        element: <Signup />,
      },
      {
        path: "/admin-dashboard", 
        element: <AdminDashboard />,
        // pass the user to  admin dashboard
        loader: ({request}) => {
          return {user: request.context.user}
        }

      },
      {
        path: "/student-dashboard", 
        element: <StudentDashboard />,
        loader: ({request}) => {
          return {user: request.context.user}
        }
      },
    ],
  },
];

export default routes;


// notes:
// loader:
//  loader is a function that allows you to pre-fetch data before rendering the route's component.
//  It can be used to load data, check conditions (e.g., authentication), or fetch API responses before rendering the component that corresponds to the route.
