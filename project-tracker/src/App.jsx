import { Outlet } from "react-router-dom"
import { useEffect } from "react";
import NavBar from "./Components/NavBar"
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./Components/authSlice";

function App() {

  const dispatch =useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/checksession", { credentials: 'include' })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Session not found');
        }
      })
      .then((userData) => dispatch(setUser(userData)))
      .catch((error) => console.error("Session check failed:", error));
  }, [dispatch]);

 
  return (
    <>

       <header>
          <NavBar user={user}/>
       </header>

       <Outlet context={{user}}/>
     
    </>
  )
}

export default App



// notes:
// { credentials: 'include' } is used in the fetch API to control how cookies and other credentials (such as authentication tokens) are handled when making HTTP requests.

// useSelector:
// Allows you to extract data from the Redux store state

// useDispatch:
// Provides access to the dispatch function from the Redux store
// Allows you to dispatch actions to update the Redux state
