import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Grid,
    FormControlLabel,
    Switch,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Nui from '../../util/Nui';
import { useEffect } from 'react';
import Minimap from './forms/layouts/Minimap';
import Center from './forms/layouts/Center';

import VehicleDefault from './forms/vehicle-layouts/Default';
import VehicleSimple from './forms/vehicle-layouts/Simple';
import VehicleMinimal from './forms/vehicle-layouts/Minimal';
import Condensed from './forms/layouts/Condensed';
import Circles from './forms/status-types/Circles';

const layouts = [
    {
        value: 'default',
        label: 'Default',
    },
    {
        value: 'condensed',
        label: 'Circles',
    },
];

const vehLayouts = [
    {
        value: 'default',
        label: 'Default',
    },
    {
        value: 'simple',
        label: 'Simplified',
    },
    {
        value: 'minimal',
        label: 'Simplified v2',
    },
];

const barTypes = {
    default: [
        {
            value: 'numbers',
            label: 'Default',
        },

    ],
    minimap: [
        {
            value: 'numbers',
            label: 'Default',
        },
    ],
    center: [
        {
            value: 'numbers',
            label: 'Default',
        },
    ],
    condensed: [
        {
            value: 'circles',
            label: 'Circles',
        },
    ],
};

const useStyles = makeStyles((theme) => ({
    form: {
        padding: 10,
        maxHeight: 600,
    },
    header: {
        display: 'block',
        fontSize: '1.17em',
        marginBlockEnd: '1em',
        fontWeight: 'bold',
        color: '#f8f9fa',
    },
    field: {
        marginBottom: 10,
    },
    dialog: {
        '& .MuiDialog-paper': {
            backgroundColor: 'rgba(26, 27, 30, 0.95)',
            border: '2px solid rgba(55, 58, 64, 1)',
            borderRadius: 8,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
        },
    },
    dialogTitle: {
        backgroundColor: 'rgba(26, 27, 30, 0.9)',
        color: '#f8f9fa',
        borderBottom: '1px solid rgba(55, 58, 64, 1)',
        '& .MuiTypography-root': {
            color: '#f8f9fa',
            fontWeight: 600,
        },
    },
    dialogContent: {
        backgroundColor: 'rgba(26, 27, 30, 0.8)',
        color: '#f8f9fa',
    },
    dialogActions: {
        backgroundColor: 'rgba(26, 27, 30, 0.9)',
        borderTop: '1px solid rgba(55, 58, 64, 1)',
        '& .MuiButton-root': {
            color: '#298E96',
            fontWeight: 500,
            '&:hover': {
                backgroundColor: 'rgba(41, 142, 150, 0.1)',
            },
        },
    },
}));

export default () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const isOpen = useSelector((state) => state.hud.settings);
    const config = useSelector((state) => state.hud.config);

    const [state, setState] = useState({ ...config });

    useEffect(() => {
        setState({ ...config });
    }, [isOpen]);

    useEffect(() => {
        if (Boolean(barTypes[state.layout])) {
            if (
                barTypes[state.layout].filter(
                    (i) => i.value == state.statusType,
                ).length == 0
            ) {
                setState({
                    ...state,
                    statusType: barTypes[state.layout][0].value,
                });
            }
        } else {
            setState({
                ...state,
                layout: 'default',
            });
        }
    }, [state.layout]);

    const onClose = () => {
        dispatch({
            type: 'TOGGLE_SETTINGS',
            payload: {
                state: false,
            },
        });
        Nui.send('CloseUI');
    };

    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const onChecked = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.checked,
        });
    };

    const onSave = (e) => {
        e.preventDefault();

        dispatch({
            type: 'SET_CONFIG',
            payload: {
                config: state,
            },
        });

        Nui.send('SaveConfig', state);

        onClose();
    };

    const getLayoutForm = () => {
        switch (state.layout) {
            case 'minimap':
                return (
                    <Minimap
                        state={state}
                        setState={setState}
                        onChange={onChange}
                        onChecked={onChecked}
                    />
                );
            case 'center':
                return (
                    <Center
                        state={state}
                        setState={setState}
                        onChange={onChange}
                        onChecked={onChecked}
                    />
                );
            case 'condensed':
                return (
                    <Condensed
                        state={state}
                        setState={setState}
                        onChange={onChange}
                        onChecked={onChecked}
                    />
                );
            default:
                return null;
        }
    };

    const getStatusForm = () => {
        switch (state.statusType) {
            case 'bars':
                return (
                    <Bars
                        state={state}
                        setState={setState}
                        onChange={onChange}
                        onChecked={onChecked}
                    />
                );
            case 'circles':
                return (
                    <Circles
                        state={state}
                        setState={setState}
                        onChange={onChange}
                        onChecked={onChecked}
                    />
                );
            default:
                return null;
        }
    };

    const getVehicleLayoutForm = () => {
        switch (state.vehicle) {
            case 'simple':
                return (
                    <VehicleSimple
                        state={state}
                        setState={setState}
                        onChange={onChange}
                        onChecked={onChecked}
                    />
                );
            case 'minimal':
                return (
                    <VehicleMinimal
                        state={state}
                        setState={setState}
                        onChange={onChange}
                        onChecked={onChecked}
                    />
                );
            default:
                return (
                    <VehicleDefault
                        state={state}
                        setState={setState}
                        onChange={onChange}
                        onChecked={onChecked}
                    />
                );
        }
    };

    return (
        <Dialog 
            fullWidth 
            maxWidth="sm" 
            open={isOpen} 
            onClose={onClose}
            className={classes.dialog}
        >
            <form onSubmit={onSave}>
                <DialogTitle className={classes.dialogTitle}>HUD Configuration</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Grid container spacing={2} className={classes.form}>
                        <Grid item xs={12}>
                            <div className={classes.header}>
                                General Settings
                            </div>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                name="maskRadio"
                                                checked={state.maskRadio}
                                                onChange={onChecked}
                                            />
                                        }
                                        label="Mask Radio Channel On Hud?"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        select
                                        className={classes.field}
                                        onChange={onChange}
                                        value={state.layout}
                                        name="layout"
                                        label="Status HUD Layout"
                                        defaultValue="default"
                                    >
                                        {layouts.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                {getLayoutForm()}
                            </Grid>

                            <div className={classes.header}>
                                Status Settings
                            </div>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        select
                                        className={classes.field}
                                        onChange={onChange}
                                        value={state.statusType}
                                        name="statusType"
                                        label="Status Display Type"
                                        defaultValue="numbers"
                                    >
                                        {Boolean(barTypes[state.layout])
                                            ? barTypes[state.layout].map(
                                                  (option) => (
                                                      <MenuItem
                                                          key={option.value}
                                                          value={option.value}
                                                      >
                                                          {option.label}
                                                      </MenuItem>
                                                  ),
                                              )
                                            : barTypes.default.map((option) => (
                                                  <MenuItem
                                                      key={option.value}
                                                      value={option.value}
                                                  >
                                                      {option.label}
                                                  </MenuItem>
                                              ))}
                                    </TextField>
                                </Grid>
                                {getStatusForm()}
                            </Grid>

                            <div className={classes.header}>
                                Vehicle Layout Settings
                            </div>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        select
                                        className={classes.field}
                                        onChange={onChange}
                                        value={state.vehicle}
                                        name="vehicle"
                                        label="Vehicle HUD Layout"
                                        defaultValue="numbers"
                                    >
                                        {vehLayouts.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                {getVehicleLayoutForm()}
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
