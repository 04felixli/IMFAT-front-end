// This file handles all API interactions 

import ModelExerciseInList from "../Models/ModelExerciseInList";
import ModelExercise from "../Models/ModelExercise";

const url = process.env.REACT_APP_API_URL;

// This function handles fetching exercises for exercise list
export const fetchExercises = async (searchInput = ''): Promise<ModelExerciseInList[]> => {
    try {
        console.log("api url is: " + `${url}/api/get_exercises?searchInput=${searchInput}`)

        const response = await fetch(`${url}/api/get_exercises?searchInput=${searchInput}`);

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error('There was an error fetching exercises: ', error);
        throw error;
    }
}

// This function handles fetching information to auto fill exercise tracking 
export const fetchAutoFillInfo = async (addedExerciseIds: number[]): Promise<ModelExercise[]> => {
    try {

        const idsAsString: string = addedExerciseIds.join(', ');

        console.log("api url is: " + `${url}/api/get_latest_exercise_info?exercise_ids=${idsAsString}`)

        const response = await fetch(`${url}/api/get_latest_exercise_info?exercise_ids=${idsAsString}`);

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error('There was an error auto filling exercise information: ', error);
        throw error;
    }
}