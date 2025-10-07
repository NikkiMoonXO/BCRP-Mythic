import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Box, Typography, Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';
import useInterval from 'react-useinterval';

import { Sanitize } from '../../../util/Parser';
import { useDispatch } from 'react-redux';

const NotificationContainer = styled(Paper, {
    shouldForwardProp: (prop) =>
        prop !== 'notificationType' && prop !== 'customStyle',
})(({ theme, notificationType, customStyle }) => ({
    borderRadius: 4, // theme.radius.sm equivalent
    background: 'rgba(26, 27, 30, 0.8)', // theme.colors.dark[7] equivalent
    color: '#f8f9fa', // theme.colors.gray[0] equivalent
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)', // theme.shadows.lg equivalent
    border: '2px solid rgba(55, 58, 64, 1)', // theme.colors.dark[6] equivalent
    overflow: 'hidden',
    position: 'relative',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
    },
}));

const Header = styled(Grid)(({ theme }) => ({
    padding: 8, // theme.spacing.xs equivalent
    borderBottom: '1px solid rgba(55, 58, 64, 1)', // theme.colors.dark[6] equivalent
    alignItems: 'center',
    height: 35,
}));

const Body = styled(Box)(({ theme, customStyle }) => ({
    padding: 8, // theme.spacing.xs equivalent
    fontSize: 16, // theme.fontSizes.md equivalent
    lineHeight: 1.5,
    color: '#f8f9fa', // theme.colors.gray[0] equivalent
    fontWeight: 500,
    ...customStyle,
}));

const ProgressBar = styled(Box, {
    shouldForwardProp: (prop) =>
        prop !== 'notificationType' &&
        prop !== 'progress' &&
        prop !== 'customStyle',
})(({ theme, notificationType, progress, customStyle }) => ({
    height: 3,
    width: `${progress}%`,
    background: '#0469ffff', // consistent with theme color
    transition: 'width linear 0.1s',
    borderRadius: '0 0 4px 4px', // match container border radius
}));

const StickyIcon = styled(FontAwesomeIcon)(({ theme }) => ({
    marginRight: 8, // theme.spacing.xs equivalent
    fontSize: 16, // theme.fontSizes.md equivalent
    color: '#0469ffff',
}));

const TypeIcon = styled(Box)(({ theme, notificationType }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#0469ffff',
    fontSize: 16, // theme.fontSizes.md equivalent
    marginRight: 8, // theme.spacing.xs equivalent
    '& svg': {
        fontSize: 16, // theme.fontSizes.md equivalent
    },
}));

const TimeStamp = styled(Typography)(({ theme }) => ({
    fontSize: 16, // theme.fontSizes.md equivalent
    color: '#f8f9fa', // theme.colors.gray[0] equivalent
    display: 'flex',
    alignItems: 'center',
    fontWeight: 500,
}));

export default ({ notification, animationDelay = 0 }) => {
    const dispatch = useDispatch();
    const [status, setStatus] = useState('waiting');
    const [timer, setTimer] = useState(0);
    const notificationRef = useRef(null);

    const getTypeIcon = () => {
        switch (notification.type) {
            case 'success':
                return ['fas', 'circle-check'];
            case 'warning':
                return ['fas', 'triangle-exclamation'];
            case 'error':
                return ['fas', 'circle-xmark'];
            default:
                return ['fas', 'circle-info'];
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setStatus('visible');
        }, animationDelay);

        return () => clearTimeout(timeout);
    }, [animationDelay]);

    useEffect(() => {
        if (notification.resetTimer) {
            setTimer(0);
        }
    }, [notification.resetTimer]);

    useEffect(() => {
        if (notification.duration > 0 && timer >= notification.duration) {
            setStatus('exiting');

            const timeout = setTimeout(() => {
                onHide();
            }, 300);

            return () => clearTimeout(timeout);
        }
    }, [timer, notification.duration]);

    useEffect(() => {
        if (notification.hide) {
            setStatus('exiting');

            const timeout = setTimeout(() => {
                onHide();
            }, 300);

            return () => clearTimeout(timeout);
        }
    }, [notification.hide]);

    const onHide = () => {
        dispatch({
            type: 'REMOVE_ALERT',
            payload: {
                id: notification._id,
            },
        });
    };

    const onTick = () => {
        setTimer(timer + 100);
    };

    useInterval(
        onTick,
        notification.duration <= 0 ||
            status !== 'visible' ||
            timer >= notification.duration
            ? null
            : 100,
    );

    const progressPercentage =
        notification.duration > 0
            ? 100 - (timer / notification.duration) * 100
            : 100;

    const getSlideStyles = () => {
        const styles = {
            overflow: 'hidden',
            width: '100%',
            transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
            marginBottom: '8px',
        };

        switch (status) {
            case 'waiting':
                return {
                    ...styles,
                    transform: 'translateX(100%)',
                    opacity: 0,
                };
            case 'visible':
                return {
                    ...styles,
                    transform: 'translateX(0)',
                    opacity: 1,
                };
            case 'exiting':
                return {
                    ...styles,
                    transform: 'translateX(100%)',
                    opacity: 0,
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                };
            default:
                return styles;
        }
    };

    return (
        <div style={getSlideStyles()} ref={notificationRef}>
            <NotificationContainer
                notificationType={notification.type}
                customStyle={notification.style}
                elevation={1}
                sx={{ transform: 'translateZ(0)' }}
            >
                <Header container>
                    <Grid
                        item
                        xs
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <TypeIcon notificationType={notification.type}>
                            <FontAwesomeIcon
                                icon={notification.icon || getTypeIcon()}
                            />
                        </TypeIcon>

                        {notification.duration <= 0 && (
                            <StickyIcon icon="thumbtack" />
                        )}
                    </Grid>
                    <Grid
                        item
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <TimeStamp component="span" variant="caption">
                            <Moment
                                interval={60000}
                                fromNow
                                date={notification.created}
                            />
                        </TimeStamp>
                    </Grid>
                </Header>
                <Body customStyle={notification.style?.body}>
                    {Sanitize(notification.message)}
                </Body>
                {notification.duration > 0 && (
                    <ProgressBar
                        notificationType={notification.type}
                        progress={progressPercentage}
                        customStyle={notification.style?.progress}
                    />
                )}
            </NotificationContainer>
        </div>
    );
};
