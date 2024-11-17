import { useAppContext } from "../../context/AppContext";

import Title from "../UI/Title";
import Btn from "../UI/Btn";
import Calendar from "../UI/Calendar";

const ExercisesFilters = () => {
    const { fetchUserEx } = useAppContext();

    return (
        <div className="bg-[#ffffff] rounded-lg shadow-xl">
            <div className="h-1 bg-main rounded-t-lg"></div>
            <div className="p-5">
                <Title text="Фильтры" />
            </div>
            <div className="h-[1px] bg-border"></div>
            <div className="py-8 px-5">
                <Calendar />
            </div>
            <div className="h-[1px] bg-border"></div>
            <div className="p-5">
                <Btn text="Показать" onClick={fetchUserEx} />
            </div>
        </div>
    );
};

export default ExercisesFilters;
