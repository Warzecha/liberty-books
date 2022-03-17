import React from 'react';
import {createUseStyles} from 'react-jss';
import SideBarLink from './SideBarLink';

import {
    FiBook,
    FiBookOpen,
    FiBookmark,
    FiHeadphones
} from 'react-icons/fi';

const SideBar = () => {
    const classes = useStyles()

    return (
        <nav className={classes.root}>

            <h2 className={classes.title}>Liberty Books</h2>

            <SideBarLink to={'/books'} title={'Books'} Icon={FiBook}/>
            <SideBarLink to={'/audiobooks'} title={'Audiobooks'} Icon={FiHeadphones}/>
            <SideBarLink to={'/books/current'} title={'Reading now'} Icon={FiBookOpen}/>

            <SideBarLink to={'/bookmarks'} title={'Bookmarks'} Icon={FiBookmark}/>
        </nav>
    );
};

const useStyles = createUseStyles({
    root: {
        width: 240,
        minWidth: 240,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: 4,
        backgroundColor: '#fafafa'
    },
    title: {
        textAlign: 'center'
    }
})

export default SideBar;
