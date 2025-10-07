import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import Notification from './components/Notification';

const NotificationWrapper = styled(Box)(({ theme }) => ({
    maxWidth: 400,
    height: 'fit-content',
    width: '100%',
    position: 'absolute',
    padding: theme.spacing(1),
    right: 0,
    top: 0,
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
    pointerEvents: 'none',
    '& > *': {
        pointerEvents: 'auto',
    },
}));

export default () => {
    const pers = useSelector((state) =>
        state.notification.notifications.filter((n) => n.duration <= 0),
    );
    const notifs = useSelector((state) =>
        state.notification.notifications.filter((n) => n.duration > 0),
    );

    return (
        <NotificationWrapper>
            {pers.length > 0 &&
                pers
                    .sort((a, b) => b.created - a.created)
                    .map((n, index) => (
                        <Notification
                            key={n._id}
                            notification={n}
                            animationDelay={index * 100}
                        />
                    ))}

            {notifs.length > 0 &&
                notifs
                    .sort((a, b) => b.created - a.created)
                    .map((n, index) => (
                        <Notification
                            key={n._id}
                            notification={n}
                            animationDelay={index * 100 + pers.length * 100}
                        />
                    ))}
        </NotificationWrapper>
    );
};
