import { useState } from "react";

const DropdownList = ({
    list,
    options,
    selectedOption,
    changeSelectedOption,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const onChangeHandler = (option) => {
        setIsOpen(false);
        changeSelectedOption(option);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="inline-flex justify-between items-center w-56 h-8 px-4 py-1 mt-1 text-base text-secondary border border-secondary rounded focus:ring-2 overflow-hidden text-ellipsis whitespace-nowrap"
            >
                {selectedOption}
                <svg
                    className={`w-5 h-5 ml-2 transform transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute left-0 mt-2 w-full rounded shadow-lg bg-white border border-secondary whitespace-nowrap z-50">
                    <div className="py-1">
                        {options.map((option, index) => {
                            switch (list) {
                                case "exStatuses":
                                    return (
                                        <span
                                            key={index}
                                            onClick={() =>
                                                onChangeHandler(option.exStatus)
                                            }
                                            className={`text-sm block px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                                                selectedOption ===
                                                option.exStatus
                                                    ? "bg-blue-200"
                                                    : ""
                                            }`}
                                        >
                                            {option.exStatus}
                                        </span>
                                    );
                                case "exNames":
                                    return (
                                        <span
                                            key={index}
                                            onClick={() =>
                                                onChangeHandler(option.exName)
                                            }
                                            className={`text-sm block px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                                                selectedOption === option.exName
                                                    ? "bg-blue-200"
                                                    : ""
                                            }`}
                                        >
                                            {option.exName}
                                        </span>
                                    );
                                default:
                                    return null;
                            }
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownList;
