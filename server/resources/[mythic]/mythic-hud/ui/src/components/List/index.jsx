import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, List, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useKeypress from 'react-use-keypress';

import Nui from '../../util/Nui';
import ListItem from './components/ListItem';

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
        color: '#298E96',
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
        width: '100%',
        maxWidth: 400,
        height: '100%',
        maxHeight: 'calc(100% - 300px)',
        position: 'absolute',
        top: 200,
        right: '15%',
        margin: 'auto',
        color: '#f8f9fa',
        backgroundColor: 'rgba(26, 27, 30, 0.8)',
        borderRadius: 4,
        padding: 0,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
        border: '2px solid rgba(55, 58, 64, 1)',
        fontSize: 20,
        overflow: 'hidden',
        '& svg': {
            position: 'absolute',
            left: -15,
            bottom: -15,
            color: '#298E96',
            fontSize: 28,
            zIndex: 100,
        },
    },
    header: {
        padding: '10px 15px',
        backgroundColor: 'rgba(26, 27, 30, 0.9)',
        border: '2px solid rgba(55, 58, 64, 1)',
        borderBottom: 'none',
        borderRadius: '4px 4px 0 0',
        minHeight: 38,
    },
    title: {
        lineHeight: '38px',
        color: '#f8f9fa',
        fontSize: 18,
        fontWeight: 500,
    },
    headerAction: {
        fontSize: 14,
        color: '#298E96',
        padding: 4,
        minWidth: 32,
        height: 32,
    },
    list: {
        paddingTop: 0,
        paddingBottom: 0,
        maxHeight: '100%',
        backgroundColor: 'rgba(26, 27, 30, 0.8)',
        border: '2px solid rgba(55, 58, 64, 1)',
        borderTop: 'none',
        borderRadius: '0 0 4px 4px',
        overflowY: 'auto',
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
            width: 6,
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#298E96',
            borderRadius: 3,
            transition: 'background ease-in 0.15s',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: '#1e8b94',
        },
        '&::-webkit-scrollbar-track': {
            background: 'rgba(55, 58, 64, 1)',
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
        color: '#298E96',
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
    const dispatch = useDispatch();
    const showing = useSelector((state) => state.list.showing);
    const active = useSelector((state) => state.list.active);
    const stack = useSelector((state) => state.list.stack);
    const menus = useSelector((state) => state.list.menus);

    const menu = menus[active];

    useKeypress(['Escape'], () => {
        if (!showing) return;
        else onClose();
    });

    const onBack = () => {
        Nui.send('ListMenu:Back');
        dispatch({
            type: 'LIST_GO_BACK',
        });
    };

    const onClose = () => {
        Nui.send('ListMenu:Close');
    };

    const onHeaderAction = (event, data) => {
        Nui.send('ListMenu:Clicked', {
            event,
            data,
        });
    };

    if (!showing || !Boolean(menu)) return null;
    return (
        <div className={classes.wrapper}>
            <Grid container className={classes.header}>
                <Grid item xs={8} className={classes.title}>
                    {menu?.label ?? 'List'}
                </Grid>
                <Grid item xs={4} style={{ textAlign: 'right' }}>
                    {Boolean(stack) && stack.length > 0 && (
                        <IconButton
                            className={classes.headerAction}
                            onClick={onBack}
                        >
                            <FontAwesomeIcon icon={['fas', 'arrow-left']} />
                        </IconButton>
                    )}
                    {menu?.headerAction?.event && (
                        <IconButton
                            className={classes.headerAction}
                            onClick={() => onHeaderAction(menu.headerAction.event, menu.headerAction.data)}
                        >
                            <FontAwesomeIcon icon={['fas', menu.headerAction.icon]} />
                        </IconButton>
                    )}
                    <IconButton
                        className={classes.headerAction}
                        onClick={onClose}
                    >
                        <FontAwesomeIcon icon={['fas', 'x']} />
                    </IconButton>
                </Grid>
            </Grid>
            <List className={classes.list}>
                {Boolean(menu) &&
                    menu.items.map((item, k) => {
                        return (
                            <ListItem
                                key={`${active}-${k}`}
                                index={k}
                                item={item}
                            />
                        );
                    })}
            </List>
        </div>
    );
};