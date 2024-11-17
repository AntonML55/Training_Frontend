import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import format from "date-fns/format";

import { useAppContext } from "../../context/AppContext";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const Calendar = () => {
    const [open, setOpen] = useState(false);
    const refOne = useRef(null);

    const { range, changeRange } = useAppContext();

    useEffect(() => {
        const hideOnEscape = (e) => {
            if (e.key === "Escape") {
                setOpen(false);
            }
        };

        const hideOnClickOutside = (e) => {
            if (refOne.current && !refOne.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("keydown", hideOnEscape, true);
        document.addEventListener("click", hideOnClickOutside, true);

        return () => {
            document.removeEventListener("keydown", hideOnEscape, true);
            document.removeEventListener("click", hideOnClickOutside, true);
        };
    }, []);

    return (
        <div className="inline-block relative">
            <input
                id="selectPeriod"
                className="h-8 py-5 px-3 text-base text-center rounded border border-border cursor-pointer"
                value={`${format(
                    range.selection.startDate,
                    "dd.MM.yyyy"
                )} - ${format(range.selection.endDate, "dd.MM.yyyy")}`}
                readOnly
                onClick={() => setOpen((open) => !open)}
            />
            <div className="mt-2" ref={refOne}>
                {open && (
                    <DateRange
                        className="absolute border z-10"
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        ranges={[range.selection]}
                        months={1}
                        direction="horizontal"
                        maxDate={new Date()}
                        onChange={changeRange}
                    />
                )}
            </div>
        </div>
    );
};

export default Calendar;
