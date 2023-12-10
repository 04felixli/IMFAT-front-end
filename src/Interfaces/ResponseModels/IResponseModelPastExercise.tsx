// Structure of ModelPastExercise from backend  

import ResponseModelPastSet from "./IResponseModelPastSet";

interface IResponseModelPastExercise {
    exercise_id: number;
    name: string;
    equipment: string;
    notes: string | null;
    sets: ResponseModelPastSet[];
}

export default IResponseModelPastExercise;