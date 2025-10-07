import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { LinearProgress } from '@mui/material';
import { fallbackItem, getItemImage, getItemLabel } from '../Inventory/item';

const useStyles = makeStyles((theme) => ({
	container: {
		width: 300,
		pointerEvents: 'none',
		zIndex: 1,
		background: `rgba(15, 17, 21, 0.9)`,
		borderLeft: `4px solid ${theme.palette.primary.main}`,
		borderRadius: '0 6px 6px 0',
		boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
		marginBottom: 8,
		overflow: 'hidden',

		'&.equipped': {
			marginTop: 24,
			borderColor: theme.palette.success.main,
		},

		'&.empty': {
			borderColor: 'rgba(255, 255, 255, 0.2)',
			background: 'rgba(15, 17, 21, 0.7)',
		},

		'&.broken': {
			backgroundColor: `rgba(220, 53, 69, 0.2)`,
			borderColor: `rgba(220, 53, 69, 0.4)`,
		},
	},
	info: {
		display: 'flex',
	},
	label: {
		color: theme.palette.text.main,
		fontSize: 16,
		lineHeight: '20px',
		textShadow: '0 0 5px #000',
		flex: 1,
		height: 'fit-content',
		paddingTop: 15,
		paddingLeft: 10,
		paddingRight: 5,
		width: 188,
		'& small': {
			fontSize: 12,
			display: 'block',
			color: theme.palette.text.alt,
			marginTop: 4,
		},
	},
	image: {
		height: 60,
		width: 60,
		backgroundSize: '70%',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		borderRight: `1px solid rgba(255, 255, 255, 0.1)`,
	},
	count: {
		height: 60,
		width: 48,
		textAlign: 'center',
		lineHeight: '60px',
		borderLeft: `1px solid rgba(255, 255, 255, 0.1)`,
		fontWeight: 600,
	},
	durability: {
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
	itemName: {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		fontWeight: 500,
	},
}));

export default ({ item, slot, equipped }) => {
	const classes = useStyles();
	const items = useSelector((state) => state.inventory.items);

	const itemData = Boolean(item) ? items[item?.Name] ?? fallbackItem : null;

	const calcDurability = () => {
		if (!Boolean(item?.CreateDate) || !Boolean(itemData?.durability)) null;
		return Math.ceil(
			100 -
				((Math.floor(Date.now() / 1000) - item?.CreateDate) /
					itemData?.durability) *
					100,
		);
	};

	const durability = calcDurability();

	const broken = durability <= 0;

	return (
		<div
			className={`${classes.container} ${
				Boolean(item) ? 'occupied' : 'empty'
			} ${equipped ? 'equipped' : ''}${broken ? ' broken' : ''}`}
		>
			<div className={classes.info}>
				{Boolean(itemData) ? (
					<div
						className={classes.image}
						style={{
							backgroundImage: `url(${getItemImage(
								item,
								itemData,
							)})`,
						}}
					></div>
				) : (
					<div className={classes.image}></div>
				)}
				{Boolean(itemData) ? (
					<div className={classes.label}>
						<div className={classes.itemName}>
							{getItemLabel(item, itemData)}
						</div>
						{equipped ? (
							<small>Equipped</small>
						) : (
							<small>Quantity: {item.Count}</small>
						)}
					</div>
				) : (
					<div className={classes.label}></div>
				)}
				<div className={classes.count}>
					{Boolean(slot) ? slot : '-'}
				</div>
			</div>
			{Boolean(itemData?.durability) &&
				Boolean(item?.CreateDate) &&
				(durability > 0 ? (
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
				) : null)}
		</div>
	);
};
