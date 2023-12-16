import React, { useState, useEffect } from 'react';
import './Styles/ConfirmRemoveExercise.css';
// import ModelExerciseInList from '../Models/ModelExerciseInList';
import ModelExercise from '../Models/ModelExercise';
import GrayBg from './GrayBg';
import ModelSet from '../Models/ModelSet';

interface Props {
    isConfirmRemoveExerciseOpen: boolean;
    setIsConfirmRemoveExerciseOpen: React.Dispatch<React.SetStateAction<boolean>>;
    addedExerciseIds: number[]
    setAddedExerciseIds: React.Dispatch<React.SetStateAction<number[]>>;
    exercises: ModelExercise[];
    setExercises: React.Dispatch<React.SetStateAction<ModelExercise[]>>;
    oldExercises: ModelExercise[];
    setOldExercises: React.Dispatch<React.SetStateAction<ModelExercise[]>>;
    exerciseIndexToRemove: number;
    setExerciseIndexToRemove: React.Dispatch<React.SetStateAction<number>>;
}

const ConfirmRemoveExercise = ({ isConfirmRemoveExerciseOpen, setIsConfirmRemoveExerciseOpen, addedExerciseIds, setAddedExerciseIds, exercises, setExercises, oldExercises, setOldExercises, exerciseIndexToRemove, setExerciseIndexToRemove }: Props) => {

    const exerciseToRemove = exercises[exerciseIndexToRemove].name;

    const handleRemoveExercise = () => {
        setAddedExerciseIds((prev: number[]) => prev.filter((id: number, index: number) => index !== exerciseIndexToRemove)) // remove the id at exerciseIndex from addedExerciseIds array 

        setExercises((prevExercises: ModelExercise[]) => {
            const exercisesCopy: ModelExercise[] = prevExercises.map((exercise: ModelExercise) => ({
                ...exercise,
                sets: exercise.sets.map((set: ModelSet) => ({ ...set })),
            }));

            const filteredExercisesCopy = exercisesCopy.filter((exercise: ModelExercise, index: number) => index !== exerciseIndexToRemove); // // remove the exercise object at exerciseIndex from exercises array 

            return filteredExercisesCopy;
        });

        setOldExercises((prevExercises: ModelExercise[]) => {
            const exercisesCopy: ModelExercise[] = prevExercises.map((exercise: ModelExercise) => ({
                ...exercise,
                sets: exercise.sets.map((set: ModelSet) => ({ ...set })),
            }));

            const filteredExercisesCopy = exercisesCopy.filter((exercise: ModelExercise, index: number) => index !== exerciseIndexToRemove); // // remove the exercise object at exerciseIndex from exercises array 

            return filteredExercisesCopy;
        });

        setIsConfirmRemoveExerciseOpen(false);
        setExerciseIndexToRemove(-1);
    }

    const closePopUp = (): void => {
        setIsConfirmRemoveExerciseOpen(false);
    }

    return (
        <div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-90 h-80vh bg-white z-50 flex flex-col items-center">
                <div>Remove Exercise?</div>
                <p className="text-sm">This removes "{exerciseToRemove}" and all of your current progress</p>
                <div className="flex flex-row justify-around w-full">
                    <button onClick={closePopUp}>Cancel</button>
                    <button onClick={handleRemoveExercise}>Remove</button>
                </div>
            </div>

            <GrayBg onClick={closePopUp} />
        </div>
    );
}

export default ConfirmRemoveExercise;
