import React from 'react';
import { Fade } from '@mui/material';
import { makeStyles, withTheme } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    hudContainer: {
        position: 'fixed',
        bottom: 20,
        left: 20,
        display: 'flex',
        alignItems: 'flex-end',
        gap: 16,
        zIndex: 1000,
    },
    barsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 3, // Reduced from 8 for tighter spacing between health and armor bars
    },
    barWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: 3, // Reduced from 12 for closer spacing between icons, numbers, and bars
    },
    bar: {
        position: 'relative',
        width: 240, // Increased from 240
        height: 8, // Reduced from 14 to make thinner
        borderRadius: 4, // Reduced proportionally from 7
        background: 'rgba(0, 0, 0, 0.4)',
        overflow: 'hidden',
    },
    // Split armor bar container
    armorBarContainer: {
        display: 'flex',
        gap: 3, // Increased from 2
    },
    armorBarHalf: {
        position: 'relative',
        width: 148, // Adjusted for new bar width: (300 - 3) / 2
        height: 8, // Reduced from 14 to make thinner
        borderRadius: 4, // Reduced proportionally from 7
        background: 'rgba(0, 0, 0, 0.4)',
        overflow: 'hidden',
    },
    healthFill: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        background: '#4caf50', // Changed to green
        borderRadius: '4px', // Reduced from 7px to match thinner bars
        transition: 'width 0.3s ease',
        '&.low': {
            background: '#f44336',
        },
    },
    armorFill: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        background: '#1976d2', // Changed to dark blue
        borderRadius: '4px', // Reduced from 7px to match thinner bars
        transition: 'width 0.3s ease',
        '&.low': {
            background: '#ff9800',
        },
    },
    barIcon: {
        width: 24, // Increased from 20
        height: 24, // Increased from 20
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14, // Increased from 11
        color: '#fff',
        filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5))',
    },
    barValue: {
        fontSize: 14, // Increased from 12
        fontWeight: 600,
        color: '#fff',
        textShadow: '0 1px 1px rgba(0, 0, 0, 0.8)',
        fontFamily: 'system-ui, sans-serif',
        minWidth: 36, // Increased from 30
        textAlign: 'center',
        '&.low': {
            color: '#ff6b6b',
        },
    },
    iconsContainer: {
        display: 'flex',
        gap: 0, // No gap - icons touch each other
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        maxWidth: 360, // Increased from 300
    },
    statusIcon: {
        position: 'relative',
        borderRadius: 0,
        background: 'transparent',
        padding: '4px', // Increased from 3px for tighter spacing
        transition: 'all 0.2s ease',
        minHeight: 44, // Increased from 36
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 48, // Increased from 40
        '&:hover': {
            transform: 'scale(1.1)',
        },
        '&.pulsing': {
            animation: 'pulse 1s infinite',
        },
    },
    '@keyframes pulse': {
        '0%': {
            transform: 'scale(1)',
            opacity: 1,
        },
        '50%': {
            transform: 'scale(1.1)',
            opacity: 0.7,
        },
        '100%': {
            transform: 'scale(1)',
            opacity: 1,
        },
    },
    iconContainer: {
        position: 'relative',
        width: 24, // Increased from 20
        height: 24, // Increased from 20
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4, // Increased from 3
    },
    icon: {
        fontSize: 15, // Increased from 12
        color: '#fff',
        filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5))',
    },
    numberDisplay: {
        fontSize: 15, // Increased from 13
        fontWeight: 600,
        color: '#fff',
        textAlign: 'center',
        textShadow: '0 1px 1px rgba(0, 0, 0, 0.8)',
        fontFamily: 'system-ui, sans-serif',
        lineHeight: 1,
        '&.low': {
            color: '#ff6b6b',
        },
    },
}));

