// This component renders a pop-up to confirm if user wants to replace an exercise

import React from "react";
import GrayBg from "./GrayBg";

interface Props {
    setShowReplaceExercisePopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmReplaceExercise = ({ setShowReplaceExercisePopUp }: Props) => {

    const closePopUp = (): void => {
        setShowReplaceExercisePopUp(false);
    }

    const handleReplaceExercise = (): void => {
        setShowReplaceExercisePopUp(false);
        console.log("Replacing Exercise");
    }

    return (
        <div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-90 h-80vh bg-white z-50 flex flex-col items-center">
                <div>Replace Exercise?</div>
                <p className="text-sm">This replaces __________ and all of your current progress</p>
                <div className="flex flex-row justify-around w-full">
                    <button onClick={closePopUp}>Cancel</button>
                    <button onClick={handleReplaceExercise}>Replace</button>
                </div>
            </div>

            <GrayBg onClick={closePopUp} />
        </div>
    )

};

export default ConfirmReplaceExercise; 