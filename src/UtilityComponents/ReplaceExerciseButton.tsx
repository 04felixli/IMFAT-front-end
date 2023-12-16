// This component renders the button that replaces an exercise, a long with the logic behind rendering the pop up confirmation. 

import React, { useState } from "react";
import ConfirmReplaceExercise from "./ConfirmReplaceExercise";
import GrayBg from "./GrayBg";
import ModelExercise from "../Models/ModelExercise";

interface Props {
    exercises: ModelExercise[];
    setExercises: React.Dispatch<React.SetStateAction<ModelExercise[]>>;
    exerciseIndex: number;
    setExerciseIndexToReplace: React.Dispatch<React.SetStateAction<number>>;
    oldExercises: ModelExercise[];
    setOldExercises: React.Dispatch<React.SetStateAction<ModelExercise[]>>;
    addedExerciseIds: number[];
    setAddedExerciseIds: React.Dispatch<React.SetStateAction<number[]>>;
    addOrReplaceExercise: string;
    setAddOrReplaceExercise: React.Dispatch<React.SetStateAction<string>>
    setIsAddExerciseOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReplaceExerciseButton = ({ exercises, setExercises, exerciseIndex, setExerciseIndexToReplace, oldExercises, setOldExercises, addedExerciseIds, setAddedExerciseIds, addOrReplaceExercise, setAddOrReplaceExercise, setIsAddExerciseOpen }: Props) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openPopUp = (): void => {
        setIsOpen(true);
    }

    const closePopUp = (): void => {
        setIsOpen(false);
    }

    const openExerciseList = (): void => {
        setIsOpen(false);
        setExerciseIndexToReplace(exerciseIndex);
        setAddOrReplaceExercise("Replace");
        setIsAddExerciseOpen(true);
    }

    return (
        <div>
            <button className="text-sm bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center focus:outline-none">
                <img
                    src='/ReplaceExerciseIcon.svg'
                    alt="Replace Exercise Icon"
                    className="h-4 w-4"
                    onClick={() => openPopUp()}
                />
            </button>

            {isOpen && (<div>
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-90 h-80vh bg-white z-50 flex flex-col items-center">
                    <div>Replace Exercise?</div>
                    <p className="text-sm">This replaces { } and all of your current progress</p>
                    <div className="flex flex-row justify-around w-full">
                        <button onClick={closePopUp}>Cancel</button>
                        <button onClick={openExerciseList}>Replace</button>
                    </div>
                </div>

                <GrayBg onClick={closePopUp} />
            </div>)}

            {/* {showReplaceExercisePopUp && <ConfirmReplaceExercise setShowReplaceExercisePopUp={setShowReplaceExercisePopUp} />} */}
        </div>
    )
};

export default ReplaceExerciseButton; 