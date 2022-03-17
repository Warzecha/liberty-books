import React from 'react';
import {createUseStyles} from 'react-jss';
import {Link} from 'react-router-dom';

const BookCard = ({book}) => {
    const {
        title,
        description,
        coverImage,
        authors

    } = book;

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.coverImageContainer}>
                {coverImage && <img src={coverImage} alt={`${title} cover image`} className={classes.image}/>}
            </div>

            <div className={classes.contentContainer}>
                <Link to={`/books/${book.id}`} className={classes.link}>
                    <span className={classes.title}>
                    {title}
                    </span>
                </Link>

                {authors && <span className={classes.description}>
                    By: {authors.join(', ')}
                </span>}

                <span className={classes.description}>
                    {description}
                </span>

            </div>

        </div>
    );
};

const useStyles = createUseStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        padding: 8
    },
    coverImageContainer: {
        width: 120
    },
    image: {
        maxWidth: 110,
        maxHeight: 200
    },
    contentContainer: {
        display: 'flex',
        flex: 4,
        flexDirection: 'column'
    },
    link: {
      textDecoration: 'none'
    },
    title: {
        color: theme.palette.text.primary,
        fontWeight: 600
    },
    description: {
        color: theme.palette.text.secondary,
        fontSize: 12
    }

}));

export default BookCard;
