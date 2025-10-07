import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme, LinearProgress } from '@mui/material';
import { makeStyles, withTheme } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from '@mui/material/styles';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import useInterval from 'react-useinterval';

const useStyles = makeStyles((theme) => ({
    container: {
        width: 32,
        height: 32,
        marginBottom: 4,
        textAlign: 'center',
        position: 'relative',
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
            transform: 'translateY(-1px)',
        },
    },
    icon: {
        width: '100%',
        height: '100%',
        fontSize: 14,
        background: 'transparent',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${theme.palette.secondary.light}30`,
        borderRadius: 8,
        padding: 6,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(180deg, #667eea 0%, #764ba2 50%, #f093fb 100%)`,
            opacity: 0.6,
            zIndex: 1,
        },
    },
    fa: {
        fontSize: (buff) =>
            Boolean(buff.override) && `${buff?.override ?? ''}`.length > 2
                ? '0.55rem'
                : '0.75rem',
        color: theme.palette.common.white,
        filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
        fontWeight: 500,
        position: 'relative',
        zIndex: 2,
    },
}));

export default withTheme(({ buff }) => {
    const classes = useStyles(buff);
    const buffDefs = useSelector((state) => state.status.buffDefs);
    const buffDef = buffDefs[buff.buff];

    const [pct, setPct] = useState(Math.floor(Date.now() / 1000) - buff?.startTime);
    useInterval(
        () => {
            setPct(Math.floor(Date.now() / 1000) - buff?.startTime);
        },
        pct > buff.val ? null : (Boolean(buff?.options?.customInterval) ? buff?.options?.customInterval : 1000),
    );

    // Calculate remaining time percentage
    const remainingPercentage = Math.max(0, Math.min(100, 
        Math.floor(((buff.val - (pct > 0 ? (pct - 1) : pct)) / buff.val) * 100)
    ));

    if (pct > buff.val) return null;
    return (
        <div className={classes.container}>
            <div 
                className={classes.icon}
                style={{
                    '--fill-height': `${remainingPercentage}%`,
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(180deg, #667eea 0%, #764ba2 50%, #f093fb 100%)`,
                        opacity: 0.7,
                        zIndex: 1,
                        clipPath: `polygon(0 ${100 - remainingPercentage}%, 100% ${100 - remainingPercentage}%, 100% 100%, 0% 100%)`,
                        transition: 'clip-path 0.3s ease-out',
                    }}
                />
                {Boolean(buff.override) ? (
                    <span className={classes.fa}>{buff.override}</span>
                ) : (
                    <FontAwesomeIcon
                        className={classes.fa}
                        icon={buffDef.icon}
                    />
                )}
            </div>
        </div>
    );
});
