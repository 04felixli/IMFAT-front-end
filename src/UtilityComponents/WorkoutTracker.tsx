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

    // Array of exercises the user would like to track identified by exercise id
    const [addedExerciseIds, setAddedExerciseIds] = useState<number[]>([]);

    // This array holds a list of selected exercises by the user
    const [addedExercises, setAddedExercises] = useState<ModelExerciseInList[]>([]);

    // is exercise list open 
    const [isAddExerciseOpen, setIsAddExerciseOpen] = useState<boolean>(false);

    // A pop-up window to ask the user if they are sure before removing an exercise
    const [isConfirmRemoveExerciseOpen, setIsConfirmRemoveExerciseOpen] = useState<boolean>(false);

    return (
        <div className="workout-tracker" >

            <WorkoutHeader />

            {addedExerciseIds.length > 0 && <Exercise addedExercises={addedExercises}
                setAddedExercises={setAddedExercises}
                isConfirmRemoveExerciseOpen={isConfirmRemoveExerciseOpen}
                setIsConfirmRemoveExerciseOpen={setIsConfirmRemoveExerciseOpen}
                addedExerciseIds={addedExerciseIds}
                setAddedExerciseIds={setAddedExerciseIds}
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

            <button className='text-blue-500 bg-blue-100 px-4 rounded mt-10' onClick={(() => setIsAddExerciseOpen(true))}>Add Exercise</button>
            <button className='text-green-500 bg-green-100 px-4 rounded mt-10'>Finish Workout</button>
            <button className=' text-red-500 bg-red-100 px-4 rounded mt-3'>Cancel Workout</button>

        </div >
    )
}

export default WorkoutTracker; 