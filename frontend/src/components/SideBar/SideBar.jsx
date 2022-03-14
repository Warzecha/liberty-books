import React from 'react';
import {createUseStyles} from 'react-jss';
import SideBarLink from './SideBarLink';

const SideBar = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>

            <SideBarLink to={'/books'} title={'Books'}/>


        </div>
    );
};

const useStyles = createUseStyles({
    root: {
        width: 240,
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    }
})

export default SideBar;
