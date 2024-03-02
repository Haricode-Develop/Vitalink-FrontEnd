import React, { useState } from 'react';
import { EvolutionForm } from './EvolutionRecordStyle';

const EvolutionRecord = ({ onSubmit }) => {
    const [date, setDate] = useState('');
    const [progress, setProgress] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ date, progress });
    };

    return (
        <EvolutionForm onSubmit={handleSubmit}>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <textarea value={progress} onChange={(e) => setProgress(e.target.value)} />
            <button type="submit">Guardar</button>
        </EvolutionForm>
    );
};

export default EvolutionRecord;
