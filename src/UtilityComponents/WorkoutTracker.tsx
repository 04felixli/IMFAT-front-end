import React from 'react';
import './Styles/WorkoutTracker.css';
import { useState, useEffect } from 'react';
import { format } from "date-fns";
import WorkoutTimer from './WorkoutTimer';
import WorkoutHeader from './WorkoutHeader';
import ExerciseList from './ExerciseList';
import GrayedBg from './GrayedBg';
import Exercise from './Exercise';
import ModelExerciseInList from '../Interfaces/ResponseModels/IResponseModelExerciseInList';
import ModelExercise from '../Models/ModelExercise';
import ModelWorkout from '../Models/ModelWorkout';

function WorkoutTracker() {

    // Array of exercises the user would like to track identified by exercise id
    const [addedExerciseIds, setAddedExerciseIds] = useState<number[]>([]);

    // This array holds a list of selected exercises by the user
    const [addedExercises, setAddedExercises] = useState<ModelExerciseInList[]>([]);

    // is exercise list open 
    const [isAddExerciseOpen, setIsAddExerciseOpen] = useState<boolean>(false);

    // A pop-up window to ask the user if they are sure before removing an exercise
    const [isConfirmRemoveExerciseOpen, setIsConfirmRemoveExerciseOpen] = useState<boolean>(false);

    const formatDate = (date: Date): string => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };

        return new Date(date).toLocaleString('en-US', options).replace(',', ''); // Remove comma from the formatted date
    };

    const date: Date = new Date();

    const formattedDate: string = formatDate(date); // Date and time of workout 

    const [duration, setDuration] = useState<number>(0) // duration of workout in seconds 

    const [workoutName, setWorkoutName] = useState<string>(formattedDate); // Name of the workout - default is the date of the workout

    const workoutType: string = "Weight Lifting";

    // array of exercises with sets 
    const [exercises, setExercises] = useState<ModelExercise[]>([]);

    // Copy of above to hold previous values 
    const [oldExercises, setOldExercises] = useState<ModelExercise[]>([]);

    const handleFinishWorkout = () => {
        const workout = new ModelWorkout(workoutType, formattedDate, workoutName, duration, exercises);

        console.log(workout)
    }

    return (
        <div className="workout-tracker" >

            <WorkoutHeader duration={duration} setDuration={setDuration} workoutName={workoutName} setWorkoutName={setWorkoutName} />

            {addedExerciseIds.length > 0 && <Exercise exercises={exercises}
                setExercises={setExercises}
                oldExercises={oldExercises}
                setOldExercises={setOldExercises}
                setIsConfirmRemoveExerciseOpen={setIsConfirmRemoveExerciseOpen}
                addedExerciseIds={addedExerciseIds}
            />}

            <GrayedBg isAddExerciseOpen={isAddExerciseOpen}
                setIsAddExerciseOpen={setIsAddExerciseOpen}
                isConfirmRemoveExerciseOpen={isConfirmRemoveExerciseOpen}
                setIsConfirmExerciseOpen={setIsConfirmRemoveExerciseOpen}
            />

            <ExerciseList isAddExerciseOpen={isAddExerciseOpen}
                setIsAddExerciseOpen={setIsAddExerciseOpen}
                addedExercises={addedExercises}
                setAddedExercises={setAddedExercises}
                addedExerciseIds={addedExerciseIds}
                setAddedExerciseIds={setAddedExerciseIds}
            />

            <button className='text-blue-500 bg-blue-100 px-4 rounded mt-10' onClick={() => setIsAddExerciseOpen(true)}>Add Exercise</button>
            <button className='text-green-500 bg-green-100 px-4 rounded mt-10' onClick={() => handleFinishWorkout()}>Finish Workout</button>
            <button className=' text-red-500 bg-red-100 px-4 rounded mt-3'>Cancel Workout</button>

        </div >
    )
}

export default WorkoutTracker; 