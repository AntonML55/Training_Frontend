const NumericInput = ({ value, changeValue }) => {
    const onChange = (e) => {
        const newValue = e.target.value.replace(/\D/, "");
        changeValue(newValue);
    };

    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            className="w-12 h-8 p-2 text-base text-center rounded border border-border cursor-pointer"
        />
    );
};

export default NumericInput;
