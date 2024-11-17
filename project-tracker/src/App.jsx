import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import NavBar from "./Components/NavBar"
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./Components/authSlice";

function App() {

  const dispatch =useDispatch();
  const navigate =useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {

     // Check if there's a stored user in localStorage
     const storedUser = localStorage.getItem('user');
    
     if (storedUser) {
       // If user data exists in localStorage, set it in Redux
       dispatch(setUser(JSON.parse(storedUser)));
     } else {

    fetch("http://127.0.0.1:5555/check_session", { credentials: 'include' })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Session not found');
        }
      })
      .then((userData) => {

        // Store user data in Redux and localStorage
        dispatch(setUser(userData));
        localStorage.setItem("user", JSON.stringify(userData));

      })

      .catch((error) =>{ 

        // Remove user data from localStorage if session check fails
        localStorage.removeItem('user')

        dispatch(setUser(null))   //reset the user in redux

        console.error("Session check failed:", error) 

        navigate('/login')   //Redirect to login

       });

    }  
      

  }, [dispatch,navigate]);

 
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
