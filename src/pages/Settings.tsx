import React, {useContext, useState} from 'react';
import {
    Alert,
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import {SettingsContext} from "../context/context";

const Settings = () => {
    const {settings, setSettings} = useContext(SettingsContext);
    const [isSnackBarOpen, setSnackBarOpen] = React.useState(false);
    const [timer, setTimer] = useState<number | null>(null);

    const handleChange = (value: number | boolean, sysName: string | boolean) => {
        if (!value && typeof value !== 'boolean') {
            let newSettings = settings.map(el => {
                if (el.sysName === sysName) {
                    return {
                        ...el,
                        error: true
                    }
                }
                return el
            })
            setSettings([...newSettings])
            return
        }

        let newSettings = settings.map(el => {
            if (el.sysName === sysName) {
                return {
                    ...el,
                    value: value,
                    error: false
                }
            }
            return el
        })


        if (typeof value !== 'boolean') {
            const newTimer = window.setTimeout(() => {
                setSettings([...newSettings])
                setSnackBarOpen(true)
            }, 1500)

            setTimer(newTimer)
            return
        }
        setSnackBarOpen(true)
        setSettings([...newSettings])
    }

    const handleClose = () => {
        setSnackBarOpen(false)
    };

    return (<Box sx={{mt: 2, display: 'grid', rowGap: 4, maxWidth: '50%'}}>
            <Typography variant='h3'>
                Настройки
            </Typography>

            {
                settings.map(el => {
                    if (typeof el.value !== 'boolean') {
                        return (
                            <TextField key={el.sysName}
                                       fullWidth
                                       error={el.error}
                                       required
                                       id="outlined-required"
                                       label={el.text}
                                       helperText={el.error && 'Введите положительное число'}
                                       defaultValue={el.value}
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(+e.target.value, el.sysName)}
                            />
                        )
                    } else {
                        return (
                            <FormGroup key={el.sysName}>
                                <FormControlLabel control={<Checkbox checked={el.value}
                                                                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.checked, el.sysName)}
                                                                     size="medium"/>}
                                                  label={el.text}/>
                            </FormGroup>
                        )
                    }
                })
            }

            <Snackbar open={isSnackBarOpen}
                      sx={{mt: 6}}
                      autoHideDuration={6000}
                      onClose={handleClose}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert onClose={handleClose} severity="success">
                    Сохранено
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Settings;
