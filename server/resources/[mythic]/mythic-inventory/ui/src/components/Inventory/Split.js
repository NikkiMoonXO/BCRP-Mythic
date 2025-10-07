import React, { useEffect, useState } from 'react';
import { TextField, ButtonGroup, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: 25,
		background: 'rgba(15, 17, 21, 0.95)',
		borderRadius: 8,
	},
	input: {
		width: '100%',
		height: '100%',
		'& .MuiOutlinedInput-root': {
			borderRadius: 6,
		},
	},
	quickActions: {
		marginTop: 15,
		textAlign: 'center',
	},
	btn: {
		background: 'rgba(255, 255, 255, 0.08)',
		border: '1px solid rgba(255, 255, 255, 0.05)',
		transition: 'all 0.2s ease',
		'&:hover': {
			background: 'rgba(255, 255, 255, 0.12)',
			borderColor: theme.palette.primary.main,
			transform: 'translateY(-2px)',
		},
	},
	moveBtn: {
		background: 'rgba(255, 255, 255, 0.08)',
		border: '1px solid rgba(255, 255, 255, 0.05)',
		borderRadius: 6,
		padding: '10px 0',
		fontSize: 16,
		fontWeight: 600,
		transition: 'all 0.2s ease',
		'&:hover': {
			background: 'rgba(255, 255, 255, 0.12)',
			borderColor: theme.palette.primary.main,
			transform: 'translateY(-2px)',
		},
	},
}));

export default React.forwardRef((props, ref) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [val, setVal] = useState(props.data.item.Count);

	useEffect(() => {
		return () => {
			setVal(0);
		};
	}, []);

	const onChange = (e) => {
		setVal(
			e.target.value > props.data.item.Count
				? Math.max(1, Math.min(props.data.item.Count, 10000))
				: Math.max(1, Math.min(Math.floor(e.target.value), 10000)),
		);
	};

	const drag = (e, v = null) => {
		dispatch({
			type: 'SET_HOVER',
			payload: {
				slot: props.data.item.Slot,
				owner: props.data.owner,
				shop: props.data.shop,
				invType: props.data.invType,
				...props.data.item,
				Count: Math.floor(Boolean(v) ? v : val),
			},
		});
		dispatch({
			type: 'SET_HOVER_ORIGIN',
			payload: {
				slot: props.data.item.Slot,
				owner: props.data.owner,
				shop: props.data.shop,
				invType: props.data.invType,
				class: props.data.vehClass,
				model: props.data.vehModel,
				...props.data.item,
			},
		});
		dispatch({
			type: 'SET_SPLIT_ITEM',
			payload: null,
		});
	};

	return (
		<div className={classes.wrapper}>
			<div className={classes.inputWrap}>
				<TextField
					className={classes.input}
					label="Amount"
					type="number"
					value={val}
					helperText="Use scroll wheel +/-"
					inputProps={{
						min: 0,
						max:
							props.data.item.Count > 10000
								? 10000
								: props.data.item.Count,
					}}
					onChange={onChange}
				/>
			</div>
			<div className={classes.quickActions}>
				<ButtonGroup variant="contained" color="secondary">
					<Button className={classes.btn} onClick={(e) => drag(e, 1)}>
						Single
					</Button>
					<Button
						className={classes.btn}
						onClick={(e) =>
							drag(
								e,
								Math.max(
									1,
									Math.min(props.data.item.Count / 4, 10000),
								),
							)
						}
					>
						1/4
					</Button>
					<Button
						className={classes.btn}
						onClick={(e) =>
							drag(
								e,
								Math.max(
									1,
									Math.min(props.data.item.Count / 2, 10000),
								),
							)
						}
					>
						1/2
					</Button>
					<Button
						className={classes.btn}
						onClick={(e) =>
							drag(
								e,
								Math.max(
									1,
									Math.min(props.data.item.Count, 10000),
								),
							)
						}
					>
						Max
					</Button>
				</ButtonGroup>
			</div>
			<div className={classes.quickActions}>
				<ButtonGroup
					fullWidth
					size="large"
					variant="contained"
					color="primary"
				>
					<Button className={classes.moveBtn} onClick={drag}>
						Move
					</Button>
				</ButtonGroup>
			</div>
		</div>
	);
});
