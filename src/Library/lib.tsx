// This file handles all API interactions 

import IRMExerciseInList from "../Interfaces/ResponseModels/IRMExerciseInList";
import ModelExercise from "../Models/ModelExercise";
import ModelSet from "../Models/ModelSet";
import ModelWorkout from "../Models/ModelWorkout";
import axios, { AxiosResponse } from 'axios';
import IRMWorkoutHistory from "../Interfaces/ResponseModels/IRMWorkoutHistory";
import IRMPastExercise from "../Interfaces/ResponseModels/IRMPastExercise";
import IRMPastSet from "../Interfaces/ResponseModels/IRMPastSet";
import ModelWorkoutHistory from "../Models/ModelWorkoutHistory";

const url = process.env.REACT_APP_API_URL;

// This function handles fetching exercises for exercise list
export const fetchExercises = async (searchInput = ''): Promise<IRMExerciseInList[]> => {
    try {
        const response: AxiosResponse<IRMExerciseInList[]> = await axios.get(`${url}/api/get_exercises?searchInput=${searchInput}`);

        if (response.status !== 200) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        return response.data;

    } catch (error) {
        console.error('There was an error fetching exercises: ', error);
        throw error;
    }
}

// This function handles fetching information to auto fill exercise tracking 
export const fetchAutoFillInfo = async (addedExerciseIds: number[]): Promise<ModelExercise[]> => {
    try {
        const idsAsString: string = addedExerciseIds.join(', ');

        const response: AxiosResponse<IRMPastExercise[]> = await axios.get(`${url}/api/get_latest_exercise_info?exercise_ids=${idsAsString}`);

        if (response.status !== 200) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const info: IRMPastExercise[] = response.data;

        const modifiedInfo: ModelExercise[] = info.map((exercise: IRMPastExercise) => {
            const setsWithCompletion: ModelSet[] = exercise.sets.map((set: IRMPastSet) => ({
                ...set,
                isCompleted: false, // Set the initial value of isCompleted for each set
            }));

            return {
                ...exercise,
                sets: setsWithCompletion,
            };
        });

        return modifiedInfo;

    } catch (error) {
        console.error('There was an error auto-filling exercise information: ', error);
        throw error;
    }
}

export const postWorkout = async (workout: ModelWorkout): Promise<void> => {
    try {
        const response: AxiosResponse<void> = await axios.post(`${url}/api/post_workout`, workout);

        if (response.status !== 200) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        // Can optionally return the response data if back end sends any
        // return response.data;

    } catch (error) {
        console.error('There was an error posting the workout: ', error);
        throw error;
    }
};

export const fetchWorkoutHistoryNoDetails = async (): Promise<ModelWorkoutHistory<string>[]> => {
    try {
        const response: AxiosResponse<IRMWorkoutHistory<string>[]> = await axios.get(`${url}/api/get_workout_history_without_details`);

        if (response.status !== 200) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const info: IRMWorkoutHistory<string>[] = response.data;

        const modifiedInfo: ModelWorkoutHistory<string>[] = info.map((workoutHistory: IRMWorkoutHistory<string>) => ({ ...workoutHistory }));

        return modifiedInfo;

    } catch (error) {
        console.error('There was an error fetching exercise history without details: ', error);
        throw error;
    }
}

export const fetchWorkoutHistoryWithDetails = async (workoutId: number | null): Promise<ModelWorkoutHistory<ModelExercise>> => {
    try {
        const response: AxiosResponse<IRMWorkoutHistory<IRMPastExercise>> = await axios.get(`${url}/api/get_workout_history_by_workoutId?workout_id=${workoutId}`);

        if (response.status !== 200) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const workout: IRMWorkoutHistory<IRMPastExercise> = response.data;

        const exercises: ModelExercise[] = workout.exercises_done_in_workout.map((exercise: IRMPastExercise) => {
            const setsWithCompletion: ModelSet[] = exercise.sets.map((set: IRMPastSet) => ({
                ...set,
                isCompleted: true
            }));

            return ({
                ...exercise,
                sets: setsWithCompletion,
            });
        });

        const formattedWorkout: ModelWorkoutHistory<ModelExercise> = { ...workout, exercises_done_in_workout: exercises }

        return formattedWorkout;

    } catch (error) {
        console.error('There was an error fetching exercise history without details: ', error);
        throw error;
    }
}
