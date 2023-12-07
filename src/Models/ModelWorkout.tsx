// Model workout - matches ModelCompletedWorkout in backend
import ModelExercise from "./ModelExercise";

class ModelWorkout {
    type: string;
    date: string;
    name: string;
    duration: number;
    exercises: ModelExercise[];

    constructor(type: string, date: string, name: string, duration: number, exercises: ModelExercise[]) {
        this.type = type;
        this.date = date;
        this.name = name;
        this.duration = duration;
        this.exercises = exercises
    }
}

export default ModelExercise; 