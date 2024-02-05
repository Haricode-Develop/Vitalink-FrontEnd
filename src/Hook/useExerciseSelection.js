import { useState } from 'react';

const useExerciseSelection = (initialExercises) => {
    const [exercises, setExercises] = useState(initialExercises);

    const toggleExerciseSelection = (exerciseId) => {
        setExercises(exercises.map(ex => {
            if (ex.id === exerciseId) {
                return { ...ex, isSelected: !ex.isSelected };
            }
            return ex;
        }));
    };

    return {
        exercises,
        toggleExerciseSelection,
    };
};

export default useExerciseSelection;
