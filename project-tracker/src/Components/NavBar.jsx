import {NavLink} from "react-router-dom"
 
function NavBar() {
  

  return (
    <nav className="dark-glow-navbar">
      <NavLink to="/" className="nav_link">Home</NavLink>
      <button className="Logout">Logout</button>
     
    </nav>
  );
}

export default NavBar;
