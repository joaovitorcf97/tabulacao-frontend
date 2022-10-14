import { Outlet } from "react-router-dom";
import { NavBar } from "../../Navbar";

function Home() {
  return (
    <div className='container'>
      <NavBar />
      <Outlet />
    </div>);
}

export { Home };

