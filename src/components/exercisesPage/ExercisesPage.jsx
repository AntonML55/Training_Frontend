import { useAppContext } from "../../context/AppContext";

import ExercisesFilters from "./ExercisesFilters";
import ExercisesPanel from "./ExercisesPanel";

const ExercisesPage = () => {
    const { exercises } = useAppContext();

    return (
        <div>
            <ExercisesFilters />
            {exercises && exercises.length > 0 && <ExercisesPanel />}
        </div>
    );
};

export default ExercisesPage;
