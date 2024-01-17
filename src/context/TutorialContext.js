import { createContext, useState,useContext, useCallback } from 'react';

const TutorialContext = createContext();
export const useTutorial = () => useContext(TutorialContext);

export const TutorialProvider = ({ children }) => {
    const [isTutorialActive, setIsTutorialActive] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const startTutorial = useCallback(() => {
        setIsTutorialActive(true);
        setCurrentStepIndex(0);
    }, []);

    const nextStep = useCallback(() => {
        setCurrentStepIndex((i) => i + 1);
    }, []);

    const stopTutorial = useCallback(() => {
        setIsTutorialActive(false);
    }, []);

    return (
        <TutorialContext.Provider value={{ isTutorialActive, currentStepIndex, startTutorial, nextStep, stopTutorial }}>
            {children}
        </TutorialContext.Provider>
    );
};

export { TutorialContext };
