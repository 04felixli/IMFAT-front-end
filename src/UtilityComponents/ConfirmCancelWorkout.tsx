// This component renders a pop-up to confirm cancelling a workout

import React from "react";
import ModelExercise from "../Models/ModelExercise";
import GrayBg from "./GrayBg";

interface Props {
    setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
    setShowCancelWorkoutPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmCancelWorkout = ({ setIsStarted, setShowCancelWorkoutPopUp }: Props) => {

    const closePopUp = (): void => {
        setShowCancelWorkoutPopUp(false);
    }

    const handleCancelWorkout = (): void => {
        setIsStarted(false);
    }

    return (
        <div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-90 h-80vh bg-white z-50 flex flex-col items-center">
                <div>Cancel Workout?</div>
                <p className="text-sm">All workout progress will be lost.</p>
                <div className="flex flex-row justify-around w-full">
                    <button onClick={handleCancelWorkout} className="text-red-500 bg-red-100">Cancel Workout</button>
                    <button onClick={closePopUp}>Resume</button>
                </div>
            </div>

            <GrayBg onClick={closePopUp} />
        </div>
    )
};

export default ConfirmCancelWorkout; 