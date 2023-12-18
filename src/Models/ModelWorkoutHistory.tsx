class ModelWorkoutHistory<T> {
    id: number;
    type: string;
    date: string;
    name: string;
    duration: number;
    exercises_done_in_workout: T[]; // ModelExercise[] OR string[] for a list of exercise names within the workout.

    constructor(id: number, type: string, date: string, name: string, duration: number, exercises_done_in_workout: T[]) {
        this.id = id;
        this.type = type;
        this.date = date;
        this.name = name;
        this.duration = duration;
        this.exercises_done_in_workout = exercises_done_in_workout;
    }
}

export default ModelWorkoutHistory; 
