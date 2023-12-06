// This component renders the user input for workout name and the time elapsed since workout started
import React from 'react';
import './Styles/WorkoutTracker.css';
import { useState, useEffect } from 'react';
import { format } from "date-fns";
import WorkoutTimer from './WorkoutTimer';

const WorkoutHeader = () => {

    // Handle workout title 
    const [inputWorkoutName, setWorkoutName] = useState<string>('');

    const handleWorkoutName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setWorkoutName(e.target.value);
    };

    return (
        <div>
            <section className='flex flex-row justify-between'>
                <label htmlFor="WorkoutName">Workout Name:</label>
                <WorkoutTimer />
            </section>

            <input
                type="text"
                id="WorkoutName"
                value={inputWorkoutName}
                onChange={handleWorkoutName}
                className="w-full rounded focus:outline-none bg-gray-200 p-2"
                placeholder={getDate()}
            />
        </div>
    )
}

// This function returns the time of the workout
const getDate = (): string => {
    const now = new Date();
    const formattedDate: string = format(now, "yyyy-MM-dd");

    return formattedDate;

}

export default WorkoutHeader; 