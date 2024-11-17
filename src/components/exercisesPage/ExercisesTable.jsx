import { useState } from "react";

import format from "date-fns/format";

import { useAppContext } from "../../context/AppContext";

import DropdownList from "../UI/DropdownList";
import TablePagination from "../UI/TablePagination";

const ExercisesTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [numberElemsPerPage, setNumberElemsPerPage] = useState(5);

    const { exercises, exStatuses, changeExStatus } = useAppContext();

    const indexOfLastItem = currentPage * numberElemsPerPage;
    const indexOfFirstItem = indexOfLastItem - numberElemsPerPage;
    const exercisesPerPage = exercises.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(exercises.length / numberElemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const prevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const nextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const toggleNumberElemsPerPage = (numberOfElems) => {
        setCurrentPage(1);
        setNumberElemsPerPage(numberOfElems);
    };

    return (
        <div>
            <table className="w-full table-fixed">
                <thead>
                    <tr>
                        <th className="table-title-cell">Дата</th>
                        <th className="table-title-cell">Упражнение</th>
                        <th className="table-title-cell">Прогресс</th>
                        <th className="table-title-cell">Статус</th>
                    </tr>
                </thead>
                <tbody>
                    {exercisesPerPage.map((item) => (
                        <tr className="cursor-pointer" key={item.id}>
                            <td className="table-data-cell">
                                {format(item.exDate, "dd.MM.yyyy")}
                            </td>
                            <td className="table-data-cell">{item.exName}</td>
                            <td className="table-data-cell">
                                {item.exProgress}
                            </td>
                            <td className="table-dropdown-cell">
                                <DropdownList
                                    list="exStatuses"
                                    options={exStatuses}
                                    selectedOption={item.exStatus}
                                    changeSelectedOption={(selectedStatus) =>
                                        changeExStatus(item.id, selectedStatus)
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TablePagination
                currentPage={currentPage}
                numberElems={numberElemsPerPage}
                totalPages={totalPages}
                onPaginate={paginate}
                onPrev={prevPage}
                onNext={nextPage}
                onToggle={toggleNumberElemsPerPage}
            />
        </div>
    );
};

export default ExercisesTable;
