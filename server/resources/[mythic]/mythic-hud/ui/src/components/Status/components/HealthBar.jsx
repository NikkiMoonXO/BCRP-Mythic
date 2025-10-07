import React from 'react';
import { Fade } from '@mui/material';
import { makeStyles, withTheme } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        width: 200,
        height: 12,
        borderRadius: 8,
        background: 'rgba(20, 20, 25, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        },
    },
    healthFill: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        background: 'linear-gradient(90deg, #ff4757 0%, #ff6b7a 50%, #ff8fa3 100%)',
        borderRadius: '7px 0 0 7px',
        transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
            animation: '$shimmer 2s ease-in-out infinite',
        },
        '&.low': {
            animation: '$pulse 1s ease-in-out infinite',
        },
    },
    iconContainer: {
        position: 'absolute',
        left: -32,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(255, 71, 87, 0.2), rgba(255, 71, 87, 0.1))',
        border: '1px solid rgba(255, 71, 87, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'translateY(-50%) scale(1.1)',
            background: 'linear-gradient(135deg, rgba(255, 71, 87, 0.3), rgba(255, 71, 87, 0.2))',
        },
    },
    icon: {
        fontSize: 10,
        color: '#ff4757',
        filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
    },
    valueText: {
        position: 'absolute',
        right: -40,
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: 11,
        fontWeight: 600,
        color: 'rgba(255, 255, 255, 0.9)',
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
        fontFamily: '"Inter", system-ui, sans-serif',
        letterSpacing: '0.3px',
    },
    '@keyframes shimmer': {
        '0%': { transform: 'translateX(-100%)' },
        '100%': { transform: 'translateX(300%)' },
    },
    '@keyframes pulse': {
        '0%': { 
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 0 rgba(255, 71, 87, 0.4)',
        },
        '50%': { 
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 8px rgba(255, 71, 87, 0.6)',
        },
        '100%': { 
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 0 rgba(255, 71, 87, 0.4)',
        },
    },
}));

export default withTheme(() => {
    const health = useSelector((state) => state.status.health);
    const isDead = useSelector((state) => state.status.isDead);
    const classes = useStyles();

    if (isDead) return null;

    const healthPercentage = Math.max(0, Math.min(100, health));
    const isLow = health <= 20;

    return (
        <Fade in={true} timeout={600}>
            <div className={classes.container}>
                <div className={classes.iconContainer}>
                    <FontAwesomeIcon
                        icon={['fas', 'heart']}
                        className={classes.icon}
                    />
                </div>
                <div 
                    className={`${classes.healthFill} ${isLow ? 'low' : ''}`}
                    style={{ width: `${healthPercentage}%` }}
                />
                <div className={classes.valueText}>
                    {Math.round(health)}
                </div>
            </div>
        </Fade>
    );
});