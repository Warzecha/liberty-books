import React from 'react';
import {createUseStyles} from 'react-jss';

const Button = (props) => {
    const classes = useStyles();

    return (
        <button {...props} className={classes.button}/>
    );
};

const useStyles = createUseStyles(theme => ({
    button: {
        borderRadius: 8,
        color: theme.palette.text.primary,
        border: 'none',
        padding: '6px 16px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: 16,
        textTransform: 'uppercase',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: theme.palette.action.hoverBackground,
        }
    }
}))

export default Button;
