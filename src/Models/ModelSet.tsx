// Model set - matches ModelCompletedSet in backend
class ModelSet {
    weight: number;
    reps: number;
    weight_unit: string;
    set_number: number;
    isCompleted: boolean;

    constructor(
        weight: number,
        reps: number,
        weight_unit: string,
        set_number: number,
        isCompleted: boolean = false, // default value is false
    ) {
        this.weight = weight;
        this.reps = reps;
        this.weight_unit = weight_unit;
        this.set_number = set_number;
        this.isCompleted = isCompleted;
    }
}

export default ModelSet; 