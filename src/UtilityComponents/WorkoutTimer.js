import './Styles/WorkoutTracker.css';
import { useState, useEffect } from 'react';
import { format } from "date-fns";


function WorkoutTimer() {

    // Handle workout timer
    const startTime = Date.now();
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {
            const currentTime = Date.now();
            setElapsedTime(Math.floor((currentTime - startTime) / 1000));
        }, 1000);


        return () => clearInterval(interval);
    }, []);

    return (
        <p>{formatTime(elapsedTime)}</p>
    )
}

// Function to format seconds elapsed since workout started to "00:00:00" format
const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default WorkoutTimer; 