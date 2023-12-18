// This component handles the workout history pop up 

import React, { useState } from "react";
import { useEffect } from "react";
import GrayBg from "../../../../UtilityComponents/GrayBg";
import { fetchWorkoutHistoryWithDetails } from "../../../../Library/lib";
import ModelWorkoutHistory from "../../../../Models/ModelWorkoutHistory";
import ModelExercise from "../../../../Models/ModelExercise";
import Exercise from "../../../../UtilityComponents/Exercise";

interface Props {
    workoutHistoryIdToShow: number | null;
    closePopUp: () => void;
    formatDate: (inputDate: string) => string;
    formatDuration: (totalSeconds: number) => string;
}

const WorkoutHistoryDetails = ({ workoutHistoryIdToShow, closePopUp, formatDate, formatDuration }: Props) => {

    const [workoutHistory, setWorkoutHistory] = useState<ModelWorkoutHistory<ModelExercise> | null>(null);

    useEffect(() => {

        let ignore = false;

        fetchWorkoutHistoryWithDetails(workoutHistoryIdToShow).then((response: ModelWorkoutHistory<ModelExercise>) => {
            if (!ignore) {
                setWorkoutHistory(response);
                console.log(response);
            }
        });

        return () => {
            ignore = true;
        };

    }, []);

    return (
        <div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 rounded h-5/6 overflow-y-auto bg-white z-50 flex flex-col p-4">
                {
                    workoutHistory &&

                    <div>
                        <section className="border-b border-gray-400 pb-1">
                            <div className="font-bold text-center text-lg">{workoutHistory.name}</div>
                            <div>{formatDate(workoutHistory.date)}</div>
                            <div>{formatDuration(workoutHistory.duration)}</div>
                            <div>{workoutHistory.type}</div>
                        </section>

                        <section className="mt-3">
                            {workoutHistory?.exercises_done_in_workout.map((exercise, index) => (
                                <div key={`exerciseHistory${index}`} className="mb-1">
                                    <div className="text-gray-600 font-bold">{exercise.name + ' (' + exercise.equipment + ') '}</div>
                                    <p className="whitespace-pre-line text-sm">{exercise.notes}</p>
                                    <ul className="mt-1">
                                        {exercise.sets.map((set, index) => (
                                            <li key={`exerciseHistorySet${index}`} className="flex items-center">
                                                <span className="mr-4">{set.set_number}</span>
                                                <span>{set.weight} {set.weight_unit} x {set.reps}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </section>
                    </div>
                }
            </div>

            {workoutHistory && <GrayBg onClick={closePopUp} />}

        </div>
    )
}

export default WorkoutHistoryDetails; 