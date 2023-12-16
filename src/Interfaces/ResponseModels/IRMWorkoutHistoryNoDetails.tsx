interface IRMWorkoutHistoryNoDetails {
    id: number;
    type: string;
    date: string;
    name: string;
    duration: number;
    exercises_done_in_workout: string[];
}

export default IRMWorkoutHistoryNoDetails; 