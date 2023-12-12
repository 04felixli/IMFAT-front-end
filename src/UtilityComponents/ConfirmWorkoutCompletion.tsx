// This component is a pop-up that displays when the user clicks "Finish Workout"

import React from "react";
import GrayBg from "./GrayBg";
import ModelExercise from "../Models/ModelExercise";
import ModelWorkout from "../Models/ModelWorkout";
import { postWorkout } from "../MainComponents/lib";

interface Props {
    exercises: ModelExercise[];
    setExercises: React.Dispatch<React.SetStateAction<ModelExercise[]>>;
    workoutType: string;
    date: string;
    workoutName: string;
    duration: number;
    setIsWorkoutFinished: React.Dispatch<React.SetStateAction<boolean>>;
    setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmWorkoutCompletion = ({ exercises, setExercises, workoutType, date, workoutName, duration, setIsWorkoutFinished, setIsStarted }: Props) => {

    const closePopUp = (): void => {
        setIsWorkoutFinished(false);
    }

    const handleFinishWorkout = (): void => {
        if (exercises.length !== 0) {
            const filteredExercises: ModelExercise[] = exercises
                .map(exercise => ({
                    ...exercise,
                    sets: exercise.sets.map(set => ({ ...set })).filter(set => set.isCompleted === true), // Filter exercises to keep only completed sets
                }))
                .filter(exercise => exercise.sets.length > 0); // Filter out exercises with no completed sets

            // Create workout based on filtered exercises
            if (filteredExercises.length > 0) {
                const workout = new ModelWorkout(workoutType, date, workoutName, duration, filteredExercises);

                postWorkout(workout);
                console.log("workout has been posted", workout);
            } else {
                console.log("workout is empty. Nothing has been posted");
            }

            // Clear exercises state
            // setExercises([]);
        } else {
            console.log("workout is empty. Nothing has been posted");
        }

        closePopUp();
        setIsStarted(false);
    };

    return (
        <div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-90 h-80vh bg-white z-50 flex flex-col items-center">
                <div>Finish Workout?</div>
                <p className="text-sm">Incomplete exercises and sets will not be tracked.</p>
                <div className="flex flex-row justify-around w-full">
                    <button onClick={closePopUp}>Cancel</button>
                    <button onClick={handleFinishWorkout}>Finish</button>
                </div>
            </div>

            <GrayBg onClick={closePopUp} />
        </div>
    )
};

export default ConfirmWorkoutCompletion; 