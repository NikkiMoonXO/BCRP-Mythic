import React from 'react';
import { useSelector } from 'react-redux';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import useKeypress from 'react-use-keypress';

import Nui from '../../util/Nui';
import { Sanitize } from '../../util/Parser';

const useStyles = makeStyles((theme) => ({
    wrapper: {},
    dialog: {
        '& .MuiDialog-paper': {
            borderRadius: 16,
            background: 'transparent',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
            minHeight: 200,
        },
        '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
        },
    },
    title: {
        background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontSize: '1.5rem',
        fontWeight: 700,
        textAlign: 'center',
        padding: '24px 24px 16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
    content: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '1rem',
        lineHeight: 1.6,
        padding: '24px',
        textAlign: 'center',
    },
    actions: {
        padding: '16px 24px 24px',
        gap: 12,
        justifyContent: 'center',
    },
    button: {
        borderRadius: 12,
        padding: '12px 32px',
        fontSize: '0.95rem',
        fontWeight: 600,
        textTransform: 'none',
        minWidth: 120,
        transition: 'all 0.2s ease',
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
        },
    },
    denyButton: {
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.2) 100%)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        color: '#f87171',
        '&:hover': {
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.3) 100%)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
        },
    },
    acceptButton: {
        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        color: 'white',
        border: 'none',
        '&:hover': {
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
        },
    },
}));

export default () => {
    const classes = useStyles();
    const confirm = useSelector((state) => state.confirm);

    const onAccept = () => {
        Nui.send('Confirm:Yes', {
            event: confirm.yes,
            data: confirm.data,
        });
    };

    const onClose = () => {
        Nui.send('Confirm:No', {
            event: confirm.no,
            data: confirm.data,
        });
    };

    useKeypress(['Escape'], () => {
        onClose();
    });

    return (
        <Dialog 
            fullWidth 
            maxWidth="sm" 
            open={true} 
            onClose={onClose}
            className={classes.dialog}
        >
            <DialogTitle className={classes.title}>
                {confirm.title}
            </DialogTitle>
            {Boolean(confirm.description) && (
                <DialogContent className={classes.content}>
                    {Sanitize(confirm.description)}
                </DialogContent>
            )}
            <DialogActions className={classes.actions}>
                <Button 
                    onClick={onClose} 
                    className={`${classes.button} ${classes.denyButton}`}
                    variant="outlined"
                >
                    {confirm.denyLabel ?? 'No'}
                </Button>
                <Button 
                    onClick={onAccept} 
                    className={`${classes.button} ${classes.acceptButton}`}
                    variant="contained"
                >
                    {confirm.acceptLabel ?? 'Yes'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
