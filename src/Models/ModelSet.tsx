// Model set - matches ModelCompletedSet in backend
class ModelSet {
    weight: number;
    reps: number;
    weight_unit: string;
    set_number: number;

    constructor(
        weight: number,
        reps: number,
        weight_unit: string,
        set_number: number,
    ) {
        this.weight = weight;
        this.reps = reps;
        this.weight_unit = weight_unit;
        this.set_number = set_number;
    }
}

export default ModelSet; 