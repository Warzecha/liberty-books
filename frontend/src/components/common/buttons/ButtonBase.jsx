import React from 'react';
import {createUseStyles} from 'react-jss';
import classNames from 'classnames';

const ButtonBase = ({className, ...props}) => {
    const classes = useStyles();

    return (
        <button {...props} className={classNames(classes.button, className)}/>
    );
};

const useStyles = createUseStyles(theme => ({
    button: {
        borderRadius: 8,
        color: theme.palette.text.primary,
        border: '1px solid transparent',
        padding: '6px 16px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: 16,
        textTransform: 'uppercase',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        // '&:hover': {
        //     backgroundColor: theme.palette.action.hoverBackground,
        // }
    }
}));

export default ButtonBase;
