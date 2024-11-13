import App from "./App";
import Login from "./pages/login"
import Signup from "./pages/signup";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home"

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
    ],
  },
];

export default routes;
