import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const TablePagination = ({
    currentPage,
    numberElems,
    totalPages,
    onPrev,
    onNext,
    onPaginate,
    onToggle,
}) => {
    const pageNumbers = [];

    if (totalPages > 9) {
        if (currentPage < 5) {
            for (let i = 1; i <= 7; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push("...");
            pageNumbers.push(totalPages);
        } else if (currentPage > totalPages - 6) {
            pageNumbers.push(1);
            pageNumbers.push("...");
            for (let i = totalPages - 6; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);
            pageNumbers.push("...");
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push("...");
            pageNumbers.push(totalPages);
        }
    } else {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    }

    return (
        <div className="flex justify-between mt-4">
            <div className="flex">
                <div className="pr-3">
                    <span className="text-2xl font-bold text-secondary">
                        Количество элементов
                    </span>
                </div>
                <div
                    className="pagination-quantity-box"
                    onClick={() => onToggle(5)}
                >
                    <span
                        className="text-xl"
                        style={{
                            fontWeight: numberElems === 5 ? "bold" : "",
                        }}
                    >
                        5
                    </span>
                </div>
                <div
                    className="pagination-quantity-box"
                    onClick={() => onToggle(10)}
                >
                    <span
                        className="text-xl"
                        style={{
                            fontWeight: numberElems === 10 ? "bold" : "",
                        }}
                    >
                        10
                    </span>
                </div>
                <div
                    className="pagination-quantity-box"
                    onClick={() => onToggle(15)}
                >
                    <span
                        className="text-xl"
                        style={{
                            fontWeight: numberElems === 15 ? "bold" : "",
                        }}
                    >
                        15
                    </span>
                </div>
            </div>
            {totalPages > 1 && (
                <div className="flex">
                    <div className="pagination-arrow-box" onClick={onPrev}>
                        <ArrowBackIcon />
                    </div>
                    <ul className="flex">
                        {pageNumbers.map((item, id) => (
                            <li
                                key={id}
                                className={`pagination-page-box ${
                                    typeof item === "number" && "cursor-pointer"
                                }`}
                                onClick={() =>
                                    typeof item === "number" && onPaginate(item)
                                }
                            >
                                <span
                                    className={`text-xl ${
                                        currentPage === item ? "font-bold" : ""
                                    }`}
                                >
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className="pagination-arrow-box" onClick={onNext}>
                        <ArrowForwardIcon />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TablePagination;
