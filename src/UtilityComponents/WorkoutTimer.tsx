import React from 'react';
import './Styles/WorkoutTracker.css';
import { useState, useEffect } from 'react';
import { format } from "date-fns";

interface Props {
    duration: number;
    setDuration: React.Dispatch<React.SetStateAction<number>>;
}

const WorkoutTimer = ({ duration, setDuration }: Props) => {

    // Handle workout timer
    const startTime: number = Date.now();
    // const [duration, setDuration] = useState<number>(0);

    useEffect(() => {

        const interval: NodeJS.Timeout = setInterval(() => {
            const currentTime: number = Date.now();
            setDuration(Math.floor((currentTime - startTime) / 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <p>{formatTime(duration)}</p>
    )
}

// Function to format seconds elapsed since workout started to "00:00:00" format
const formatTime = (totalSeconds: number): string => {
    const hours: number = Math.floor(totalSeconds / 3600);
    const minutes: number = Math.floor((totalSeconds % 3600) / 60);
    const seconds: number = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default WorkoutTimer; 