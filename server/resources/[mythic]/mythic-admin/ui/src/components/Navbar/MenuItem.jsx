import React, { useEffect, useRef, useState } from 'react';
import { ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
	link: {
		color: theme.palette.text.main,
		height: 60,
		width: 60,
		minWidth: 60,
		minHeight: 60,
		borderRadius: '50%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 0,
		margin: 0,
		'& svg': {
			fontSize: 24,
			transition: 'color ease-in 0.15s',
		},
		'&:hover': {
			background: 'transparent',
			color: `${theme.palette.primary.main}`,
			cursor: 'pointer',
			'& svg': {
				color: `${theme.palette.primary.main}`,
			},
		},
		'&.active': {
			color: theme.palette.primary.main,
			'& svg': {
				color: theme.palette.primary.main,
				'--fa-secondary-opacity': 1.0,
			},
		},
	},
	iconWrapper: {
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}));

export default function SidebarLink(props) {
	const classes = useStyles();
	const iconRef = useRef(null);
	const [useFallback, setUseFallback] = useState(false);

	useEffect(() => {
		const node = iconRef.current;
		if (node && node.querySelector('svg') === null) {
			setUseFallback(true);
		}
	}, [props.link.icon]);

	return (
		<ListItem
			button
			exact={props.link.exact}
			className={classes.link}
			component={NavLink}
			to={props.link.path}
			name={props.link.name}
			onClick={props.onClick}
			disableGutters
		>
			<Tooltip title={props.link.label} arrow placement="left">
				<ListItemIcon className={classes.iconWrapper} ref={iconRef}>
					<FontAwesomeIcon icon={useFallback ? faQuestion : props.link.icon} />
				</ListItemIcon>
			</Tooltip>
			{!props.compress && <ListItemText primary={props.link.label} />}
		</ListItem>
	);
}
