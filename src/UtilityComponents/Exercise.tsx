// This component renders the exercise tracking (eg. sets, reps, weight)
import React from "react";
import { add } from "date-fns";
import { useState, useEffect, useRef } from "react";
import ConfirmRemoveExercise from "./ConfirmRemoveExercise";
import ModelExerciseInList from "../Interfaces/ResponseModels/IResponseModelExerciseInList";
import ModelExercise from "../Models/ModelExercise";
import { fetchAutoFillInfo } from "../MainComponents/lib";
import ModelSet from "../Models/ModelSet";
import SetButtonDropDown from "./SetButtonDropDown";


interface Props {
    exercises: ModelExercise[];
    setExercises: React.Dispatch<React.SetStateAction<ModelExercise[]>>;
    oldExercises: ModelExercise[];
    setOldExercises: React.Dispatch<React.SetStateAction<ModelExercise[]>>;
    isConfirmRemoveExerciseOpen: boolean;
    setIsConfirmRemoveExerciseOpen: React.Dispatch<React.SetStateAction<boolean>>;
    addedExerciseIds: number[];
    setAddedExerciseIds: React.Dispatch<React.SetStateAction<number[]>>;
    exerciseIndexToRemove: number;
    setExerciseIndexToRemove: React.Dispatch<React.SetStateAction<number>>;
    showReplaceExercisePopUp: boolean; 
    setShowReplaceExercisePopUp: React.Dispatch<React.SetStateAction<boolean>>; 
}

