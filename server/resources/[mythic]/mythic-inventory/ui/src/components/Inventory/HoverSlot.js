import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { fallbackItem, getItemImage, getItemLabel } from './item';

const initialState = {
	mouseX: null,
	mouseY: null,
};
const useStyles = makeStyles((theme) => ({
	hover: {
		position: 'absolute',
		top: 0,
		left: 0,
		pointerEvents: 'none',
		zIndex: 10,
		filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
	},
	img: {
		height: 190,
		'@media only screen and (min-width: 1920px) and (max-width: 1920px)': {
			height: 140,
		},
		width: '100%',
		overflow: 'hidden',
		zIndex: 3,
		backgroundSize: '65%',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
	},
	label: {
		bottom: 0,
		left: 0,
		right: 0,
		position: 'absolute',
		textAlign: 'center',
		padding: '8px 5px',
		width: '100%',
		zIndex: 4,
		margin: 'auto',
		maxWidth: '100%',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		background:
			'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
		borderBottomLeftRadius: 6,
		borderBottomRightRadius: 6,
		fontSize: 14,
		fontWeight: 500,
	},
	slot: {
		width: 165,
		height: 190,
		'@media only screen and (min-width: 1920px) and (max-width: 1920px)': {
			height: 140,
			width: 125,
		},

		position: 'relative',
		zIndex: 2,
		border: '1px solid rgba(255, 255, 255, 0.08)',
		borderRadius: 6,
		'&.mini': {
			width: 132,
			height: 152,
		},
		'&:not(.broken)': {
			backgroundColor: `rgba(30, 33, 43, 0.8)`,
		},
		'&.broken': {
			backgroundColor: `rgba(220, 53, 69, 0.2)`,
			borderColor: `rgba(220, 53, 69, 0.4)`,
		},
		'&.rarity-1': {
			// Common
			borderColor: 'rgba(255, 255, 255, 0.1)',
		},
		'&.rarity-2': {
			// Uncommon
			borderColor: 'rgba(40, 167, 69, 0.5)',
		},
		'&.rarity-3': {
			// Rare
			borderColor: 'rgba(0, 123, 255, 0.5)',
		},
		'&.rarity-4': {
			// Epic
			borderColor: 'rgba(111, 66, 193, 0.5)',
		},
		'&.rarity-5': {
			// Objective
			borderColor: 'rgba(255, 193, 7, 0.5)',
		},
	},
	count: {
		top: 8,
		right: 8,
		position: 'absolute',
		textAlign: 'right',
		padding: '4px 8px',
		textShadow: `0 0 5px ${theme.palette.secondary.dark}`,
		color: theme.palette.text.main,
		zIndex: 4,
		background: 'rgba(0, 0, 0, 0.5)',
		borderRadius: 4,
		fontSize: 14,
		fontWeight: 600,
	},
	price: {
		top: 8,
		left: 8,
		position: 'absolute',
		padding: '4px 8px',
		textShadow: `0 0 5px ${theme.palette.secondary.dark}`,
		color: theme.palette.success.main,
		zIndex: 4,
		background: 'rgba(0, 0, 0, 0.5)',
		borderRadius: 4,
		fontSize: 14,
		fontWeight: 600,
		'&::before': {
			content: '"$"',
			marginRight: 2,
			color: theme.palette.text.main,
		},
	},
	durability: {
		bottom: 36,
		left: 0,
		position: 'absolute',
		width: '100%',
		maxWidth: '100%',
		overflow: 'hidden',
		height: 4,
		background: 'rgba(0, 0, 0, 0.3)',
		zIndex: 4,
	},
	progressbar: {
		transition: 'none !important',
	},
	free: {
		top: 8,
		left: 8,
		position: 'absolute',
		padding: '4px 8px',
		textShadow: `0 0 5px ${theme.palette.secondary.dark}`,
		color: theme.palette.success.main,
		zIndex: 4,
		background: 'rgba(0, 0, 0, 0.5)',
		borderRadius: 4,
		fontSize: 14,
		fontWeight: 600,
	},
}));

export default (props) => {
	const classes = useStyles();
	const hover = useSelector((state) => state.inventory.hover);
	const items = useSelector((state) => state.inventory.items);
	const [state, setState] = React.useState(initialState);

	const itemData = Boolean(hover) ? items[hover.Name] ?? fallbackItem : null;

	const calcDurability = () => {
		if (!Boolean(hover) || !Boolean(itemData?.durability)) null;
		return Math.ceil(
			100 -
				((Math.floor(Date.now() / 1000) - hover?.CreateDate) /
					itemData?.durability) *
					100,
		);
	};
	const durability = calcDurability();

	const broken = durability <= 0;

	const mouseMove = (event) => {
		event.preventDefault();
		setState({
			mouseX: event.clientX,
			mouseY: event.clientY,
		});
	};

	useEffect(() => {
		document.addEventListener('mousemove', mouseMove);
		return () => document.removeEventListener('mousemove', mouseMove);
	}, []);

	if (hover) {
		return (
			<div
				className={classes.hover}
				style={
					state.mouseY !== null && state.mouseX !== null
						? {
								top: state.mouseY,
								left: state.mouseX,
								transform: 'translate(-50%, -50%)',
						  }
						: undefined
				}
			>
				<div
					className={`${classes.slot} rarity-${itemData.rarity}${
						Boolean(broken) ? ' broken' : ''
					}`}
				>
					{Boolean(hover) && (
						<div
							className={classes.img}
							style={{
								backgroundImage: `url(${getItemImage(
									hover,
									itemData,
								)})`,
							}}
						></div>
					)}
					{Boolean(itemData) && (
						<div className={classes.label}>
							{getItemLabel(hover, itemData)}
						</div>
					)}
					{Boolean(hover) && hover.Count > 0 && (
						<div className={classes.count}>{hover.Count}</div>
					)}
					{Boolean(itemData?.durability) &&
					Boolean(hover?.CreateDate) &&
					!broken ? (
						<LinearProgress
							className={classes.durability}
							color="primary"
							classes={{
								determinate: classes.progressbar,
								bar: classes.progressbar,
								bar1: classes.progressbar,
							}}
							variant="determinate"
							value={durability}
						/>
					) : null}
					{hover.shop &&
						Boolean(itemData) &&
						(hover.free ||
						!Boolean(hover.Price ?? itemData.price) ? (
							<div className={classes.free}>FREE</div>
						) : (
							<div className={classes.price}>
								{(hover.Price ?? itemData.price) * hover.Count}
							</div>
						))}
				</div>
			</div>
		);
	} else {
		return <Fragment />;
	}
};
