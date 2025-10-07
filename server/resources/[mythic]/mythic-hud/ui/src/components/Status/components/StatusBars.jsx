import React from 'react';
import { makeStyles } from '@mui/styles';
import HealthBar from './HealthBar';
import ArmorBar from './ArmorBar';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: 16,
        position: 'fixed',
        bottom: 20,
        left: 20,
        zIndex: 1000,
    },
    barWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        minWidth: 240,
    },
}));

export default () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.barWrapper}>
                <HealthBar />
            </div>
            <div className={classes.barWrapper}>
                <ArmorBar />
            </div>
        </div>
    );
};