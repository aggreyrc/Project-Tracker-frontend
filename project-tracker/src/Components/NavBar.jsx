import {NavLink} from "react-router-dom"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./authSlice";
 
function NavBar() {

  const dispatch =useDispatch();
  const navigate = useNavigate();

  function handleLogout(){

    fetch('http://127.0.0.1:5555/logout', {
      method: 'DELETE',
      credentials: 'include', // Include cookies for session-based logout
  })
      .then((res) => {
          if (res.ok) {
              localStorage.removeItem('user')  //Remove user from local storage
              dispatch(logout()); // Clear Redux state
              navigate('/login'); // Redirect to login page
          } else {
              console.error('Logout failed');
          }
      })
      .catch((err) => console.error('An error occurred:', err));


  };
  

  return (
    <nav className="dark-glow-navbar">
      <NavLink to="/" className="nav_link">Home</NavLink>
      <button  onClick={handleLogout}  className="Logout">Logout</button>
     
    </nav>
  );
}

export default NavBar;
