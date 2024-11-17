import {
    useHttp
} from "../hooks/http.hook";

const useTrainingService = () => {
    const {
        request
    } = useHttp();

    const _apiBase = "http://localhost:13031/api/";

    const fetchUserExercises = async (period) => {
        const res = await request(
            `${_apiBase}userexercises/${period.startDate}-to-${period.endDate}`
        );

        return res;
    };

    const fetchExercisesInfo = async () => {
        const res = await request(
            `${_apiBase}userexercises`
        );

        return res;
    }

    const updateExerciseStatus = async (id, updatedStatus) => {
        const res = await request(
            `${_apiBase}userexercises`,
            'PUT', JSON.stringify({
                EXERCISE_ID: id,
                UPDATED_EXERCISE_STATUS: updatedStatus
            })
        );

        return res;
    };

    const addUserExercise = async (name, progress, date, status) => {
        const res = await request(
            `${_apiBase}userexercises`,
            'POST', JSON.stringify({
                EXERCISE_NAME: name,
                EXERCISE_PROGRESS: progress,
                EXERCISE_DATE: date,
                EXERCISE_STATUS: status,
            })
        );

        return res;
    };

    return {
        fetchUserExercises,
        fetchExercisesInfo,
        updateExerciseStatus,
        addUserExercise
    };
};

export default useTrainingService;