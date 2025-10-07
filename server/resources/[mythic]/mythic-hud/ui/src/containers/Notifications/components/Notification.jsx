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
    borderRadius: theme.shape.borderRadius,
    background:
        customStyle?.alert?.background || theme.palette.background.paper,
    color: customStyle?.alert?.color || theme.palette.text.primary,
    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 3px 12px',
    overflow: 'hidden',
    position: 'relative',
    transition: 'all 0.2s ease',
    borderLeft: `3px solid ${
        customStyle?.alert?.borderColor ||
        (notificationType === 'success' && theme.palette.success.main) ||
        (notificationType === 'warning' && theme.palette.warning.main) ||
        (notificationType === 'error' && theme.palette.error.main) ||
        theme.palette.info.main
    }`,
    '&:hover': {
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 5px 15px',
    },
}));

const Header = styled(Grid)(({ theme }) => ({
    padding: `${theme.spacing(0.75)} ${theme.spacing(1.5)}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    alignItems: 'center',
}));

const Body = styled(Box)(({ theme, customStyle }) => ({
    padding: theme.spacing(1.5),
    fontSize: '0.9rem',
    lineHeight: 1.4,
    ...customStyle,
}));

const ProgressBar = styled(Box, {
    shouldForwardProp: (prop) =>
        prop !== 'notificationType' &&
        prop !== 'progress' &&
        prop !== 'customStyle',
})(({ theme, notificationType, progress, customStyle }) => ({
    height: 2,
    width: `${progress}%`,
    background:
        customStyle?.background ||
        (notificationType === 'success' && theme.palette.success.main) ||
        (notificationType === 'warning' && theme.palette.warning.main) ||
        (notificationType === 'error' && theme.palette.error.main) ||
        theme.palette.info.main,
    transition: 'width linear 0.1s',
}));

const StickyIcon = styled(FontAwesomeIcon)(({ theme }) => ({
    marginRight: theme.spacing(0.5),
    fontSize: '0.7rem',
    opacity: 0.7,
}));

const TypeIcon = styled(Box)(({ theme, notificationType }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
        notificationType === 'success'
            ? theme.palette.success.main
            : notificationType === 'warning'
            ? theme.palette.warning.main
            : notificationType === 'error'
            ? theme.palette.error.main
            : theme.palette.info.main,
    marginRight: theme.spacing(0.75),
    '& svg': {
        fontSize: '0.875rem',
    },
}));

const TimeStamp = styled(Typography)(({ theme }) => ({
    fontSize: '0.7rem',
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
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
