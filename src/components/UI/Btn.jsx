import Button from "@mui/material/Button";

const Btn = ({ text, onClick }) => {
    return (
        <Button variant="contained" size="large" onClick={onClick}>
            {text}
        </Button>
    );
};

export default Btn;
