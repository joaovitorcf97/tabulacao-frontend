import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

function Tabulacao() {
  return (
    <div className="container-users">
      <div className="breadcrumb">
        <Link to={'/home/dashboard'}>Dashboard</Link>
        <IoIosArrowForward size={16} color='#7f808b' />
        <Link to={'/home/categories'}>Tabulação</Link>
      </div>
      <h1>Tabulação</h1>
    </div >
  );
}

export { Tabulacao };

