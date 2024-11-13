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
      },
      {
        path: "/student-dashboard", 
        element: <StudentDashboard />,
      },
    ],
  },
];

export default routes;
