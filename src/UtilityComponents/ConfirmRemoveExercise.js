import React, { useState, useEffect } from 'react';
import './Styles/ConfirmRemoveExercise.css';

function ConfirmRemoveExercise({ exerciseIndex, isConfirmRemoveExerciseOpen, setIsConfirmRemoveExerciseOpen, addedExercises, setAddedExercises, exerciseSets, setExerciseSets }) {

    const exerciseToRemove = addedExercises[exerciseIndex].name;

    const handleRemoveExercise = () => {
        const updatedAddedExercises = addedExercises.filter((_, index) => index !== exerciseIndex);
        const updatedExerciseSets = exerciseSets.filter((_, index) => index !== exerciseIndex);

        setAddedExercises(updatedAddedExercises);
        setExerciseSets(updatedExerciseSets);
        setIsConfirmRemoveExerciseOpen(false);
    }

    return (
        <div className={isConfirmRemoveExerciseOpen ? 'show' : 'hidden'}>
            <div>
                Remove Exercise?
            </div>

            <div>
                This removes "{exerciseToRemove}" and all of your current progress.
            </div>

            <button onClick={() => setIsConfirmRemoveExerciseOpen(false)}>
                Cancel
            </button>

            <button onClick={() => handleRemoveExercise()}>
                Remove
            </button>
        </div>
    );
}

export default ConfirmRemoveExercise;