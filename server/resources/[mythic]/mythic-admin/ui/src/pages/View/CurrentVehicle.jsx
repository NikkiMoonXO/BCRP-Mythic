import React, { useEffect, useState } from 'react';
import {
	List,
	ListItem,
	ListItemText,
	Box,
	Grid,
	Alert,
	IconButton,
	Button,
	ButtonGroup,
	Typography,
	ListItemButton,
} from '@material-ui/core';
import {
	DirectionsCar,
	Whatshot,
	Build,
	Opacity,
	FlashOn,
	Settings,
	Power,
	ExpandMore,
	FileCopy,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { toast } from 'react-toastify';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useHistory } from 'react-router-dom';

import { Loader, Modal } from '../../components';
import Nui from '../../util/Nui';
import { useSelector } from 'react-redux';
import { round } from 'lodash';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '20px 10px 20px 20px',
		height: '100%',
		userSelect: 'none'
	},
	link: {
		color: theme.palette.text.alt,
		transition: 'color ease-in 0.15s',
		'&:hover': {
			color: theme.palette.primary.main,
		},
		'&:not(:last-of-type)::after': {
			color: theme.palette.text.main,
			content: '", "',
		},
	},
	item: {
		margin: 4,
		transition: 'background ease-in 0.15s',
		border: `1px solid ${theme.palette.border.divider}`,
		margin: 7.5,
		transition: 'filter ease-in 0.15s',
		'&:hover': {
			filter: 'brightness(0.8)',
			cursor: 'pointer',
		},
	},
	editorField: {
		marginBottom: 10,
	},
	icons: {
		color: '#c4c4c4',
		'&:hover': {
			color: '#ffffff',
		},
	},
}));

