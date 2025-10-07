import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Fade, Grid, LinearProgress, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ReactHtmlParser from 'react-html-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from '@mui/material/styles';
import { linearProgressClasses } from '@mui/material/LinearProgress';

import rpmImg from '../../../assets/rpm.webp';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: 30,
        width: 'fit-content',
        fontSize: 15,
        color: '#ffffff',
        textAlign: 'center',
    },

    cluster: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: 6,
        padding: '8px 16px',
        minHeight: 40,
        gap: 12,
        transform: 'scale(1)',
        transformOrigin: 'center bottom',
    },

    fuelSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        flex: 1,
        minWidth: 120,
        marginLeft: '0.25cm',
    },

    speedRow: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 4,
        marginLeft: '0.25cm',
    },

    speedValue: {
        fontSize: 32,
        fontWeight: 700,
        color: '#ffffff',
        fontFamily: '"Roboto Mono", "Arial", monospace',
        lineHeight: 1,
    },

    speedUnit: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.7)',
        fontWeight: 400,
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },

    fuelRow: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
    },

    fuelIcon: {
        width: 16,
        height: 16,
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
    },

    fuelBar: {
        width: 100,
        height: 4,
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
    },

    statusSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
    },

    statusIcon: {
        width: 20,
        height: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.4)',
        transition: 'all 0.2s ease',
    },

    statusIconActive: {
        color: '#ef4444',
    },

    statusIconWarning: {
        color: '#f59e0b',
    },

    statusIconInfo: {
        color: '#3b82f6',
    },
}));

export default () => {
    const classes = useStyles();
    const theme = useTheme();

    const config = useSelector((state) => state.hud.config);

    const showing = useSelector((state) => state.vehicle.showing);
    const ignition = useSelector((state) => state.vehicle.ignition);
    const speed = useSelector((state) => state.vehicle.speed);
    const speedMeasure = useSelector((state) => state.vehicle.speedMeasure);
    const seatbelt = useSelector((state) => state.vehicle.seatbelt);
    const checkEngine = useSelector((state) => state.vehicle.checkEngine);
    const seatbeltHide = useSelector((state) => state.vehicle.seatbeltHide);
    const cruise = useSelector((state) => state.vehicle.cruise);

    const fuelHide = useSelector((state) => state.vehicle.fuelHide);
    const fuel = useSelector((state) => state.vehicle.fuel);

    const rpm = useSelector((state) => state.vehicle.rpm);

    const nos = useSelector((state) => state.vehicle.nos);

    const isShiftedUp = () => {
        return (
            config.layout == 'default' ||
            config.layout == 'center' ||
            (config.layout == 'minimap' && config.buffsAnchor2) ||
            (config.layout == 'condensed' &&
                config.condenseAlignment == 'center')
        );
    };

    const [speedStr, setSpeedStr] = useState(speed.toString());

    useEffect(() => {
        if (speed === 0) {
            setSpeedStr(`<span class="filler">000</span>`);
        } else if (speed < 10) {
            setSpeedStr(`<span class="filler">00</span>${speed.toString()}`);
        } else if (speed < 100) {
            setSpeedStr(`<span class="filler">0</span>${speed.toString()}`);
        } else {
            setSpeedStr(speed.toString());
        }
    }, [speed]);

    const FuelBar = styled('div')(({ theme, value }) => ({
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: `${value}%`,
        background: value >= 15 ? '#ffffff' : value >= 5 ? '#f59e0b' : '#ef4444',
        borderRadius: 2,
        transition: 'all 0.3s ease',
    }));

    const NosBar = styled('div')(({ theme, value }) => ({
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: `${value}%`,
        background: 'linear-gradient(90deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
        borderRadius: 2,
        transition: 'all 0.3s ease',
    }));

    return (
        <Fade in={showing}>
            <div
                className={classes.wrapper}
                style={{ bottom: isShiftedUp() ? 45 : 0 }}
            >
                <div className={classes.cluster}>
                    {/* Fuel Gauge with Speed */}
                    {ignition && !Boolean(fuelHide) && (
                        <div className={classes.fuelSection}>
                            <div className={classes.speedRow}>
                                <div className={classes.speedValue}>
                                    {ignition ? speed.toString().padStart(3, '0') : '---'}
                                </div>
                                <div className={classes.speedUnit}>
                                    {ignition ? speedMeasure : 'OFF'}
                                </div>
                            </div>
                            <div className={classes.fuelRow}>
                                <div className={classes.fuelIcon}>
                                    <FontAwesomeIcon icon={['fas', 'gas-pump']} />
                                </div>
                                <div className={classes.fuelBar}>
                                    <FuelBar value={fuel} />
                                </div>
                            </div>
                            {/* NOS Bar */}
                            {nos > 0 && (
                                <div className={classes.fuelRow}>
                                    <div className={classes.fuelIcon}>
                                        <FontAwesomeIcon icon={['fas', 'bolt']} />
                                    </div>
                                    <div className={classes.fuelBar}>
                                        <NosBar value={nos} />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Status Icons */}
                    <div className={classes.statusSection}>
                        {/* Seatbelt Warning */}
                        {!seatbeltHide && !seatbelt && (
                            <div className={`${classes.statusIcon} ${classes.statusIconWarning}`}>
                                <FontAwesomeIcon icon={['fas', 'triangle-exclamation']} />
                            </div>
                        )}

                        {/* Check Engine */}
                        {Boolean(checkEngine) && (
                            <div className={`${classes.statusIcon} ${classes.statusIconActive}`}>
                                <FontAwesomeIcon icon={['fas', 'car-burst']} />
                            </div>
                        )}

                        {/* Cruise Control */}
                        {Boolean(cruise) && (
                            <div className={`${classes.statusIcon} ${classes.statusIconInfo}`}>
                                <FontAwesomeIcon icon={['fas', 'gauge']} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Fade>
    );
};