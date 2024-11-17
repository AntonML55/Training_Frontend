import { useState, useEffect } from "react";

import { useAppContext } from "../../context/AppContext";
import useTrainingService from "../../services/TrainingService";

import Title from "../UI/Title";
import Btn from "../UI/Btn";
import DropdownList from "../UI/DropdownList";
import DateInput from "../UI/DateInput";
import NumericInput from "../UI/NumericInput";

const ExercisesModal = ({ closeModal }) => {
    const [exInfo, setExInfo] = useState();
    const [selectedExName, setSelectedExName] = useState();
    const [exProgressValue, setExProgressValue] = useState();
    const [exDateValue, setExDateValue] = useState();

    const { addUserEx } = useAppContext();
    const { fetchExercisesInfo } = useTrainingService();

    const fetchExInfo = async () => {
        const exercisesInfo = await fetchExercisesInfo();
        setExInfo(exercisesInfo);
        setSelectedExName(exercisesInfo[0].exName);
    };

    useEffect(() => {
        fetchExInfo();
    }, []);

    const changeExName = (selectedExName) => {
        setSelectedExName(selectedExName);
    };

    const findExProgressType = () => {
        let selectedEx;
        if (exInfo) {
            selectedEx = exInfo.find(
                (exercise) => exercise.exName === selectedExName
            );
        }
        return selectedEx ? selectedEx.exProgressType : "";
    };

    const changeExProgressValue = (newValue) => {
        setExProgressValue(newValue);
    };

    const changeExDateValue = (newValue) => {
        setExDateValue(newValue);
    };

    const clearExModalValues = () => {
        setSelectedExName("");
        setExProgressValue("");
        setExDateValue("");
    };

    const onSave = () => {
        addUserEx(selectedExName, exProgressValue, exDateValue);
        clearExModalValues();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-5xl w-full">
                <div className="h-1 bg-main rounded-t-lg"></div>
                <div className="p-5">
                    <Title text="Добавление упражнения" />
                </div>
                <div className="h-[1px] bg-border"></div>
                <div className="flex justify-between py-8 px-5">
                    <DateInput
                        value={exDateValue}
                        changeValue={changeExDateValue}
                    />
                    <DropdownList
                        list="exNames"
                        options={exInfo}
                        selectedOption={selectedExName}
                        changeSelectedOption={changeExName}
                    />
                    <div className="flex">
                        <NumericInput
                            value={exProgressValue}
                            changeValue={changeExProgressValue}
                        />
                        <span className="ml-2">{findExProgressType()}</span>
                    </div>
                </div>
                <div className="h-[1px] bg-border"></div>
                <div className="flex p-5">
                    <Btn text="Сохранить" onClick={onSave} />
                    <div className="ml-3">
                        <Btn text="Закрыть" onClick={closeModal} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExercisesModal;
