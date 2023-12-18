// Structure of ModelPastWorkout<T> in the backend

interface IRMWorkoutHistory<T> {
    id: number;
    type: string;
    date: string;
    name: string;
    duration: number;
    exercises_done_in_workout: T[]; // IRMPastExercise[] OR string[] for a list of exercise names within the workout. 
}

export default IRMWorkoutHistory; 