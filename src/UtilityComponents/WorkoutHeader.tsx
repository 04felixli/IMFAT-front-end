// This component renders the user input for workout name and the time elapsed since workout started

import React from 'react';
import './Styles/WorkoutTracker.css';
import { useState, useEffect } from 'react';
import { format, set } from "date-fns";
import WorkoutTimer from './WorkoutTimer';

interface Props {
    duration: number;
    setDuration: React.Dispatch<React.SetStateAction<number>>;
    workoutName: string;
    setWorkoutName: React.Dispatch<React.SetStateAction<string>>;
    date: string
}

const WorkoutHeader = ({ duration, setDuration, workoutName, setWorkoutName, date }: Props) => {

    // Handle workout title 
    // const [workoutName, setWorkoutName] = useState<string>('');

    const handleWorkoutName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setWorkoutName(e.target.value);
    };

    return (
        <div>
            <section className='flex flex-row justify-between'>
                <label htmlFor="WorkoutName">Workout Name:</label>
                <WorkoutTimer duration={duration} setDuration={setDuration} />
            </section>

            <input
                type="text"
                id="WorkoutName"
                value={workoutName}
                onChange={handleWorkoutName}
                className="w-full rounded focus:outline-none bg-gray-200 p-2"
                placeholder={"New Workout"}
            />
        </div>
    )
}

export default WorkoutHeader; 