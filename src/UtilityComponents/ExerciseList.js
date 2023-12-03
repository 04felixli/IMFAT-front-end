import './Styles/ExerciseList.css';
import { useState, useEffect } from 'react';
import { add, format } from "date-fns";
import GrayedBg from './GrayedBg';
import { fetchExercises } from '../MainComponents/lib';



function ExerciseList({ isAddExerciseOpen, setIsAddExerciseOpen, exercisesList, addedExercises, setAddedExercises }) {

    // Store the list of exercises
    const [exercises, setExercises] = useState(null);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    // get list of exercises on user input
    const handleSearchInput = (e) => {
        fetchExercises(e.target.value).then((response) => {
            setExercises(response);
        });

        setSearchInput(e.target.value);
    };

    // get initial list of exercises when component first loads
    useEffect(() => {
        console.log("Fetching initial list of exercises...")
        fetchExercises().then((response) => {
            setExercises(response);
        });
    }, []);

    const handleExerciseSelection = (exercise) => {

        const exerciseToFind = isSelected(exercise);

        // unselect or select the exercise depending on if it is selected already or not
        exerciseToFind === null ?
            setSelectedExercises((prev) => [...prev, exercise]) :
            setSelectedExercises((prev) => prev.filter(item => item !== exerciseToFind));
    }

    const isSelected = (exercise) => {
        const exerciseToFind = selectedExercises.find(item => item.name === exercise.name
            && item.target_muscle === exercise.target_muscle
            && item.equipment === exercise.equipment);

        return exerciseToFind === undefined ? null : exerciseToFind;
    }

    const handleAddExercise = () => {
        setAddedExercises((prev) => [
            ...prev,
            ...selectedExercises.filter(
                (selectedExercise) => !prev.some((addedExercise) => addedExercise.name === selectedExercise.name
                    && addedExercise.target_muscle === selectedExercise.target_muscle
                    && addedExercise.equipment === selectedExercise.equipment)
            )
        ]);

        setSelectedExercises([]);
        setIsAddExerciseOpen(false);
    }


    // useEffect(() => {
    //     console.log(selectedExercises);
    // }, [selectedExercises]);

    // useEffect(() => {
    //     console.log(addedExercises);
    // }, [addedExercises]);

    return (
        <div className={`rounded ${isAddExerciseOpen ? 'showAddExerciseList' : 'hidden'}`}>
            <div className='flex flex-row justify-between w-full px-4 mt-5'>
                <button className='text-blue-500' onClick={() => handleAddExercise()}>
                    Add
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
                    !exercises ? (
                        <li>Loading...</li>
                    ) : exercises.length !== 0 ? (
                        exercises.map((exercise, index) => (
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
    )
}

export default ExerciseList;




