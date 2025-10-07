/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { Grow } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        backgroundColor: 'rgba(26, 27, 30, 0.8)', // theme.colors.dark[7] equivalent
        borderRadius: 4, // theme.radius.sm equivalent
        padding: 12, // increased from 8
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)', // theme.shadows.lg equivalent
        height: 45, // increased from 35
        border: '2px solid rgba(55, 58, 64, 1)', // theme.colors.dark[6] equivalent
        position: 'absolute',
        bottom: 240,
        right: 0,
        left: 0,
        margin: 'auto',
        width: 'fit-content',
    },
    icon: {
        color: '#0469ffff',
        fontSize: 18, // increased from 16
        marginRight: 10, // increased from 8
        display: 'block',
        paddingLeft: 0,
    },
    text: {
        color: '#f8f9fa', // theme.colors.gray[0] equivalent
        fontSize: 18, // increased from 16
        fontWeight: 500,
        padding: 6, // increased from 5
        '&.low': {
            animation: '$flash linear 1s infinite',
        },
    },
    '@keyframes flash': {
        '0%, 100%': {
            opacity: 1,
        },
        '50%': {
            opacity: 0.5,
        },
    },
    wrapper: {
        color: '#f8f9fa',
        backgroundColor: 'rgba(26, 27, 30, 0.8)',
        borderRadius: 4,
        padding: 10,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
        height: 35,
        border: '2px solid rgba(55, 58, 64, 1)',
        position: 'absolute',
        bottom: '15%',
        right: 0,
        left: 0,
        margin: 'auto',
        width: 'fit-content',
        fontSize: 20,
        '& svg': {
            position: 'absolute',
            left: -15,
            bottom: -15,
            color: '#298E96',
            fontSize: 28,
            zIndex: 100,
        },
    },
    highlight: {
        color: '#3aaaf9',
        fontWeight: 500,
    },
    '.highlight': {
        color: '#3aaaf9',
        fontWeight: 500,
    },
    highlightSplit: {
        color: '#ffffff',
        fontWeight: 500,
    },
    key: {
        padding: 5,
        color: '#0469ffff',
        borderRadius: 2,
        textTransform: 'capitalize',
        '&::before': {
            content: '"("',
        },
        '&::after': {
            content: '")"',
        },
    },
}));

export default () => {
    const classes = useStyles();
    const actions = useSelector((state) => state.action2.actions);

    const [action, setAction] = useState(
        actions.length > 0 ? actions[actions.length - 1] : null,
    );

    useEffect(() => {
        setAction(actions.length > 0 ? actions[actions.length - 1] : null);
    }, [actions]);

    const ParseButtonText = (text) => {
        let v = text;
        v = v.replace(/\{key\}/g, `<span class=${classes.key}>`);

        v = v.replace(/\{\/key\}/g, `</span>`);

        return v;
    };

    if (!Boolean(action)) return null;
    return (
        <Grow in={Boolean(action)}>
            <div className={classes.container}>
                <div className={classes.icon}>
                    <FontAwesomeIcon
                        icon="circle-info"
                        className={classes.iconTxt}
                    />
                </div>
                <div className={classes.text}>
                    {ReactHtmlParser(ParseButtonText(action.message))}
                </div>
            </div>
        </Grow>
    );
};
