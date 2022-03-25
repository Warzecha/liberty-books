import React, {useCallback} from 'react';
import {useGetBookByIdQuery} from '../../services/books';
import {Link, useParams} from 'react-router-dom';

import {createUseStyles} from 'react-jss';
import {useDispatch} from 'react-redux';
import {setCurrentBookId} from '../../store/audioPlayerReducer';
import FilledButton from '../common/buttons/FilledButton';

const BookDetails = () => {
    const {bookId} = useParams();
    const {data, error, isLoading} = useGetBookByIdQuery(bookId);
    const dispatch = useDispatch();

    const classes = useStyles();

    const {
        id,
        title,
        description,
        coverImage,
        authors
    } = data || {};

    const handleListen = useCallback(() => {
        dispatch(setCurrentBookId(id))
    }, [dispatch, id])

    return (
        <div className={classes.container}>
            {isLoading && <span>Loading...</span>}

            <div>
                {error && JSON.stringify(error)}
            </div>

            <div className={classes.headerRow}>
                <div className={classes.coverImageContainer}>
                    {coverImage && <img src={coverImage} alt={`${title} cover image`} className={classes.image}/>}
                </div>

                <div className={classes.headerContentContainer}>
                    <h2 className={classes.title}>
                        {title}
                    </h2>

                    {authors && authors.length > 0 && (
                        <p className={classes.authors}>
                            By: {authors.join(', ')}
                        </p>)}

                </div>

            </div>

            <div>
                <FilledButton onClick={handleListen}>
                    Listen now
                </FilledButton>

            </div>

            <p className={classes.description}>
                {description}
            </p>

        </div>
    );
};

const useStyles = createUseStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 16
    },
    headerRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    coverImageContainer: {
        width: 220
    },
    image: {
        maxWidth: 200,
        maxHeight: 300
    },
    headerContentContainer: {
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
    authors: {
        color: theme.palette.text.primary,
        fontSize: 14
    },
    description: {
        color: theme.palette.text.primary,
        fontSize: 14
    }

}));

export default BookDetails;
