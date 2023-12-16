// This component renders a button with the set number that creates a drop down when clicked for each set of an exercise. 

import React, { useState } from 'react';
import GrayBg from './GrayBg';
import ModelExercise from '../Models/ModelExercise';

interface Props {
    set_number: number;
    exerciseIndex: number;
    isCompleted: boolean;
    setExercises: React.Dispatch<React.SetStateAction<ModelExercise[]>>;

}

const SetButtonDropDown = ({ set_number, isCompleted, setExercises, exerciseIndex }: Props) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenu = (): void => {
        setIsOpen(!isOpen);
    };

    const handleSetDeletion = (): void => {
        setExercises(prevExercises => {

            const exercisesCopy: ModelExercise[] = prevExercises.map(exercise => ({
                ...exercise,
                sets: exercise.sets.map(set => ({ ...set }))
            }));

            const filteredExercisesCopy = exercisesCopy[exerciseIndex].sets.filter((set, index) => index !== exercisesCopy[exerciseIndex].sets.length - 1);

            exercisesCopy[exerciseIndex].sets = filteredExercisesCopy;

            return exercisesCopy;
        });

        toggleMenu();
    }

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className={`rounded focus:outline-none w-8 z-50 ${isCompleted ? 'bg-green-100' : 'bg-gray-200'}`}
                    onClick={toggleMenu}
                >
                    {set_number}
                </button>
            </div>

            {isOpen && (
                <>
                    <div className="origin-top-left absolute left-0 -mt-7 w-35 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <button className="rounded-md py-1 block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 text-xs" onClick={handleSetDeletion}>
                            Delete
                        </button>
                    </div>

                    <GrayBg onClick={toggleMenu} />
                </>
            )}
        </div>
    );
};

export default SetButtonDropDown;
