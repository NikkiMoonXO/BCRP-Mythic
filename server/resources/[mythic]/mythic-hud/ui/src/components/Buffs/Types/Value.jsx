import React from 'react';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@mui/material';
import { makeStyles, withTheme } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from '@mui/material/styles';
import { linearProgressClasses } from '@mui/material/LinearProgress';

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
            boxShadow: '0 5px 16px rgba(0, 0, 0, 0.2)',
        },
    },
    icon: {
        width: '100%',
        height: 'calc(100% - 4px)',
        fontSize: 14,
        backdropFilter: 'blur(10px)',
        border: `1px solid rgba(255, 255, 255, 0.2)`,
        borderRadius: '6px 6px 0 0',
        padding: 6,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fa: {
        fontSize: (buff) =>
            Boolean(buff.override) && `${buff?.override ?? ''}`.length > 2
                ? '0.55rem'
                : '0.75rem',
        color: theme.palette.common.white,
        filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
        fontWeight: 500,
    },
}));

export default withTheme(({ buff }) => {
    const classes = useStyles(buff);
    const buffDefs = useSelector((state) => state.status.buffDefs);
    const buffDef = buffDefs[buff.buff];

    // Dynamic background color based on buff properties
    const getBuffBackground = () => {
        if (buffDef?.color) {
            // Use buff-specific color if available
            const color = buffDef.color;
            return `linear-gradient(135deg, ${color}95, ${color}85)`;
        } else if (buff.val >= 75) {
            // High value - green gradient
            return `linear-gradient(135deg, #22c55e95, #16a34a85)`;
        } else if (buff.val >= 50) {
            // Medium value - blue gradient
            return `linear-gradient(135deg, #3b82f695, #2563eb85)`;
        } else if (buff.val >= 25) {
            // Low value - orange gradient
            return `linear-gradient(135deg, #f97316a5, #ea580c85)`;
        } else {
            // Very low value - red gradient
            return `linear-gradient(135deg, #ef4444a5, #dc262685)`;
        }
    };

    // Dynamic progress bar color based on buff
    const getProgressBarGradient = () => {
        if (buffDef?.color) {
            const color = buffDef.color;
            return `linear-gradient(90deg, ${color} 0%, ${color}dd 50%, ${color}bb 100%)`;
        } else if (buff.val >= 75) {
            return `linear-gradient(90deg, #22c55e 0%, #16a34a 50%, #15803d 100%)`;
        } else if (buff.val >= 50) {
            return `linear-gradient(90deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)`;
        } else if (buff.val >= 25) {
            return `linear-gradient(90deg, #f97316 0%, #ea580c 50%, #dc2626 100%)`;
        } else {
            return `linear-gradient(90deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)`;
        }
    };

    const BuffProggressBar = styled(LinearProgress)(({ theme }) => ({
        height: 4,
        width: '100%',
        borderRadius: '0 0 6px 6px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
        [`& .${linearProgressClasses.bar}`]: {
            background: getProgressBarGradient(),
            borderRadius: '0 0 6px 6px',
            position: 'relative',
            '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                animation: 'shimmer 2s infinite',
            },
        },
        '@keyframes shimmer': {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(100%)' },
        },
    }));

    return (
        <div className={classes.container}>
            <div 
                className={classes.icon}
                style={{
                    background: getBuffBackground(),
                }}
            >
                {Boolean(buff.override) ? (
                    <span className={classes.fa}>{buff.override}</span>
                ) : (
                    <FontAwesomeIcon
                        className={classes.fa}
                        icon={buffDef.icon}
                    />
                )}
            </div>
            <BuffProggressBar variant="determinate" value={buff.val} />
        </div>
    );
});
