import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, IconButton, Divider, Tooltip } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../../assets/img/logo.png';

import Nui from '../../util/Nui';
import Account from './Account';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		background: 'transparent',
		width: '100%',
		height: 86,
		zIndex: 100,
		userSelect: 'none'
	},
	logo: {
		height: 96,
		padding: 14,
		userSelect: 'none'
	},
	branding: {
		marginLeft: 10,
		marginRight: 10,
		fontSize: 22,
		'& small': {
			display: 'block',
			fontSize: 14,
			color: theme.palette.text.alt,
		},
	},
	navLinks: {
		display: 'inline-flex',
		alignItems: 'center',
		width: '100%',
	},
	navbar: {
		background: 'transparent !important',
		width: '100%',
	},
	title: {
		flexGrow: 1,
	},
	right: {
		display: 'inline-flex',
		alignItems: 'center',
		marginRight: 10,
	},
	callsign: {
		fontSize: 14,
		color: theme.palette.primary.main,
	},
}));

export default () => {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();

	const hidden = useSelector(state => state.app.hidden);
	const user = useSelector(state => state.app.user);
	const permissionLevel = useSelector(state => state.app.permissionLevel);

	const onClose = () => {
		Nui.send('Close');
	};

	const onDetach = () => {
		Nui.send('StopAllAttach')
	};

	const viewSelf = () => {
		history.push(`/player/${user?.Source}`);
	};

	const goInvisible = () => {
		Nui.send('ToggleInvisible');
	};

	const toggleIds = () => {
		Nui.send('ToggleIDs');
	};
	
	const RevealPlayers = () => {
		Nui.send('RevealPlayers');
	};

	const hoverChange = (state) => {
		if (!hidden) {
			dispatch({
				type: 'SET_OPACITY_MODE',
				payload: {
					state,
				},
			});
		}
	};

	return (
		<AppBar
			elevation={0}
			position="relative"
			color="secondary"
			className={classes.navbar}
		>
			<Toolbar disableGutters>
				<div
					className={classes.title}
					onMouseEnter={() => hoverChange(true)}
					onMouseLeave={() => hoverChange(false)}
				>
					<div className={classes.navLinks}>
						<Link to="/" className={classes.logoLink}>
							<img src={Logo} className={classes.logo} />
						</Link>
						<div className={classes.branding}>
							<span>Admin System</span>
						</div>
					</div>
				</div>
				<div className={classes.right}>
					<Account />
					<Divider orientation="vertical" flexItem />
					{permissionLevel >= 100 && <Tooltip title="Toggle Invisibility">
						<IconButton onClick={goInvisible}>
							<FontAwesomeIcon icon={['fas', 'eye-slash']} />
						</IconButton>
					</Tooltip>}
					<Tooltip title="Toggle Player Ids">
						<IconButton onClick={toggleIds}>
							<FontAwesomeIcon icon={['fas', 'id-badge']} />
						</IconButton>
					</Tooltip>
					<Tooltip title="Toggle Reveal Players">
						<IconButton onClick={RevealPlayers}>
							<FontAwesomeIcon icon={['fas', 'user-secret']} />
						</IconButton>
					</Tooltip>
					<Tooltip title="View Self Player Data">
						<IconButton onClick={viewSelf}>
							<FontAwesomeIcon icon={['fas', 'user-large']} />
						</IconButton>
					</Tooltip>
					<Tooltip title="Detach From Player">
						<IconButton onClick={onDetach}>
							<FontAwesomeIcon icon={['fas', 'link-slash']} />
						</IconButton>
					</Tooltip>
					<Tooltip title="Previous Page">
						<IconButton onClick={history.goBack}>
							<FontAwesomeIcon icon={['fas', 'chevron-left']} />
						</IconButton>
					</Tooltip>
					<Tooltip title="Next Page">
						<IconButton onClick={history.goForward}>
							<FontAwesomeIcon icon={['fas', 'chevron-right']} />
						</IconButton>
					</Tooltip>
					<Tooltip title="Close">
						<IconButton onClick={onClose}>
							<FontAwesomeIcon icon={['fas', 'xmark']} />
						</IconButton>
					</Tooltip>
				</div>
			</Toolbar>
		</AppBar>
	);
};
