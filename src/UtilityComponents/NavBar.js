// This component returns the nav bar at the bottom of all pages 
import './Styles/NavBar.css';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <div className="navbar default-border">
            <Link to="/Profile">
                <button className='navbar-button default-border'>Profile</button>
            </Link>

            <Link to="/History">
                <button className='navbar-button default-border'>History</button>
            </Link>

            <Link to="/StartWorkout">
                <button className='navbar-button default-border'>Start Workout</button>
            </Link>

            <Link to="/Schedule">
                <button className='navbar-button default-border'>Schedule</button>
            </Link>

            <Link to="/Nutrition">
                <button className='navbar-button default-border'>Nutrition</button>
            </Link>
        </div>
    )
}

export default NavBar; 