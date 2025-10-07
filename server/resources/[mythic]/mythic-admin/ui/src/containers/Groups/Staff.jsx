import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Route, Switch } from 'react-router';

import links from './links';
import { Navbar, Modal } from '../../components';

import {
	Error,
	Dashboard,
	Players,
	DisconnectedPlayers,
	PlayerView,
	Vehicles,
	VehicleView,
	Characters,
} from '../../pages';

import Titlebar from '../../components/Titlebar';

const useStyles = makeStyles((theme) => ({
	container: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		background: 'transparent',
		overflow: 'hidden'
	},
	maxHeight: {
		height: 'calc(100% - 86px)',
		display: 'flex',
	},
	wrapper: {
		height: '100%',
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
	},
	navbar: {
		width: '250px',
	},
	content: {
		flex: 1,
		overflowY: 'auto',
		overflowX: 'hidden',
		padding: theme.spacing(2),
	},
}));

export default () => {
	const classes = useStyles();
	const permissionName = useSelector((state) => state.app.permissionName);

	return (
		<div className={classes.container}>
			<Grid container className={classes.maxHeight}>
				<Grid item xs={12}>
					<Titlebar />
				</Grid>
				<Navbar links={links(permission)} />
				<div className={classes.wrapper}>
					<div className={classes.content}>
						<Switch>
							<Route exact path="/" component={Dashboard} />
							<Route exact path="/players" component={Players} />
							<Route exact path="/disconnected-players" component={DisconnectedPlayers} />
							{/* <Route exact path="/current-vehicle" component={CurrentVehicle} /> */}
							<Route exact path="/player/:id" component={PlayerView} />
							<Route exact path="/vehicles" component={Vehicles} />
							<Route exact path="/players-characters" component={Characters} />
							<Route exact path="/vehicle/:id" component={VehicleView} />
							<Route component={Error} />
						</Switch>
					</div>
				</div>
			</Grid>
		</div>
	);
};