import React from 'react';
import './Styles/WorkoutTracker.css';
import { useState, useEffect } from 'react';
import { format } from "date-fns";
import WorkoutTimer from './WorkoutTimer';
import WorkoutHeader from './WorkoutHeader';
import ExerciseList from './ExerciseList';
import GrayedBg from './GrayedBg';
import Exercise from './Exercise';
import ModelExerciseInList from '../Models/ModelExerciseInList';

function WorkoutTracker() {

    const exercisesList = [{ name: "Bench Press", targetMuscle: "Chest", equipiment: "Barbell", weightUnit: "lbs" },
    { name: "Squat", targetMuscle: "Legs", equipiment: "Barbell", weightUnit: "lbs" },
    { name: "Deadlift", targetMuscle: "Back", equipiment: "Barbell", weightUnit: "lbs" },
    { name: "Bent Over Row", targetMuscle: "Back", equipiment: "Barbell", weightUnit: "lbs" }];

    // This array holds a list of selected exercises by the user
    const [addedExercises, setAddedExercises] = useState<ModelExerciseInList[]>([]);

    // is exercise list open 
    const [isAddExerciseOpen, setIsAddExerciseOpen] = useState<boolean>(false);

    // A pop-up window to ask the user if they are sure before removing an exercise
    const [isConfirmRemoveExerciseOpen, setIsConfirmRemoveExerciseOpen] = useState<boolean>(false);

    return (
        <div className="workout-tracker" >

            <WorkoutHeader />

            <Exercise addedExercises={addedExercises}
                setAddedExercises={setAddedExercises}
                isConfirmRemoveExerciseOpen={isConfirmRemoveExerciseOpen}
                setIsConfirmRemoveExerciseOpen={setIsConfirmRemoveExerciseOpen}
            />

            <GrayedBg isAddExerciseOpen={isAddExerciseOpen}
                setIsAddExerciseOpen={setIsAddExerciseOpen}
                isConfirmRemoveExerciseOpen={isConfirmRemoveExerciseOpen}
                setIsConfirmExerciseOpen={setIsConfirmRemoveExerciseOpen}
            />

            <ExerciseList isAddExerciseOpen={isAddExerciseOpen}
                setIsAddExerciseOpen={setIsAddExerciseOpen}
                addedExercises={addedExercises}
                setAddedExercises={setAddedExercises}
            />

            <button className='text-blue-500 bg-blue-100 px-4 rounded mt-10' onClick={(() => setIsAddExerciseOpen(true))}>Add Exercise</button>
            <button className='text-green-500 bg-green-100 px-4 rounded mt-10'>Finish Workout</button>
            <button className=' text-red-500 bg-red-100 px-4 rounded mt-3'>Cancel Workout</button>

        </div >
    )
}

export default WorkoutTracker; 