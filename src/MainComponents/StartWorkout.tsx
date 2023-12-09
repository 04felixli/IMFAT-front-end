// This is the "main page" component. Users can start their workouts from here. 
import React from 'react';
import './Styles/StartWorkout.css';
import NavBar from '../UtilityComponents/NavBar';
import WorkoutTracker from '../UtilityComponents/WorkoutTracker';
import { useState } from 'react';

const StartWorkout = () => {

    // Keep track of if a workout is started or not
    const [isStarted, setIsStarted] = useState<boolean>(false);

    return (
        <div className="page-format">

            <NavBar />

            <h1 className="title"> {isStarted ? getTimeOfDay() : "Start "} Workout </h1>

            <button className={"start-workout-button default-border " + (isStarted ? "hide-tracker" : '')} onClick={() => setIsStarted((prev) => !prev)}> Start New Workout </button>

            <section className={isStarted ? '' : "hide-tracker"}>
                <WorkoutTracker />
            </section>

            <div className="flex flex-row justify-start mt-10 font-bold">
                <div className="text-lg">Templates</div>
                <button className="text-lg text-blue-500 bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center focus:outline-none">+</button>
            </div>

        </div>

    )
}

// This function returns the time of the workout
const getTimeOfDay = (): string => {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour >= 0 && currentHour < 12) {
        return "Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
        return "Afternoon";
    } else if (currentHour >= 18 && currentHour < 20) {
        return "Evening";
    } else {
        return "Night";
    }
};


export default StartWorkout; 