export default ({ match }) => {
	const classes = useStyles();
	const history = useHistory();
	const permissionLevel = useSelector(state => state.app.permissionLevel);

	const [err, setErr] = useState(false);
	const [loading, setLoading] = useState(false);

	const [vehicle, setVehicle] = useState(null);

	const fetch = async () => {
		setLoading(true);
		try {
			let res = await (await Nui.send('GetCurrentVehicle', {})).json();
			if (res) {
				setVehicle(res);
			} else {
				toast.error('Not in a Vehicle');
				setErr(true);
			}
		} catch (err) {
			console.log(err);
			toast.error('Unable to Load');
			setErr(true);

			// setVehicle({
			// 	Make: 'BMW',
			// 	Model: 'i8',
			// 	VIN: 'ASDASDADASDASDASDAD',
			// 	Owned: true,
			// 	Plate: 'asdasd',
			// 	Value: 11111,
			// 	EntityModel: -13123,
			// 	Coords: {
			// 		x: 1,
			// 		y: 1,
			// 		z: 1,
			// 	},
			// 	Heading: 10,
			// 	Seat: 1,
			// 	Fuel: 100,
			// 	DamagedParts: {
			// 		Axle: 100,
			// 		Radiator: 100,
			// 		Transmission: 100,
			// 		FuelInjectors: 100,
			// 		Brakes: 100,
			// 		Clutch: 100,
			// 		Electronics: 100,
			// 	},
			// })
		}
		setLoading(false);
	};

	useEffect(() => {
		fetch();
	}, []);

	const onRefresh = () => {
		fetch(true);
	};

	const copyInfo = (data) => {
		Nui.copyClipboard(data);
		toast.success('Copied');
	};

	const onAction = async (action) => {
		try {
			let res = await (await Nui.send('CurrentVehicleAction', {
				action: action,
			})).json();

			if (res && res.success) {
				toast.success(res.message);
			} else {
				if (res.message) {
					toast.error(res.message);
				} else {
					toast.error('Error');
				}
			}
		} catch (err) {
			toast.error('Error');
		}
	}

	return (
		<div>
			{loading || (!vehicle && !err) ? (
				<div
					className={classes.wrapper}
					style={{ position: 'relative' }}
				>
					<Loader static text="Loading" />
				</div>
			) : err ? (
				<Grid className={classes.wrapper} container alignItems="center" spacing={1}>
					<Grid item xs={12}>
						<Alert variant="outlined" severity="error">
							Not In a Vehicle
						</Alert>
					</Grid>
					
					<IconButton
						onClick={onRefresh}
						size="small"
						color="primary"
						title="Refresh Page"
						style={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							zIndex: 10,
						}}
					>
						<FontAwesomeIcon icon="fa-solid fa-sync-alt" />
					</IconButton>
				</Grid>
			) : (
				<>
					<Grid className={classes.wrapper} container spacing={2}>
						<Grid item xs={12}>
							<ButtonGroup fullWidth>
								<Button onClick={() => onAction('repair')}>
									Quick Repair
								</Button>
								{permissionLevel >= 90 && <Button onClick={() => onAction('repair_full')}>
									Full Repair
								</Button>}
								{permissionLevel >= 90 && <Button onClick={() => onAction('repair_engine')}>
									Engine Repair
								</Button>}
								{permissionLevel >= 90 && <Button onClick={() => onAction('fuel')}>
									Fuel
								</Button>}
								{permissionLevel >= 90 && <Button onClick={() => onAction('alarm')}>
									Alarm
								</Button>}
								<Button onClick={onRefresh}>
									Refresh
								</Button>
							</ButtonGroup>
						</Grid>
						<Grid item xs={6}>
							<List>
								<Grid container spacing={1}>
									<Grid item xs={6}>
										<ListItem>
											<ListItemText
												primary="Vehicle Name"
												secondary={`${vehicle.Make ?? 'Unknown'} ${vehicle.Model ?? 'Unknown'}`}
											/>
										</ListItem>
									</Grid>
									<Grid item xs={6}>
										<ListItem onClick={() => copyInfo(vehicle.EntityModel)}>
											<ListItemText
												primary="Vehicle Entity Model"
												secondary={`${vehicle.EntityModel}`}
											/>
										</ListItem>
									</Grid>
									<Grid item xs={6}>
										<ListItem>
											<ListItemText
												primary="Vehicle VIN"
												secondary={vehicle.VIN}
											/>
										</ListItem>
									</Grid>
									<Grid item xs={6}>
										<ListItem>
											<ListItemText
												primary="Vehicle Plate"
												secondary={vehicle.Plate}
											/>
										</ListItem>
									</Grid>
								</Grid>
								<ListItem>
									<ListItemText
										primary="Owned"
										secondary={`${vehicle.Owned ? `Yes - ${vehicle.Owner?.Id ?? 'Unknown'}` : 'No'}`}
									/>
								</ListItem>
								<ListItem>
									<ListItemText
										primary="Estimated Value"
										secondary={new Intl.NumberFormat('en-US', {
											style: 'currency',
											currency: 'USD',
										}).format(vehicle.Value ?? 0)}
									/>
								</ListItem>
								<Grid container spacing={1}>
									<Grid item xs={6}>
										<ListItem>
											<ListItemText
												primary={
												<Box display="flex" alignItems="center">
													<Typography variant="body1" fontWeight={500}>
														Coordinates
													</Typography>
													<IconButton
														onClick={() =>
															copyInfo(`vector3(${round(vehicle.Coords?.x, 2)}, ${round(vehicle.Coords?.y, 2)}, ${round(vehicle.Coords?.z, 2)})`)
														}
														size="small"
														sx={{
															ml: 1,
															'&:hover': {
																backgroundColor: 'transparent',
															},
														}}
													>
														<FileCopy fontSize="small" className={classes.icons} />
													</IconButton>
												</Box>
												}
												secondary={
												<Typography variant="body2" color="textSecondary">
													vector3({round(vehicle.Coords?.x, 2)}, {round(vehicle.Coords?.y, 2)}, {round(vehicle.Coords?.z, 2)})
												</Typography>
												}
											/>
										</ListItem>
									</Grid>
									<Grid item xs={6}>
										<ListItem onClick={() => copyInfo(`${round(vehicle.Heading, 2)}`)}>
											<ListItemText
												primary="Heading"
												secondary={`${round(vehicle.Heading, 2)}`}
											/>
										</ListItem>
									</Grid>
								</Grid>
								<ListItem>
									<ListItemText
										primary="Current Seat"
										secondary={vehicle.Seat}
									/>
								</ListItem>
							</List>
						</Grid>
						<Grid item xs={6}>
							<List>
								<Grid container spacing={1}>
									<Grid item xs={6}>
										<ListItem>
											<Opacity fontSize="small" style={{ marginRight: 8 }} />
											<ListItemText
											primary="Fuel"
											secondary={`${round(vehicle.Fuel, 0)}%`}
											/>
										</ListItem>
									</Grid>

									<Grid item xs={6}>
										<ListItem>
											<Whatshot fontSize="small" style={{ marginRight: 8 }} />
											<ListItemText
											primary="Engine Damage"
											secondary={`${round(((vehicle.Damage?.Engine ?? 1000) / 1000) * 100, 0)}%`}
											/>
										</ListItem>
									</Grid>

									<Grid item xs={6}>
										<ListItem>
											<DirectionsCar fontSize="small" style={{ marginRight: 8 }} />
											<ListItemText
											primary="Body Damage"
											secondary={`${round(((vehicle.Damage?.Body ?? 1000) / 1000) * 100, 0)}%`}
											/>
										</ListItem>
									</Grid>

									{vehicle.DamagedParts && (
										<>
										<Grid item xs={6}>
											<ListItem>
											<DirectionsCar fontSize="small" style={{ marginRight: 8 }} />
											<ListItemText primary="Axle" secondary={`${vehicle.DamagedParts.Axle ?? '100'}%`} />
											</ListItem>
										</Grid>
										<Grid item xs={6}>
											<ListItem>
											<Settings fontSize="small" style={{ marginRight: 8 }} />
											<ListItemText primary="Radiator" secondary={`${vehicle.DamagedParts.Radiator ?? '100'}%`} />
											</ListItem>
										</Grid>
										<Grid item xs={6}>
											<ListItem>
											<Build fontSize="small" style={{ marginRight: 8 }} />
											<ListItemText primary="Transmission" secondary={`${vehicle.DamagedParts.Transmission ?? '100'}%`} />
											</ListItem>
										</Grid>
										<Grid item xs={6}>
											<ListItem>
											<Whatshot fontSize="small" style={{ marginRight: 8 }} />
											<ListItemText primary="Fuel Injectors" secondary={`${vehicle.DamagedParts.FuelInjectors ?? '100'}%`} />
											</ListItem>
										</Grid>
										<Grid item xs={6}>
											<ListItem>
											<Power fontSize="small" style={{ marginRight: 8 }} />
											<ListItemText primary="Brakes" secondary={`${vehicle.DamagedParts.Brakes ?? '100'}%`} />
											</ListItem>
										</Grid>
										<Grid item xs={6}>
											<ListItem>
											<FlashOn fontSize="small" style={{ marginRight: 8 }} />
											<ListItemText primary="Clutch" secondary={`${vehicle.DamagedParts.Clutch ?? '100'}%`} />
											</ListItem>
										</Grid>
										<Grid item xs={6}>
											<ListItem>
											<Power fontSize="small" style={{ marginRight: 8 }} />
											<ListItemText primary="Electronics" secondary={`${vehicle.DamagedParts.Electronics ?? '100'}%`} />
											</ListItem>
										</Grid>
										</>
									)}
								</Grid>
							</List>
						</Grid>
						<Grid item xs={12}>
							<ButtonGroup 
								style={{
									position: 'absolute',
									bottom: 20,
									left: '50%',
									transform: 'translateX(-50%)',
									zIndex: 1000,
								}}
							>
								{permissionLevel >= 90 && <Button onClick={() => onAction('explode')}>
									Explode
								</Button>}
								{permissionLevel >= 90 && <Button onClick={() => onAction('customs')}>
									Customs
								</Button>}
							</ButtonGroup>
						</Grid>
					</Grid>
				</>
			)}
		</div>
	);
};