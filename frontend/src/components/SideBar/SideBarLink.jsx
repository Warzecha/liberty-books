import React from 'react';
import {createUseStyles, useTheme} from 'react-jss';
import {Link} from '@reach/router';

const SideBarLink = ({title, to, active}) => {
    const classes = useStyles({active});
    return (
        <div className={classes.container}>
            <Link to={to} className={classes.link}>
                {title}
            </Link>

        </div>
    );
};

const useStyles = createUseStyles(theme => ({
    container: {
        // width: '100%',
        margin: 4,
        padding: 8,
        borderRadius: 4,
        backgroundColor: ({active}) => active ? '#e6e6e6' : 'transparent',
        '&:hover': {
            backgroundColor: '#e9e9e9'
        }
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        fontSize: 16,
        fontWeight: 600
    }
}));

export default SideBarLink;