export default withTheme(() => {
    const health = useSelector((state) => state.status?.health);
    const armor = useSelector((state) => state.status?.armor);
    const statuses = useSelector((state) => state.status?.statuses || []);
    const isDead = useSelector((state) => state.status?.isDead);
    const hudMode = useSelector((state) => state.hud?.mode);
    const classes = useStyles();

    // Hide when dead
    if (isDead) {
        return null;
    }

    // Provide default values if undefined
    const healthValue = health ?? 100;
    const armorValue = armor ?? 0;
    
    const healthPercentage = Math.max(0, Math.min(100, healthValue));
    const armorPercentage = Math.max(0, Math.min(100, armorValue));
    const isHealthLow = healthValue <= 25;
    const isArmorLow = armorValue <= 25;

    // Calculate armor fill for split bars
    const armorLeftFill = Math.min(50, armorPercentage);
    const armorRightFill = Math.max(0, armorPercentage - 50);

    // Filter out health and armor from status icons, and hide statuses at 100% (except health and armor)
    const filteredStatuses = statuses.filter(status => {
        // Always exclude health and armor from status icons (they have their own bars)
        if (status.name === 'health' || status.name === 'armor') {
            return false;
        }
        
        // Special handling for stress - hide when at 0, show when > 0
        if (status.name === 'stress') {
            return status.value > 5;
        }
        
        // Special handling for oxygen - hide when at 95 or higher
        if (status.name === 'oxygen') {
            return status.value < 95;
        }
        
        // For all other statuses: Show if value > 0 and < 100 (hide when at 95%)
        return status.value > 0 && status.value < 95;
    }).sort((a, b) => {
        // Sort to ensure food and drink always come first
        const getOrder = (status) => {
            switch (status.name) {
                case 'food':
                case 'hunger': return 1;
                case 'drink':
                case 'thirst': return 2;
                default: return 10; // Other statuses come after
            }
        };
        
        return getOrder(a) - getOrder(b);
    });

    return (
        <Fade in={true} timeout={400}>
            <div className={classes.hudContainer}>
                {/* Health and Armor Bars - Redesigned to match screenshot */}
                <div className={classes.barsContainer}>
                    {/* Armor Bar */}
                    {armorPercentage >= 1 && (
                        <div className={classes.barWrapper}>
                            <FontAwesomeIcon icon={['fas', 'shield-alt']} style={{color: '#fff', fontSize: 18}} />
                            <span className={classes.barValue} style={{color: '#1976d2', marginRight: 2}}>{armorValue}</span>
                            <div style={{display: 'flex', gap: 3, width: 240}}>
                                <div className={classes.bar} style={{width: '50%', marginRight: 0}}>
                                    <div 
                                        className={`${classes.armorFill} ${isArmorLow ? 'low' : ''}`}
                                        style={{ width: `${Math.min(armorPercentage, 50) * 2}%` }}
                                    />
                                </div>
                                <div className={classes.bar} style={{width: '50%', marginRight: 0}}>
                                    <div 
                                        className={`${classes.armorFill} ${isArmorLow ? 'low' : ''}`}
                                        style={{ width: `${armorPercentage > 50 ? (armorPercentage - 50) * 2 : 0}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Health Bar */}
                    <div className={classes.barWrapper}>
                        <FontAwesomeIcon icon={['fas', 'heart']} style={{color: '#fff', fontSize: 18}} />
                        <span className={classes.barValue} style={{color: '#4caf50', marginRight: 2}}>{healthValue}</span>
                        <div className={classes.bar} style={{marginRight: 0}}>
                            <div 
                                className={`${classes.healthFill} ${isHealthLow ? 'low' : ''}`}
                                style={{ width: `${healthPercentage}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Status Icons */}
                <div className={classes.iconsContainer}>
                    {filteredStatuses.map((status, index) => {
                        const isLowValue = ((!status.inverted && status.value <= 10) ||
                            (status.inverted && status.value >= 90)) && status.flash;

                        return (
                            <div key={`status-${status.name}-${index}`} className={`${classes.statusIcon} ${isLowValue ? 'pulsing' : ''}`}>
                                <div className={classes.iconContainer}>
                                    <FontAwesomeIcon
                                        icon={status.icon}
                                        className={classes.icon}
                                        style={{ color: status.color || '#fff' }}
                                    />
                                </div>
                                <div className={`${classes.numberDisplay} ${isLowValue ? 'low' : ''}`}>
                                    {status.value}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Fade>
    );
});
