import { createContext, useContext, useState } from "react";
import format from "date-fns/format";

import useTrainingService from "../services/TrainingService";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [exercises, setExercises] = useState();
    const [exStatuses, setExStatuses] = useState();
    const [range, setRange] = useState({
        selection: {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    });

    const { fetchUserExercises, addUserExercise, updateExerciseStatus } =
        useTrainingService();

    const period = {
        startDate: format(range.selection.startDate, "yyyy-MM-dd"),
        endDate: format(range.selection.endDate, "yyyy-MM-dd"),
    };

    const addUserEx = (selectedExName, exProgressValue, exDateValue) => {
        const [day, month, year] = exDateValue.split(".");
        const formattedDateValue = `${year}-${month}-${day}`;
        const newExDate = new Date(formattedDateValue);

        const userExDates = exercises.map(
            (exercise) => new Date(exercise.exDate)
        );
        const minDate = new Date(Math.min(...userExDates));
        const maxDate = new Date(Math.max(...userExDates));

        let newExercise;

        if (newExDate >= minDate && newExDate <= maxDate) {
            newExercise = {
                id:
                    exercises && exercises.length > 0
                        ? Math.max(...exercises.map((ex) => ex.id)) + 1
                        : 1,
                exDate: newExDate.toISOString(),
                exName: selectedExName,
                exProgress: exProgressValue,
                exStatus: "Не выполнено",
            };
        }

        addUserExercise(
            selectedExName,
            exProgressValue,
            formattedDateValue,
            "Не выполнено"
        )
            .then((response) => {
                if (newExercise) {
                    setExercises((prevExercises) => [
                        ...(prevExercises || []),
                        newExercise,
                    ]);
                }
                alert(response);
            })
            .catch((error) => {
                alert(error);
            });
    };

    const changeExStatus = (id, selectedStatus) => {
        updateExerciseStatus(id, selectedStatus)
            .then((response) => {
                setExercises((prevExercises) =>
                    prevExercises.map((exercise) =>
                        exercise.id === id
                            ? { ...exercise, exStatus: selectedStatus }
                            : exercise
                    )
                );
                alert(response);
            })
            .catch((error) => {
                alert(error);
            });
    };

    const fetchUserEx = async () => {
        const userExercises = await fetchUserExercises(period);
        setExercises(userExercises.userEx);
        setExStatuses(userExercises.exStatuses);
    };

    const changeRange = (selectedRange) => {
        setRange({ selection: selectedRange.selection });
    };

    return (
        <AppContext.Provider
            value={{
                exercises,
                exStatuses,
                range,
                fetchUserEx,
                addUserEx,
                changeExStatus,
                changeRange,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useAppContext must be used within a DataProvider");
    }

    return context;
};
