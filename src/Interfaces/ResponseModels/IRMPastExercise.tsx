// Structure of ModelPastExercise from backend  

import IRMPastSet from "./IRMPastSet";

interface IRMPastExercise {
    id: number;
    name: string;
    equipment: string;
    notes: string | null;
    sets: IRMPastSet[];
}

export default IRMPastExercise;