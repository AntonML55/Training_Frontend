import { Fragment, useState } from "react";

import ExercisesTable from "../exercisesPage/ExercisesTable";
import ExercisesModal from "./ExercisesModal";
import Title from "../UI/Title";
import Btn from "../UI/Btn";

const ExcercisesPanel = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <Fragment>
            <div className="mt-10 bg-[#ffffff] rounded-lg shadow-xl">
                <div className="h-1 bg-main rounded-t-lg"></div>
                <div className="flex justify-between p-5">
                    <Title text="Мои упражнения" />
                    <Btn text="Добавить упражнение" onClick={openModal} />
                </div>
                <div className="h-[1px] bg-border"></div>
                <div className="p-5">
                    <ExercisesTable />
                </div>
            </div>
            {isModalOpen && <ExercisesModal closeModal={closeModal} />}
        </Fragment>
    );
};

export default ExcercisesPanel;
