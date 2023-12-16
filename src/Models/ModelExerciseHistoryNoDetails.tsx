class ModelExerciseHistoryNoDetails {
    id: number;
    type: string;
    date: string;
    name: string;
    duration: number;
    exercises_done_in_workout: string[];

    constructor(id: number, type: string, date: string, name: string, duration: number, exercises_done_in_workout: string[]) {
        this.id = id;
        this.type = type;
        this.date = date;
        this.name = name;
        this.duration = duration;
        this.exercises_done_in_workout = exercises_done_in_workout;
    }
}

export default ModelExerciseHistoryNoDetails; 
