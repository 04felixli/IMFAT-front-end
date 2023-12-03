// This file handles all API interactions 
const url = process.env.REACT_APP_API_URL;

// This function handles fetching exercises for exercise list
export const fetchExercises = async (searchInput = '') => {
    try {
        console.log("api url is: " + `${url}/api/get_exercises?searchInput=${searchInput}`)
        
        const response = await fetch(`${url}/api/get_exercises?searchInput=${searchInput}`);

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error('There was an error fetching exercises: ', error);
    }
}