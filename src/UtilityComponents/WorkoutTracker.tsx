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
import { postWorkout } from '../MainComponents/lib';
import ConfirmWorkoutCompletion from './ConfirmWorkoutCompletion';
import ConfirmCancelWorkout from './ConfirmCancelWorkout';

interface Props {
    isStarted: boolean;
    setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const WorkoutTracker = ({ isStarted, setIsStarted }: Props) => {

    // Array of exercises the user would like to track identified by exercise id
    const [addedExerciseIds, setAddedExerciseIds] = useState<number[]>([]);

    // This array holds a list of selected exercises by the user
    const [addedExercises, setAddedExercises] = useState<ModelExerciseInList[]>([]);

    // is exercise list open 
    const [isAddExerciseOpen, setIsAddExerciseOpen] = useState<boolean>(false);

    // A pop-up window to ask the user if they are sure before removing an exercise
    const [isConfirmRemoveExerciseOpen, setIsConfirmRemoveExerciseOpen] = useState<boolean>(false);

    const [date, setDate] = useState<string>((new Date()).toISOString()) // Date and time of workout 

    const [duration, setDuration] = useState<number>(0) // duration of workout in seconds 

    const [workoutName, setWorkoutName] = useState<string>(''); // Name of the workout - default is the date of the workout

    const workoutType: string = "Weight Lifting";

    // array of exercises with sets 
    const [exercises, setExercises] = useState<ModelExercise[]>([]);

    // Copy of above to hold previous values 
    const [oldExercises, setOldExercises] = useState<ModelExercise[]>([]);

    const [isWorkoutFinished, setIsWorkoutFinished] = useState<boolean>(false);

    const [showCancelWorkoutPopUp, setShowCancelWorkoutPopUp] = useState<boolean>(false);

    const handleFinishWorkout = (): void => {
        setIsWorkoutFinished(true);
    };

    const handleCancelWorkout = (): void => {
        setShowCancelWorkoutPopUp(true);
    }

    const [exerciseIndexToRemove, setExerciseIndexToRemove] = useState<number>(-1); // index of exercise to remove OR index of exercise to remove a set from

    // useEffect(() => {
    //     console.log("exercises are: ", exercises);
    //     console.log("exercise Ids are: ", addedExerciseIds);
    // }, [exercises, addedExerciseIds]);

    return (
        <div className="workout-tracker" >

            <WorkoutHeader duration={duration} setDuration={setDuration} workoutName={workoutName} setWorkoutName={setWorkoutName} date={date} />

            {addedExerciseIds.length > 0 && <Exercise exercises={exercises}
                setExercises={setExercises}
                oldExercises={oldExercises}
                setOldExercises={setOldExercises}
                isConfirmRemoveExerciseOpen={isConfirmRemoveExerciseOpen}
                setIsConfirmRemoveExerciseOpen={setIsConfirmRemoveExerciseOpen}
                addedExerciseIds={addedExerciseIds}
                setAddedExerciseIds={setAddedExerciseIds}
                exerciseIndexToRemove={exerciseIndexToRemove}
                setExerciseIndexToRemove={setExerciseIndexToRemove}
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

            {isWorkoutFinished && <ConfirmWorkoutCompletion exercises={exercises}
                workoutName={workoutName}
                workoutType={workoutType}
                setExercises={setExercises}
                date={date}
                duration={duration}
                setIsWorkoutFinished={setIsWorkoutFinished}
                setIsStarted={setIsStarted}
            />}

            {showCancelWorkoutPopUp && <ConfirmCancelWorkout setIsStarted={setIsStarted} setShowCancelWorkoutPopUp={setShowCancelWorkoutPopUp} />}

            <button className='text-blue-500 bg-blue-100 px-4 rounded mt-10' onClick={() => setIsAddExerciseOpen(true)}>Add Exercise</button>
            <button className='text-green-500 bg-green-100 px-4 rounded mt-10' onClick={() => handleFinishWorkout()}>Finish Workout</button>
            <button className=' text-red-500 bg-red-100 px-4 rounded mt-3' onClick={() => handleCancelWorkout()}>Cancel Workout</button>

        </div >
    )
}

export default WorkoutTracker; 