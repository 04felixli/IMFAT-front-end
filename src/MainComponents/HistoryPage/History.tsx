// This file is the history page component. It will store a log of EVERY workout completed by the user. 

import React, { useState } from 'react';
import { useEffect } from 'react';
import { fetchExerciseHistoryNoDetails } from '../../Library/lib';
import ModelExerciseHistoryNoDetails from '../../Models/ModelExerciseHistoryNoDetails';

const History = () => {

    const [exerciseHistoryNoDetails, setExerciseHistoryNoDetails] = useState<ModelExerciseHistoryNoDetails[]>([]);

    useEffect(() => {

        let ignore = false;

        fetchExerciseHistoryNoDetails().then((response) => {
            if (!ignore) {

            }
        });

        return () => {
            ignore = true;
        };

    }, []);

    return (
        <div>
            History Page
        </div>
    );
};

export default History;
