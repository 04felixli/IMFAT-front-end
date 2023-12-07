// Model for an exercise - matches ModelCompletedExercise in backend 
import ModelSet from "./ModelSet";

class ModelExercise {
    exercise_id: number;
    name: string;
    equipment: string;
    notes: string | null;
    sets: ModelSet[];

    constructor(
        exercise_id: number,
        name: string,
        equipment: string,
        notes: string | null,
        sets: ModelSet[]
    ) {
        this.exercise_id = exercise_id;
        this.name = name;
        this.equipment = equipment;
        this.notes = notes;
        this.sets = sets;
    }
}

export default ModelExercise; 