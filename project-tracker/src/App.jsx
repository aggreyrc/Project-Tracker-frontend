import { Outlet } from "react-router-dom"
import { useState,useEffect } from "react";
import NavBar from "./Components/NavBar"

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("http://127.0.0.1:5555/check_session")
    .then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user));
      }
    });
  }, []);
  

  return (
    <>

       <header>
          <NavBar/>
       </header>

       <Outlet/>
     
    </>
  )
}

export default App
