import React from 'react';
import {createUseStyles} from 'react-jss'
import {
    Link,
    useMatch,
    useResolvedPath,
} from "react-router-dom";

const SideBarLink = ({title, to, Icon}) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    const classes = useStyles({active: !!match});
    return (
        <Link to={to} className={classes.container} get>
            <div className={classes.iconContainer}>
                <Icon/>
            </div>
            <span className={classes.label}>
                {title}
            </span>
        </Link>
    );
};

const useStyles = createUseStyles(theme => ({
    container: {
        // width: '100%',
        padding: 8,
        borderRadius: 4,
        backgroundColor: ({active}) => active ? '#e6e6e6' : 'transparent',
        color: theme.palette.text.primary,
        textDecoration: 'none',

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        '&:hover': {
            backgroundColor: '#e9e9e9'
        }
    },
    label: {
        fontSize: 16,
        fontWeight: 600
    },
    iconContainer: {
        padding: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

export default SideBarLink;
