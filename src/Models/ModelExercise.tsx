// Model for an exercise - matches ModelCompletedExercise in backend 
import ModelSet from "./ModelSet";

class ModelExercise {
    id: number;
    name: string;
    equipment: string;
    notes: string | null;
    sets: ModelSet[];

    constructor(
        id: number,
        name: string,
        equipment: string,
        notes: string | null,
        sets: ModelSet[]
    ) {
        this.id = id;
        this.name = name;
        this.equipment = equipment;
        this.notes = notes;
        this.sets = sets;
    }
}

export default ModelExercise; 