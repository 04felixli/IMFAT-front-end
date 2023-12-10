// This file handles all API interactions 

import IModelExerciseInList from "../Interfaces/ResponseModels/IResponseModelExerciseInList";
import ModelExercise from "../Models/ModelExercise";
import ModelSet from "../Models/ModelSet";
import IResponseModelPastExercise from "../Interfaces/ResponseModels/IResponseModelPastExercise";
import IResponseModelPastSet from "../Interfaces/ResponseModels/IResponseModelPastSet";

const url = process.env.REACT_APP_API_URL;

// This function handles fetching exercises for exercise list
export const fetchExercises = async (searchInput = ''): Promise<IModelExerciseInList[]> => {
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

        const info = await response.json();

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

        console.log("Modified info is: ", modifiedInfo)

        return modifiedInfo;

    } catch (error) {
        console.error('There was an error auto filling exercise information: ', error);
        throw error;
    }
}