import React, {useState} from 'react';
import ReactDOM from "react-dom";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup
} from "@mui/material";

interface IModalProps {
    // isModalOpen: boolean;
    closeModal: () => void;
    execute: () => void

}

const Modal = (props: IModalProps) => {
    const [radioValue, setRadioValue] = useState('completed');
    const node = document.querySelector('#modal__root');
    if (!node) return null;
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue((event.target as HTMLInputElement).value);
    };

    const { closeModal, execute} = props

    return  ReactDOM.createPortal((
        <Dialog
            open={true}
            onClose={closeModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Какое действие выполнить?
            </DialogTitle>

            <DialogActions sx={{flexDirection: 'column', justifyContent: 'flex-end', }}>
                <FormControl sx={{mb: 2}}>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={radioValue}
                        onChange={handleRadioChange}
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="completed" control={<Radio />} label="Задача завершена, перейти к следующей" />
                        <FormControlLabel value="restart" control={<Radio />} label="Начать задачу заново" />
                    </RadioGroup>
                </FormControl>

                <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                    <Button onClick={execute}
                            autoFocus>
                        Выполнить
                    </Button>

                    <Button onClick={closeModal}
                            autoFocus>
                        Отмена
                    </Button>
                </Box>

            </DialogActions>
        </Dialog>
    ), node);
};

export default Modal;