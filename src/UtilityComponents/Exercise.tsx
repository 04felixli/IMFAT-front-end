// This component renders the exercise tracking (eg. sets, reps, weight)
import React from "react";
import { add } from "date-fns";
import { useState, useEffect, useRef } from "react";
// import ConfirmRemoveExercise from "./ConfirmRemoveExercise";
import ModelExerciseInList from "../Models/ModelExerciseInList";
import ModelExercise from "../Models/ModelExercise";
import { fetchAutoFillInfo } from "../MainComponents/lib";
import ModelSet from "../Models/ModelSet";

interface Props {
    isConfirmRemoveExerciseOpen: boolean;
    setIsConfirmRemoveExerciseOpen: React.Dispatch<React.SetStateAction<boolean>>;
    addedExercises: ModelExerciseInList[];
    setAddedExercises: React.Dispatch<React.SetStateAction<ModelExerciseInList[]>>;
    addedExerciseIds: number[];
    setAddedExerciseIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const Exercise = ({ addedExercises, setAddedExercises, isConfirmRemoveExerciseOpen, setIsConfirmRemoveExerciseOpen, addedExerciseIds, setAddedExerciseIds }: Props) => {

    // array of exercises with sets 
    const [exercises, setExercises] = useState<ModelExercise[]>([]);

    // Copy of above to hold previous values 
    const [oldExercises, setOldExercises] = useState<ModelExercise[]>([]);

    // Auto fill exercise info 
    useEffect(() => {

        fetchAutoFillInfo(addedExerciseIds).then((response) => {
            // console.log(response);

            setOldExercises(response);

            setExercises(response);
        });

    }, [addedExerciseIds]);

    // exerciseIds[] = [1] length = 1

    // exercises[] = [0] length = 0

    // 2 - 1 = 1

    useEffect(() => {
        console.log("exercises are: ", exercises)
    }, [exercises]);

    // // An array of arrays holding objects for each exercise and its sets. Each set object has a set number, weight, and reps. 
    // const [exerciseSets, setExerciseSets] = useState([]);

    // // Update exercise sets when user adds new exercises
    // useEffect(() => {
    //     if (addedExercises.length !== 0) {

    //         const exercisesToAdd = addedExercises.filter(exercise =>
    //             !exerciseSets.some(existingExercise =>
    //                 existingExercise.some(set =>
    //                     set.name === exercise.name
    //                 )
    //             )
    //         );

    //         const newExerciseSets = exercisesToAdd.map(exercise => [{
    //             name: exercise.name,
    //             setNum: 1,
    //             weight: '',
    //             reps: ''
    //         }]);

    //         setExerciseSets(prev => [...prev, ...newExerciseSets]);
    //     }
    // }, [addedExercises]);

    const addSet = (exerciseIndex: number) => {
        setExercises(prevExercises => {

            const exercisesCopy: ModelExercise[] = prevExercises.map(exercise => ({ ...exercise }));

            const weight_unit: string = exercisesCopy[exerciseIndex].sets[0].weight_unit;
            const set_number: number = exercisesCopy[exerciseIndex].sets.length + 1;

            const set: ModelSet = {
                weight: -1,
                reps: -1,
                weight_unit: weight_unit,
                set_number: set_number
            }

            exercisesCopy[exerciseIndex].sets = [...exercisesCopy[exerciseIndex].sets, set];

            return exercisesCopy;
        });
    };

    const handleWeightChange = (set: ModelSet, exerciseIndex: number, setIndex: number, value: string) => {
        setExercises(prevExercises => {

            const exercisesCopy: ModelExercise[] = prevExercises.map(exercise => ({ ...exercise }));

            exercisesCopy[exerciseIndex].sets[setIndex].weight = value === '' ? -1 : parseInt(value);

            return exercisesCopy
        });

    };

    const handleRepsChange = (set: ModelSet, exerciseIndex: number, setIndex: number, value: string) => {

        setExercises(prevExercises => {

            const exercisesCopy: ModelExercise[] = prevExercises.map(exercise => ({ ...exercise }));

            exercisesCopy[exerciseIndex].sets[setIndex].reps = value === '' ? -1 : parseInt(value);

            return exercisesCopy
        });

    };

    const handleWeightUnitChange = (exercise: ModelExercise, exerciseIndex: number) => {

        exercise.sets[0].weight_unit = (exercise.sets[0].weight_unit === 'lbs' ? 'kg' : 'lbs');

        // const updatedAddedExercises = [...addedExercises];
        // updatedAddedExercises[exerciseIndex].weightUnit === 'lbs' ? updatedAddedExercises[exerciseIndex].weightUnit = 'kg' : updatedAddedExercises[exerciseIndex].weightUnit = 'lbs';
        // setAddedExercises(updatedAddedExercises);
    }

    // const handleRemoveExercise = (exerciseIndex) => {
    //     const updatedAddedExercises = addedExercises.filter((_, index) => index !== exerciseIndex);
    //     const updatedExerciseSets = exerciseSets.filter((_, index) => index !== exerciseIndex);

    //     setAddedExercises(updatedAddedExercises);
    //     setExerciseSets(updatedExerciseSets);
    // }

    // useEffect(() => {
    //     console.log("Exercise Sets ", exerciseSets);
    // }, [exerciseSets]);

    // useEffect(() => {
    //     console.log("added exercises: ", addedExercises);
    // }, [addedExercises]);


    return (
        <div className={exercises ? 'flex flex-col mt-5' : 'hidden'}>
            {exercises.map((exercise, exerciseIndex) => (
                <div key={exerciseIndex} className='flex flex-col mt-5'>

                    <div className="flex flex-row justify-between text-blue-500">
                        <button>
                            {exercise.name}
                        </button>

                        <div className="flex flex-row space-x-5">
                            <button className="text-sm text-blue-500 bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center focus:outline-none"
                                onClick={() => handleWeightUnitChange(exercise, exerciseIndex)}
                            >
                                {exercise.sets[0].weight_unit}
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

                            {/* <ConfirmRemoveExercise exerciseIndex={exerciseIndex}
                                isConfirmRemoveExerciseOpen={isConfirmRemoveExerciseOpen}
                                setIsConfirmRemoveExerciseOpen={setIsConfirmRemoveExerciseOpen}
                                addedExercises={addedExercises}
                                setAddedExercises={setAddedExercises}
                                // exerciseSets={exerciseSets}
                                // setExerciseSets={setExerciseSets}
                            /> */}

                        </div>
                    </div>

                    <div className="flex flex-row justify-between mt-2">
                        <div>Set</div>
                        <div>Previous</div>

                        <div className="flex flex-row space-x-5">
                            <div>{exercise.sets[0].weight_unit}</div>
                            <div>Reps</div>
                            <div className="text-xs rounded-full h-6 w-6 flex items-center justify-center focus:outline-none">{'❌'}</div>
                            <div className="text-green-500 text-xs rounded-full h-6 w-6 flex items-center justify-center focus:outline-none">&#10003;</div>
                        </div>
                    </div>

                    {exercise.sets.map((set, setIndex) => (
                        <div key={setIndex} className="flex flex-row justify-between mt-2">
                            <button className="text-center rounded focus:outline-none bg-gray-200 w-5">
                                {set.set_number}
                            </button>

                            <div className="text-center">
                                {(oldExercises[exerciseIndex]?.sets[setIndex] && oldExercises[exerciseIndex]?.sets[setIndex].weight >= 0 && oldExercises[exerciseIndex]?.sets[setIndex].reps >= 0) ? oldExercises[exerciseIndex].sets[setIndex].weight + oldExercises[exerciseIndex].sets[setIndex].weight_unit + ' x ' + oldExercises[exerciseIndex].sets[setIndex].reps : '--'}
                            </div>

                            <div className="flex flex-row space-x-5">
                                <input
                                    type="text"
                                    id={`weight_${exerciseIndex}_${setIndex}`}
                                    value={set.weight >= 0 ? set.weight : ''}
                                    onChange={(e) => handleWeightChange(set, exerciseIndex, setIndex, e.target.value)}
                                    className="rounded focus:outline-none bg-gray-200 w-8"
                                    placeholder={oldExercises[exerciseIndex]?.sets[setIndex]?.weight >= 0 ? oldExercises[exerciseIndex].sets[setIndex].weight.toString() : ''}
                                />

                                <input
                                    type="text"
                                    id={`reps_${exerciseIndex}_${setIndex}`}
                                    value={set.reps >= 0 ? set.reps : ''}
                                    onChange={(e) => handleRepsChange(set, exerciseIndex, setIndex, e.target.value)}
                                    className="rounded focus:outline-none bg-gray-200 w-8"
                                    placeholder={oldExercises[exerciseIndex]?.sets[setIndex]?.reps >= 0 ? oldExercises[exerciseIndex].sets[setIndex].reps.toString() : ''}
                                />

                                <button className="text-xs text-black rounded-full h-6 w-6 flex items-center justify-center focus:outline-none">{'❌'}</button>

                                <button className="text-xs bg-gray-100 rounded-full h-6 w-6 flex items-center justify-center focus:outline-none">&#10003;</button>
                            </div>
                        </div>
                    ))}

                    <button className='bg-gray-200 px-4 rounded mt-3' onClick={() => addSet(exerciseIndex)}>Add Set</button>
                </div>
            ))
            }


        </div >
    );

}

export default Exercise;

