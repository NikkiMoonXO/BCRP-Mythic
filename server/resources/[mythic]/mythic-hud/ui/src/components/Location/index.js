import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, Box, Group, Text } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoad, faCompass, faMap } from '@fortawesome/free-solid-svg-icons';

const useStyles = createStyles((theme) => ({
    location: {
        position: 'fixed',
        top: '2%',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: theme.spacing.sm,
    },
    box: {
        backgroundColor: theme.fn.rgba(theme.colors.dark[7], 0.8),
        borderRadius: theme.radius.sm,
        padding: theme.spacing.xs,
        display: 'flex',
        alignItems: 'center',
        boxShadow: theme.shadows.lg,
        height: 35,
        border: `2px solid ${theme.colors.dark[6]}`,
    },
    centerArea: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        backgroundColor: theme.fn.rgba(theme.colors.dark[7], 0.8),
        borderRadius: theme.radius.sm,
        padding: theme.spacing.xs,
        boxShadow: theme.shadows.lg,
        height: 35,
        border: `2px solid ${theme.colors.dark[6]}`,
    },
    leftBox: {
        position: 'absolute',
        left: 0,
        transform: 'translateX(-115%)',
        whiteSpace: 'nowrap',
        border: `2px solid ${theme.colors.dark[6]}`,
    },
    rightBox: {
        position: 'absolute',
        right: 0,
        transform: 'translateX(110%)',
        whiteSpace: 'nowrap',
        border: `2px solid ${theme.colors.dark[6]}`,
    },
    icon: {
        color: '#0469ffff', // lazy fix color match
        fontSize: theme.fontSizes.md,
        marginRight: theme.spacing.xs,
    },
    text: {
        color: theme.colors.gray[0],
        fontSize: theme.fontSizes.md,
        fontWeight: 500,
    },
}));

export default () => {
    const { classes } = useStyles();
    const isShowing = useSelector((state) => state.location.showing);
    const location = useSelector((state) => state.location.location);
    const inVehicle = useSelector((state) => state.vehicle?.showing);
    const isBlindfolded = useSelector((state) => state.app.blindfolded);

    if (!isShowing || !inVehicle || isBlindfolded) return null;

    return (
        <div className={classes.location}>
            <Group position="center" spacing="xs">
                <Box className={`${classes.box} ${classes.leftBox}`}>
                    <FontAwesomeIcon
                        icon={faCompass}
                        className={classes.icon}
                    />
                    <Text className={classes.text}>{location.direction}</Text>
                </Box>

                <Box className={classes.centerArea}>
                    <FontAwesomeIcon icon={faRoad} className={classes.icon} />
                    <Text className={classes.text}>
                        {location.main}
                        {location.cross && (
                            <>
                                <span> x </span>
                                {location.cross}
                            </>
                        )}
                    </Text>
                </Box>

                <Box className={`${classes.box} ${classes.rightBox}`}>
                    <FontAwesomeIcon icon={faMap} className={classes.icon} />
                    <Text className={classes.text}>{location.area}</Text>
                </Box>
            </Group>
        </div>
    );
};
