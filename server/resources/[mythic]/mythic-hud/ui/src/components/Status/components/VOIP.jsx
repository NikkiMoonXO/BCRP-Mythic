import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, withTheme } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    voipContainer: {
        position: 'fixed',
        bottom: 20,
        right: 20, // Bottom right position
        width: 'fit-content',
        height: 'fit-content',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 1000,
        gap: 3, // Increased gap between bars
    },
    voipStage: {
        width: 6, // Increased from 4
        borderRadius: '2px', // Increased from 1px
        border: 'none',
        transition: 'all 0.2s ease',
        background: 'rgba(255, 255, 255, 0.3)', // Inactive state
        
        '&:nth-child(1)': {
            height: 12, // Increased from 8
        },
        '&:nth-child(2)': {
            height: 18, // Increased from 12
        },
        '&:nth-child(3)': {
            height: 24, // Increased from 16
        },
        
        '&.active:not(.talking):not(.radio)': {
            background: '#ffffff', // White when active
        },
        '&.active.talking': {
            background: '#4caf50', // Green when talking
        },
        '&.active.radio': {
            background: '#2196f3', // Blue when on radio
        },
    },
}));

export default withTheme(() => {
    const classes = useStyles();

    const voip = useSelector((state) => state.hud.voip);
    const isTalking = useSelector((state) => state.hud.talking);

    return (
        <div className={classes.voipContainer}>
            <div
                className={`${classes.voipStage} ${
                    voip >= 1 ? 'active' : ''
                } ${
                    isTalking == 1
                        ? 'talking'
                        : isTalking == 2
                        ? 'radio'
                        : ''
                }`}
            ></div>
            <div
                className={`${classes.voipStage} ${
                    voip >= 2 ? 'active' : ''
                } ${
                    isTalking == 1
                        ? 'talking'
                        : isTalking == 2
                        ? 'radio'
                        : ''
                }`}
            ></div>
            <div
                className={`${classes.voipStage} ${
                    voip >= 3 ? 'active' : ''
                } ${
                    isTalking == 1
                        ? 'talking'
                        : isTalking == 2
                        ? 'radio'
                        : ''
                }`}
            ></div>
        </div>
    );
});
