// This file is the history page component. It will store a log of EVERY workout completed by the user. 

import React, { useState } from 'react';
import { useEffect } from 'react';
import { fetchWorkoutHistoryNoDetails } from '../../Library/lib';
import ModelWorkoutHistory from '../../Models/ModelWorkoutHistory';
import WorkoutHistoryDetails from './Components/PopUps/WorkoutHistoryDetails';
import NavBar from '../../UtilityComponents/NavBar';

const History = () => {

    const [workoutHistoryNoDetails, setWorkoutHistoryNoDetails] = useState<ModelWorkoutHistory<string>[] | null>(null); // null when component first loads, [] when api doesn't return any history

    const [showWorkoutHistoryPopUp, setShowWorkoutHistoryPopUp] = useState<boolean>(false);

    const [workoutHistoryIdToShow, setWorkoutHistoryIdToShow] = useState<number | null>(null);

    useEffect(() => {

        let ignore = false;

        fetchWorkoutHistoryNoDetails().then((response: ModelWorkoutHistory<string>[]) => {
            if (!ignore) {
                setWorkoutHistoryNoDetails(response);
            }
        });

        return () => {
            ignore = true;
        };

    }, []);

    const handleShowWorkoutHistory = (workoutId: number): void => {
        setShowWorkoutHistoryPopUp(true);
        setWorkoutHistoryIdToShow(workoutId);
        console.log("Workout history should be shown")
    }

    const closePopUp = (): void => {
        setShowWorkoutHistoryPopUp(false);
        setWorkoutHistoryIdToShow(null);
    }

    const formatDate = (inputDate: string): string => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: 'UTC'
        };

        const date = new Date(inputDate);
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

        return formattedDate;
    };

    const formatDuration = (totalSeconds: number): string => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        const formattedTime = `${hours}h ${minutes}m ${seconds}s`;

        return formattedTime;
    };

    return (
        <div className='flex flex-col mt-4'>
            <NavBar />

            <div className='text-3xl font-bold mx-auto mt-2 text-center'>Workout History</div>

            <div className='mt-10'>
                {
                    !workoutHistoryNoDetails ? (
                        <div>Loading...</div>
                    ) : workoutHistoryNoDetails.length !== 0 ? (
                        workoutHistoryNoDetails.map((workout, index) => (
                            <button key={`workout_${index}`} className='flex flex-col border border-gray-400 mb-2 w-10/12 mx-auto rounded hover:bg-gray-200 text-left' onClick={() => handleShowWorkoutHistory(workout.id)}>
                                <div className='p-4'>
                                    <div className='font-bold'>{workout.name}</div>
                                    <div className='text-sm'>{formatDate(workout.date)}</div>
                                    <div className='text-sm'>{formatDuration(workout.duration)}</div>
                                    <div className='text-sm'>{workout.type}</div>
                                    <div className='text-sm text-gray-600 font-bold mt-3'>Exercises:</div>
                                    <ul className="list-disc ml-6">
                                        {workout.exercises_done_in_workout.map((exercise, index) => (
                                            <li key={`exercise_${index}`} className='text-sm'>{exercise}</li>
                                        ))}
                                    </ul>
                                </div>
                            </button>

                        ))
                    ) : (
                        <div>There is no workout history at this moment.</div>
                    )
                }
            </div>

            {showWorkoutHistoryPopUp && <WorkoutHistoryDetails workoutHistoryIdToShow={workoutHistoryIdToShow} closePopUp={closePopUp} formatDate={formatDate} formatDuration={formatDuration} />}
        </div>
    );
};

export default History;
