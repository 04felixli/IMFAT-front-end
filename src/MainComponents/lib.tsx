// This file handles all API interactions 

import IModelExerciseInList from "../Interfaces/ResponseModels/IResponseModelExerciseInList";
import ModelExercise from "../Models/ModelExercise";
import ModelSet from "../Models/ModelSet";
import IResponseModelPastExercise from "../Interfaces/ResponseModels/IResponseModelPastExercise";
import IResponseModelPastSet from "../Interfaces/ResponseModels/IResponseModelPastSet";
import ModelWorkout from "../Models/ModelWorkout";
import axios, { AxiosResponse } from 'axios';


const url = process.env.REACT_APP_API_URL;

// This function handles fetching exercises for exercise list
export const fetchExercises = async (searchInput = ''): Promise<IModelExerciseInList[]> => {
    try {
        console.log("api url is: " + `${url}/api/get_exercises?searchInput=${searchInput}`);

        const response: AxiosResponse<IModelExerciseInList[]> = await axios.get(`${url}/api/get_exercises?searchInput=${searchInput}`);

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

        console.log("api url is: " + `${url}/api/get_latest_exercise_info?exercise_ids=${idsAsString}`);

        const response: AxiosResponse<IResponseModelPastExercise[]> = await axios.get(`${url}/api/get_latest_exercise_info?exercise_ids=${idsAsString}`);

        if (response.status !== 200) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const info = response.data;

        const modifiedInfo: ModelExercise[] = info.map((exercise: IResponseModelPastExercise) => {
            const setsWithCompletion: ModelSet[] = exercise.sets.map((set: IResponseModelPastSet) => ({
                ...set,
                isCompleted: false, // Set the initial value of isCompleted for each set
            }));

            return {
                ...exercise,
                sets: setsWithCompletion,
            };
        });

        console.log("Modified info is: ", modifiedInfo);

        return modifiedInfo;

    } catch (error) {
        console.error('There was an error auto-filling exercise information: ', error);
        throw error;
    }
}

// Post a workout
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
