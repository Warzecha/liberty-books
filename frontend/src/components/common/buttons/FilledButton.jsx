import React from 'react';
import ButtonBase from './ButtonBase';
import {createUseStyles} from 'react-jss';

const FilledButton = ({color, textColor, ...props}) => {
    const classes = useStyles({color, textColor});

    return (
        <ButtonBase {...props} className={classes.button}/>
    );
};


const useStyles = createUseStyles(theme => ({
    button: ({color, textColor}) => ({
        color: textColor || 'white',
        backgroundColor: color || theme.palette.primary.main,
        '&:hover': {
            // backgroundColor: theme.palette.action.hoverBackground,
            opacity: 0.8
        }
    })
}));

export default FilledButton;
