const DateInput = ({ value, changeValue }) => {
    const onChange = (e) => {
        const newValue = e.target.value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d{2})/, "$1.$2")
            .replace(/(\d{2})\.(\d{2})(\d{2})/, "$1.$2.$3");

        changeValue(newValue);
    };

    return (
        <input
            type="text"
            className="w-24 h-8 p-2 text-base text-left rounded border border-border cursor-pointer"
            value={value}
            onChange={onChange}
            placeholder="dd.MM.yyyy"
            maxLength="10"
        />
    );
};

export default DateInput;
