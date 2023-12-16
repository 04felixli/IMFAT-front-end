import React from 'react';
import './Styles/ExerciseList.css';
import { useState, useEffect } from 'react';
import { add, format } from "date-fns";
// import GrayedBg from './GrayedBg';
import { fetchExercises, fetchAutoFillInfo } from '../MainComponents/lib';
import ModelExerciseInList from '../Interfaces/ResponseModels/IResponseModelExerciseInList';
import GrayBg from './GrayBg';
import ModelExercise from '../Models/ModelExercise';

interface Props {
    exercises: ModelExercise[];
    setExercises: React.Dispatch<React.SetStateAction<ModelExercise[]>>;
    oldExercises: ModelExercise[];
    setOldExercises: React.Dispatch<React.SetStateAction<ModelExercise[]>>;
    exerciseIndexToReplace: number;
    setExerciseIndexToReplace: React.Dispatch<React.SetStateAction<number>>;
    addOrReplaceExercise: string;
    setAddOrReplaceExercise: React.Dispatch<React.SetStateAction<string>>;
    isAddExerciseOpen: boolean;
    setIsAddExerciseOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setAddedExerciseIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const ExerciseList = ({ exercises, setExercises, oldExercises, setOldExercises, exerciseIndexToReplace, setExerciseIndexToReplace, addOrReplaceExercise, setAddOrReplaceExercise, isAddExerciseOpen, setIsAddExerciseOpen, setAddedExerciseIds }: Props) => {

    // Store the list of exercises
    const [exerciseList, setExerciseList] = useState<ModelExerciseInList[] | null>(null) // "exercises" = null when first fetching data, [] when api doesn't find any exercises
    const [selectedExerciseIds, setSelectedExerciseIds] = useState<number[]>([]);

    // const [selectedExercises, setSelectedExercises] = useState<ModelExerciseInList[]>([]);
    const [searchInput, setSearchInput] = useState<string>('');

    // get list of exercises on user input
    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        fetchExercises(e.target.value).then((response) => {
            setExerciseList(response);
        });

        setSearchInput(e.target.value);
    };

    // get initial list of exercises when component first loads
    useEffect(() => {
        fetchExercises().then((response) => {
            setExerciseList(response);
        });
    }, []);

    const handleExerciseSelection = (exercise: ModelExerciseInList): void => {

        if (isSelected(exercise)) {
            if (addOrReplaceExercise === "Add") {
                setSelectedExerciseIds((prev) => prev.filter(id => id !== exercise.id)) // remove id if already selected
            } else {
                setSelectedExerciseIds([]); // Clear selected exercises 
            }
        } else {
            if (addOrReplaceExercise === "Add") {
                setSelectedExerciseIds((prev) => [...prev, exercise.id]); // add id if not selected
            } else {
                setSelectedExerciseIds([exercise.id]) // Can only have one exercise for replacing exercise 
            }
        }

        // isSelected(exercise) ?
        // setSelectedExerciseIds((prev) => prev.filter(id => id !== exercise.id)) : // remove id if already selected 
        // setSelectedExerciseIds((prev) => [...prev, exercise.id]); // add id if not selected 
    }

    const isSelected = (exercise: ModelExerciseInList): boolean => {

        const { id } = exercise;

        return selectedExerciseIds.includes(id);

    }

    const handleAddExercise = (): void => {
        if (addOrReplaceExercise === "Add") {
            setAddedExerciseIds((prev) => [
                ...prev,
                ...selectedExerciseIds.filter(
                    (selectedExerciseId) => !prev.some((id) => id === selectedExerciseId)
                )
            ]);
        } else {
            setAddedExerciseIds((prev) => {
                const addedExerciseIdsCopy = [...prev];

                addedExerciseIdsCopy[exerciseIndexToReplace] = selectedExerciseIds[0]; // change the exercise id for replace

                console.log(addedExerciseIdsCopy)

                return addedExerciseIdsCopy;
            })

            fetchAutoFillInfo(selectedExerciseIds).then((response) => {
                setExercises(prevExercises => {

                    const exercisesCopy: ModelExercise[] = prevExercises.map(exercise => ({
                        ...exercise,
                        sets: exercise.sets.map(set => ({ ...set }))
                    }));

                    exercisesCopy[exerciseIndexToReplace] = response[0];

                    return exercisesCopy;
                });

                setOldExercises(prevExercises => {

                    const exercisesCopy: ModelExercise[] = prevExercises.map(exercise => ({
                        ...exercise,
                        sets: exercise.sets.map(set => ({ ...set }))
                    }));

                    exercisesCopy[exerciseIndexToReplace] = response[0];

                    return exercisesCopy;
                });
            });
        }

        setSelectedExerciseIds([]);
        setIsAddExerciseOpen(false);
        setAddOrReplaceExercise("Add");
        setExerciseIndexToReplace(-1);
    }

    const closePopUp = (): void => {
        setIsAddExerciseOpen(false);
        setAddOrReplaceExercise("Add");
    }

    return (
        <div className={isAddExerciseOpen ? '' : 'hidden'}>
            <div className='rounded showAddExerciseList'>
                <div className='flex flex-row justify-between w-full px-4 mt-5'>
                    <button className='text-blue-500' onClick={() => handleAddExercise()}>
                        {addOrReplaceExercise}
                    </button>

                    <div className='flex'>
                        <button className='pr-2 text-blue-500'>
                            New
                        </button>
                        <button onClick={() => setIsAddExerciseOpen(false)}>
                            <svg
                                className="h-8 w-8 text-gray-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className='mt-5 w-11/12'>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                            <label htmlFor="SearchExercise">
                                <img
                                    src='/SearchIcon.svg'
                                    alt="Search Icon"
                                    className="h-5 w-5"
                                />
                            </label>
                        </span>
                        <input
                            type="text"
                            id="SearchExercise"
                            value={searchInput}
                            onChange={handleSearchInput}
                            className="w-full rounded focus:outline-none pl-10 bg-gray-200 p-2"
                            placeholder="Search"
                        />
                    </div>
                </div>

                <ul className='w-full mt-5'>
                    {
                        !exerciseList ? (
                            <li>Loading...</li>
                        ) : exerciseList.length !== 0 ? (
                            exerciseList.map((exercise, index) => (
                                <li key={index} className={`border px-4 ${isSelected(exercise) ? 'bg-blue-100' : ''}`} onClick={() => handleExerciseSelection(exercise)}>
                                    <div className='flex flex-row justify-between'>
                                        <div>
                                            {exercise.name}
                                        </div>

                                        <div>
                                            {'(' + exercise.equipment + ')'}
                                        </div>
                                    </div>

                                    <div className='text-gray-700 font-normal'>
                                        {exercise.target_muscle ? exercise.target_muscle : ''}
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li>Could not find "{searchInput}"</li>
                        )
                    }
                </ul>
            </div>

            <GrayBg onClick={closePopUp} />
        </div>
    )
}

export default ExerciseList;