const Exercise = ({ exercises, setExercises, oldExercises, setOldExercises, isConfirmRemoveExerciseOpen, setIsConfirmRemoveExerciseOpen, addedExerciseIds, setAddedExerciseIds, exerciseIndexToRemove, setExerciseIndexToRemove, showReplaceExercisePopUp, setShowReplaceExercisePopUp }: Props) => {

    // Auto fill exercise info 
    useEffect(() => {

        let ignore = false;

        if (addedExerciseIds.length !== exercises.length) {
            const newlyAddedExerciseIds: number[] = addedExerciseIds.slice(exercises.length);

            fetchAutoFillInfo(newlyAddedExerciseIds).then((response) => {
                if (!ignore) {
                    setOldExercises(prev => [...prev, ...response]);

                    setExercises(prev => [...prev, ...response]);
                }
            });
        }

        console.log("exercise ids changed")

        return () => {
            ignore = true;
        };

    }, [addedExerciseIds]);

    const addSet = (exerciseIndex: number): void => {
        setExercises(prevExercises => {

            const exercisesCopy: ModelExercise[] = prevExercises.map(exercise => ({
                ...exercise,
                sets: exercise.sets.map(set => ({ ...set }))
            }));

            // const weight_unit: string = exercisesCopy[exerciseIndex].sets[0].weight_unit;

            const weight_unit: string = exercisesCopy[exerciseIndex].sets.length > 0 ? exercisesCopy[exerciseIndex].sets[0].weight_unit : oldExercises[exerciseIndex].sets[0].weight_unit
            const set_number: number = exercisesCopy[exerciseIndex].sets.length + 1;

            const set: ModelSet = {
                weight: -1,
                reps: -1,
                weight_unit: weight_unit,
                set_number: set_number,
                isCompleted: false,
            }

            exercisesCopy[exerciseIndex].sets = [...exercisesCopy[exerciseIndex].sets, set];

            return exercisesCopy;
        });
    };

    const handleWeightChange = (set: ModelSet, exerciseIndex: number, setIndex: number, value: string): void => {
        setExercises(prevExercises => {

            const exercisesCopy: ModelExercise[] = prevExercises.map(exercise => ({
                ...exercise,
                sets: exercise.sets.map(set => ({ ...set }))
            }));

            exercisesCopy[exerciseIndex].sets[setIndex].weight = value === '' ? -1 : parseInt(value);

            return exercisesCopy
        });

    };

    const handleRepsChange = (exerciseIndex: number, setIndex: number, value: string): void => {

        setExercises(prevExercises => {

            const exercisesCopy: ModelExercise[] = prevExercises.map(exercise => ({
                ...exercise,
                sets: exercise.sets.map(set => ({ ...set }))
            }));

            exercisesCopy[exerciseIndex].sets[setIndex].reps = value === '' ? -1 : parseInt(value);

            return exercisesCopy
        });
    };

    const handleWeightUnitChange = (exercise: ModelExercise, exerciseIndex: number): void => {

        exercise.sets[0].weight_unit = (exercise.sets[0].weight_unit === 'lbs' ? 'kg' : 'lbs');
    }

    const handleRemoveExercise = (exerciseIndex: number): void => {
        setExerciseIndexToRemove(exerciseIndex);
        setIsConfirmRemoveExerciseOpen(true);
    }

    // useEffect(() => {
    //     console.log("Exercise Sets ", exerciseSets);
    // }, [exerciseSets]);

    // useEffect(() => {
    //     console.log("added exercises: ", addedExercises);
    // }, [addedExercises]);


    const handleNotesChange = (exerciseIndex: number, value: string): void => {
        setExercises(prevExercises => {

            const exercisesCopy: ModelExercise[] = prevExercises.map(exercise => ({ ...exercise }));

            exercisesCopy[exerciseIndex].notes = value;

            return exercisesCopy
        });
    }

    const handleSetCompletion = (exerciseIndex: number, setIndex: number): void => {
        setExercises(prevExercises => {
            const exercisesCopy: ModelExercise[] = prevExercises.map(exercise => ({
                ...exercise,
                sets: exercise.sets.map(set => ({ ...set })),
            }));

            exercisesCopy[exerciseIndex].sets[setIndex] = {
                ...exercisesCopy[exerciseIndex].sets[setIndex],
                isCompleted: !exercisesCopy[exerciseIndex].sets[setIndex].isCompleted,
            };

            return exercisesCopy;
        });
    };

    // useEffect(() => {
    //     console.log("Component re-rendered")
    // }, []);

    // useEffect(() => {
    //     console.log("exercises are: ", exercises);
    //     console.log("exercise Ids are: ", addedExerciseIds);
    // }, [exercises, addedExerciseIds]);

    return (
        <div className={exercises ? 'flex flex-col mt-5' : 'hidden'}>
            {exercises.map((exercise, exerciseIndex) => (
                <div key={exerciseIndex} className='flex flex-col mt-5'>

                    <div className="flex flex-row justify-between text-blue-500">
                        <button>
                            {exercise.name + ' (' + exercise.equipment + ') '}
                        </button>

                        <div className="flex flex-row space-x-5">
                            <button className="text-sm text-blue-500 bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center focus:outline-none"
                                onClick={() => handleWeightUnitChange(exercise, exerciseIndex)}
                            >
                                {exercise.sets.length > 0 ? exercise.sets[0].weight_unit : oldExercises[exerciseIndex].sets[0].weight_unit}
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
                                <img
                                    src='/RemoveExerciseIcon.svg'
                                    alt="Remove Exercise Icon"
                                    className="h-4 w-4"
                                    onClick={() => handleRemoveExercise(exerciseIndex)}
                                />
                                {/* {'❌'} */}
                            </button>

                            {isConfirmRemoveExerciseOpen && <ConfirmRemoveExercise exerciseIndexToRemove={exerciseIndexToRemove}
                                setExerciseIndexToRemove={setExerciseIndexToRemove}
                                isConfirmRemoveExerciseOpen={isConfirmRemoveExerciseOpen}
                                setIsConfirmRemoveExerciseOpen={setIsConfirmRemoveExerciseOpen}
                                addedExerciseIds={addedExerciseIds}
                                setAddedExerciseIds={setAddedExerciseIds}
                                exercises={exercises}
                                setExercises={setExercises}
                                oldExercises={oldExercises}
                                setOldExercises={setOldExercises}
                            />}

                        </div>
                    </div>

                    <div>
                        <textarea
                            id={`notes_${exerciseIndex}`}
                            value={exercise.notes ? exercise.notes : ''}
                            onChange={(e) => {
                                handleNotesChange(exerciseIndex, e.target.value);
                                e.target.style.height = 'auto'; // Reset height to auto
                                e.target.style.height = `${e.target.scrollHeight}px`; // Set height to scrollHeight
                            }}
                            className="rounded focus:outline-none bg-transparent border-b border-gray-300 w-full mt-2 resize-none overflow-hidden min-h-8 h-auto"
                            placeholder={exercise.notes ? exercise.notes : 'Add Notes'}
                        />
                    </div>

                    <div className="flex flex-row justify-between mt-2">
                        <div>Set</div>
                        <div>Previous</div>

                        <div className="flex flex-row space-x-5">
                            <div>{exercise.sets.length > 0 ? exercise.sets[0].weight_unit : oldExercises[exerciseIndex].sets[0].weight_unit}</div>
                            <div>Reps</div>
                            <div className="text-green-500 text-xs rounded-full h-6 w-6 flex items-center justify-center focus:outline-none">&#10003;</div>
                        </div>
                    </div>

                    {exercise.sets.map((set, setIndex) => (
                        <div key={setIndex} className={`flex flex-row justify-between mt-2 ${exercise.sets[setIndex].isCompleted ? 'bg-green-100' : ''}`}>

                            <SetButtonDropDown set_number={set.set_number} exerciseIndex={exerciseIndex} isCompleted={exercise.sets[setIndex].isCompleted} setExercises={setExercises} />

                            <div className="text-center">
                                {(oldExercises[exerciseIndex]?.sets[setIndex] && oldExercises[exerciseIndex]?.sets[setIndex].weight >= 0 && oldExercises[exerciseIndex]?.sets[setIndex].reps >= 0) ? oldExercises[exerciseIndex].sets[setIndex].weight + oldExercises[exerciseIndex].sets[setIndex].weight_unit + ' x ' + oldExercises[exerciseIndex].sets[setIndex].reps : '--'}
                            </div>

                            <div className="flex flex-row space-x-5">
                                <input
                                    type="text"
                                    id={`weight_${exerciseIndex}_${setIndex}`}
                                    value={set.weight >= 0 ? set.weight : ''}
                                    onChange={(e) => handleWeightChange(set, exerciseIndex, setIndex, e.target.value)}
                                    className={`rounded focus:outline-none w-8 ${exercise.sets[setIndex].isCompleted ? 'bg-green-100' : 'bg-gray-200'}`}
                                    placeholder={oldExercises[exerciseIndex]?.sets[setIndex]?.weight >= 0 ? oldExercises[exerciseIndex].sets[setIndex].weight.toString() : ''}
                                />

                                <input
                                    type="text"
                                    id={`reps_${exerciseIndex}_${setIndex}`}
                                    value={set.reps >= 0 ? set.reps : ''}
                                    onChange={(e) => handleRepsChange(exerciseIndex, setIndex, e.target.value)}
                                    className={`rounded focus:outline-none w-8 ${exercise.sets[setIndex].isCompleted ? 'bg-green-100' : 'bg-gray-200'}`}
                                    placeholder={oldExercises[exerciseIndex]?.sets[setIndex]?.reps >= 0 ? oldExercises[exerciseIndex].sets[setIndex].reps.toString() : ''}
                                />

                                <button className={`text-xs rounded-full h-6 w-6 flex items-center justify-center focus:outline-none ${exercise.sets[setIndex].isCompleted ? 'bg-green-500' : 'bg-gray-100'}`} onClick={() => handleSetCompletion(exerciseIndex, setIndex)}>&#10003;</button>
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

