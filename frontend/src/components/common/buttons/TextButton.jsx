import React from 'react';
import ButtonBase from './ButtonBase';
import {createUseStyles} from 'react-jss';

const TextButton = (props, textColor) => {
    const classes = useStyles({textColor});

    return (
        <ButtonBase {...props} className={classes.button}/>
    );
};


const useStyles = createUseStyles(theme => ({
    button: ({textColor}) => ({
        color: textColor || theme.palette.text.primary,
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: theme.palette.action.hoverBackground,
        }
    })
}));

export default TextButton;
