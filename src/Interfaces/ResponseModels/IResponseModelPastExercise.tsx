// Structure of ModelPastExercise from backend  

import ResponseModelPastSet from "./IResponseModelPastSet";

interface IResponseModelPastExercise {
    id: number;
    name: string;
    equipment: string;
    notes: string | null;
    sets: ResponseModelPastSet[];
}

export default IResponseModelPastExercise;