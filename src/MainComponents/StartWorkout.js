// This is the "main page" component. Users can start their workouts from here. 

import './Styles/StartWorkout.css';
import NavBar from '../UtilityComponents/NavBar';

function StartWorkout() {
    return (
        <div className="mobile-page-format">
            <h1 className="title"> Start Workout </h1>

            <button className="start-workout-button"> Start New Workout </button>

            <div className="templates-row">
                <div className="text-lg">Templates</div>
                <button className="add-templates-button">+Template</button>
            </div>

            <NavBar />
        </div>

    )
}

export default StartWorkout; 