// This component renders the exercise tracking (eg. sets, reps, weight)

import { add } from "date-fns";
import { useState, useEffect } from "react";
import ConfirmRemoveExercise from "./ConfirmRemoveExercise";

function Exercise({ addedExercises, setAddedExercises, isConfirmRemoveExerciseOpen, setIsConfirmRemoveExerciseOpen }) {

    // An array of arrays holding objects for each exercise and its sets. Each set object has a set number, weight, and reps. 
    const [exerciseSets, setExerciseSets] = useState([]);



    // Update exercise sets when user adds new exercises
    useEffect(() => {
        if (addedExercises.length !== 0) {

            const exercisesToAdd = addedExercises.filter(exercise =>
                !exerciseSets.some(existingExercise =>
                    existingExercise.some(set =>
                        set.name === exercise.name
                    )
                )
            );

            const newExerciseSets = exercisesToAdd.map(exercise => [{
                name: exercise.name,
                setNum: 1,
                weight: '',
                reps: ''
            }]);

            setExerciseSets(prev => [...prev, ...newExerciseSets]);
        }
    }, [addedExercises]);

    const addSet = (exerciseName, exerciseIndex) => {
        const newExerciseSets = [...exerciseSets];
        const prevNumSets = newExerciseSets[exerciseIndex].length;
        newExerciseSets[exerciseIndex] = [...newExerciseSets[exerciseIndex], { name: exerciseName, setNum: (prevNumSets + 1), weight: '', reps: '' }];
        setExerciseSets(newExerciseSets);
    };

    const handleWeightChange = (exerciseIndex, setIndex, value) => {
        const updatedExerciseSets = [...exerciseSets];
        updatedExerciseSets[exerciseIndex][setIndex].weight = value;
        setExerciseSets(updatedExerciseSets);
    };

    const handleRepsChange = (exerciseIndex, setIndex, value) => {
        const updatedExerciseSets = [...exerciseSets];
        updatedExerciseSets[exerciseIndex][setIndex].reps = value;
        setExerciseSets(updatedExerciseSets);
    };

    const handleWeightUnitChange = (exerciseIndex) => {
        const updatedAddedExercises = [...addedExercises];
        updatedAddedExercises[exerciseIndex].weightUnit === 'lbs' ? updatedAddedExercises[exerciseIndex].weightUnit = 'kg' : updatedAddedExercises[exerciseIndex].weightUnit = 'lbs';
        setAddedExercises(updatedAddedExercises);
    }

    const handleRemoveExercise = (exerciseIndex) => {
        const updatedAddedExercises = addedExercises.filter((_, index) => index !== exerciseIndex);
        const updatedExerciseSets = exerciseSets.filter((_, index) => index !== exerciseIndex);

        setAddedExercises(updatedAddedExercises);
        setExerciseSets(updatedExerciseSets);
    }

    // useEffect(() => {
    //     console.log("Exercise Sets ", exerciseSets);
    // }, [exerciseSets]);

    // useEffect(() => {
    //     console.log("added exercises: ", addedExercises);
    // }, [addedExercises]);


    return (
        <div className={addedExercises ? 'flex flex-col mt-5' : 'hidden'}>
            {addedExercises.map((exercise, exerciseIndex) => (
                <div key={exerciseIndex} className='flex flex-col mt-5'>

                    <div className="flex flex-row justify-between text-blue-500">
                        <button>
                            {exercise.name}
                        </button>

                        <div className="flex flex-row space-x-5">
                            <button className="text-sm text-blue-500 bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center focus:outline-none"
                                onClick={() => handleWeightUnitChange(exerciseIndex)}
                            >
                                {exercise.weightUnit}
                            </button>

                            <button className="text-sm bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center focus:outline-none">
                                <img
                                    src='/ReplaceExerciseIcon.svg'
                                    alt="Replace Exercise Icon"
                                    className="h-4 w-4"
                                />
                            </button>

                            <button className="text-xs bg-red-100 rounded-full h-6 w-6 flex items-center justify-center focus:outline-none"
                                onClick={() => setIsConfirmRemoveExerciseOpen(true)}
                            >
                                {/* <img
                                    src='/RemoveExerciseIcon.svg'
                                    alt="Remove Exercise Icon"
                                    className="h-4 w-4"
                                    onClick={() => handleRemoveExercise(exerciseIndex)}
                                /> */}
                                {'❌'}
                            </button>

                            <ConfirmRemoveExercise exerciseIndex={exerciseIndex}
                                isConfirmRemoveExerciseOpen={isConfirmRemoveExerciseOpen}
                                setIsConfirmRemoveExerciseOpen={setIsConfirmRemoveExerciseOpen}
                                addedExercises={addedExercises}
                                setAddedExercises={setAddedExercises}
                                exerciseSets={exerciseSets}
                                setExerciseSets={setExerciseSets}
                            />

                        </div>
                    </div>

                    <div className="flex flex-row justify-between mt-2">
                        <div>Set</div>
                        <div>Previous</div>

                        <div className="flex flex-row space-x-5">
                            <div>{exercise.weightUnit}</div>
                            <div>Reps</div>
                            <div className="text-xs rounded-full h-6 w-6 flex items-center justify-center focus:outline-none">{'❌'}</div>
                            <div className="text-green-500 text-xs rounded-full h-6 w-6 flex items-center justify-center focus:outline-none">&#10003;</div>
                        </div>
                    </div>

                    {exerciseSets[exerciseIndex] && exerciseSets[exerciseIndex].map((set, setIndex) => (
                        <div key={setIndex} className="flex flex-row justify-between mt-2">
                            <button className="text-center rounded focus:outline-none bg-gray-200 w-5">
                                {set.setNum}
                            </button>

                            <div className="text-center">--</div>

                            <div className="flex flex-row space-x-5">
                                <input
                                    type="text"
                                    id={`weight_${exerciseIndex}_${setIndex}`}
                                    value={exerciseSets[exerciseIndex][setIndex].weight}
                                    onChange={(e) => handleWeightChange(exerciseIndex, setIndex, e.target.value)}
                                    className="rounded focus:outline-none bg-gray-200 w-8"
                                    placeholder=""
                                />

                                <input
                                    type="text"
                                    id={`reps_${exerciseIndex}_${setIndex}`}
                                    value={exerciseSets[exerciseIndex][setIndex].reps}
                                    onChange={(e) => handleRepsChange(exerciseIndex, setIndex, e.target.value)}
                                    className="rounded focus:outline-none bg-gray-200 w-8"
                                    placeholder=""
                                />

                                <button className="text-xs text-black rounded-full h-6 w-6 flex items-center justify-center focus:outline-none">{'❌'}</button>

                                <button className="text-xs bg-gray-100 rounded-full h-6 w-6 flex items-center justify-center focus:outline-none">&#10003;</button>
                            </div>
                        </div>
                    ))}



                    <button className='bg-gray-200 px-4 rounded mt-3' onClick={() => addSet(exercise.name, exerciseIndex)}>Add Set</button>
                </div>
            ))
            }


        </div >
    );

}

export default Exercise;

