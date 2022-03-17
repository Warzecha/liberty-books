import React from 'react';
import {createUseStyles} from 'react-jss';

const IconButton = ({children, ...rest}) => {
    const classes = useStyles();

    return (
        <button {...rest} className={classes.button}>
            <div className={classes.iconContainer}>
                {children}
            </div>
        </button>
    );
};

const useStyles = createUseStyles(theme => ({
    button: {
        width: 40,
        height: 40,
        borderRadius: 8,
        color: theme.palette.text.primary,
        border: 'none',
        padding: 8,
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        // fontSize: 16px,
        cursor: 'pointer',
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: theme.palette.action.hoverBackground,
        }
    },
    iconContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}))

export default IconButton;
