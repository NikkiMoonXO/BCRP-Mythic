import React, { useState } from 'react';
import { CircularProgress, LinearProgress, Popover } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';

import { closeInventory, mergeSlot, moveSlot, swapSlot } from './actions';
import { fallbackItem, getItemImage, getItemLabel } from './item';
import Nui from '../../util/Nui';
import { useSound } from '../../hooks';
import Tooltip from './Tooltip';
import { FormatThousands } from '../../util/Parser';

const useStyles = makeStyles((theme) => ({
	slotWrap: {
		display: 'inline-block',
		boxSizing: 'border-box',
		flexGrow: 0,
		width: 'calc(20% - 8px)',
		maxWidth: 170,
		zIndex: 1,
		position: 'relative',
		'&.mini': {
			width: 132,
			flexBasis: 132,
		},
		'&.equipped': {
			marginLeft: 40,
		},
	},

	slot: {
		width: '100%',
		height: 190,
		'@media only screen and (min-width: 1920px) and (max-width: 1920px)': {
			height: 140,
		},
		backgroundColor: `rgba(30, 33, 43, 0.6)`,
		border: '1px solid rgba(255, 255, 255, 0.08)',
		borderRadius: 6,
		position: 'relative',
		zIndex: 2,
		transition: 'all 0.2s ease',
		boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
		'&.mini': {
			width: 132,
			height: 152,
		},
		'&.solid': {
			backgroundColor: `rgba(40, 44, 52, 0.8)`,
		},
		'&:not(.broken):not(.broken)': {
			transition: 'all 0.2s ease',
			'&:hover': {
				backgroundColor: `rgba(40, 44, 52, 0.9)`,
				transform: 'translateY(-2px)',
				boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
				borderColor: 'rgba(255, 255, 255, 0.15)',
			},
		},
		'&.broken': {
			backgroundColor: `rgba(220, 53, 69, 0.2)`,
			borderColor: `rgba(220, 53, 69, 0.4)`,
			'&:hover': {
				backgroundColor: `rgba(220, 53, 69, 0.25)`,
				borderColor: `rgba(220, 53, 69, 0.5)`,
			},
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
	slotDrag: {
		width: '100%',
		height: 190,
		'@media only screen and (min-width: 1920px) and (max-width: 1920px)': {
			height: 140,
		},
		border: `1px solid ${theme.palette.border.divider}9e`,
		position: 'relative',
		zIndex: 2,
		opacity: 0.35,
		transition: 'opacity ease-in 0.15s, border ease-in 0.15s',
	},
	img: {
		height: 190,
		'@media only screen and (min-width: 1920px) and (max-width: 1920px)': {
			height: 140,
		},
		width: '100%',
		zIndex: 3,
		backgroundSize: '65%',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		'&.mini': {
			height: 152,
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
	label: {
		bottom: 0,
		left: 0,
		right: 0,
		position: 'absolute',
		textAlign: 'center',
		height: 36,
		lineHeight: '36px',
		fontSize: 14,
		width: '100%',
		color: theme.palette.text.main,
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
		padding: '0 8px',
		fontWeight: 500,
	},
	equipped: {
		top: 0,
		left: 0,
		position: 'absolute',
		padding: '4px 8px',
		color: theme.palette.primary.alt,
		background: 'rgba(0, 0, 0, 0.6)',
		borderRight: `1px solid rgba(255, 255, 255, 0.1)`,
		borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
		borderBottomRightRadius: 6,
		zIndex: 4,
		fontSize: 12,
		fontWeight: 600,
	},
	hotkey: {
		height: 'fit-content',
		width: 'fit-content',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		margin: 'auto',
		fontSize: '75px',
		opacity: 0.15,
		zIndex: -1,
		color: 'rgba(255, 255, 255, 0.7)',
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
		'& small': {
			marginLeft: 5,
			'&::before': {
				content: '"($"',
				color: theme.palette.text.alt,
			},
			'&::after': {
				content: '")"',
				color: theme.palette.text.alt,
			},
		},
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
	popover: {
		pointerEvents: 'none',
	},
	paper: {
		padding: 20,
		border: `1px solid rgba(255, 255, 255, 0.08)`,
		borderRadius: 8,
		background: 'rgba(15, 17, 21, 0.95)',
		boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
	},
	loader: {
		height: 'fit-content',
		width: 'fit-content',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		margin: 'auto',
	},
}));

const lua2json = (lua) =>
	JSON.parse(
		lua
			.replace(/\[([^[\]]+)\]\s*=/g, (s, k) => `${k} :`)
			.replace(/,(\s*)\}/gm, (s, k) => `${k}}`),
	);

export default (props) => {
	const metadata = Boolean(props.data?.MetaData)
		? typeof props.data?.MetaData == 'string'
			? lua2json(props?.data?.MetaData)
			: props?.data?.MetaData
		: Object();

	const classes = useStyles();
	const dispatch = useDispatch();
	const soundEffect = useSound();
	const mode = useSelector((state) => state.app.mode);
	const hidden = useSelector((state) => state.app.hidden);
	const hover = useSelector((state) => state.inventory.hover);
	const hoverOrigin = useSelector((state) => state.inventory.hoverOrigin);
	const inUse = useSelector((state) => state.inventory.inUse);
	const showSecondary = useSelector((state) => state.inventory.showSecondary);
	const secondaryInventory = useSelector(
		(state) => state.inventory.secondary,
	);
	const playerInventory = useSelector((state) => state.inventory.player);
	const items = useSelector((state) => state.inventory.items);
	const draggingAmount = useSelector(
		(state) => state.inventory.draggingAmount,
	);

	const itemData = Boolean(props?.data)
		? items[props?.data?.Name] ?? fallbackItem
		: null;
	const hoverData = Boolean(hover)
		? items[hover?.Name] ?? fallbackItem
		: null;

	const calcDurability = () => {
		if (!Boolean(props?.data?.CreateDate) || !Boolean(itemData?.durability))
			null;
		return Math.ceil(
			100 -
				((Math.floor(Date.now() / 1000) - props?.data?.CreateDate) /
					itemData?.durability) *
					100,
		);
	};

	const isWeaponDisabled =
		props.shop &&
		itemData?.requiresLicense &&
		itemData?.type == 2 &&
		!playerInventory.isWeaponEligble;

	const isQualiDisabled =
		props.shop &&
		Boolean(itemData?.qualification) &&
		(!Boolean(playerInventory.qualifications) ||
			playerInventory.qualifications.filter(
				(q) => q == itemData?.qualification,
			).length == 0);

	const isOpenContainer =
		Boolean(props.data) &&
		itemData?.type == 10 &&
		secondaryInventory.owner == `container:${metadata?.Container}`;

	const durability = calcDurability();

	const broken = durability <= 0;

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const tooltipOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const tooltipClose = (e, reason) => {
		setAnchorEl(null);

		if (reason == 'escapeKeyDown') {
			dispatch({
				type: 'SET_CONTEXT_ITEM',
				payload: null,
			});
			dispatch({
				type: 'SET_SPLIT_ITEM',
				payload: null,
			});
			closeInventory();
		}
	};

	const isUsable = () => {
		if (mode != 'inventory') return false;

		return (
			(!Boolean(itemData) || !itemData.invalid) &&
			!Boolean(inUse) &&
			props.owner == playerInventory.owner &&
			itemData.isUsable &&
			(!Boolean(itemData.durability) ||
				props.data?.CreateDate + itemData.durability >
					Date.now() / 1000)
		);
	};

	const moveItem = () => {
		if (Boolean(props?.data) && (!Boolean(itemData) || itemData.invalid))
			return;

		if (
			hoverOrigin.slot !== props.slot ||
			hoverOrigin.owner !== props.owner ||
			hoverOrigin.invType !== props.invType
		) {
			if (isQualiDisabled || isWeaponDisabled || isOpenContainer) {
				return;
			}

			let origin;
			if (
				playerInventory.owner === hoverOrigin.owner &&
				playerInventory.invType == hoverOrigin.invType
			) {
				origin = 'player';
			} else {
				origin = 'secondary';
			}
			let destination;
			if (
				playerInventory.owner === props.owner &&
				playerInventory.invType == props.invType
			) {
				destination = 'player';
			} else {
				destination = 'secondary';
			}

			if (destination == 'secondary' && secondaryInventory.shop) {
				Nui.send('FrontEndSound', 'DISABLED');

				return;
			}

			if (
				destination == 'secondary' &&
				secondaryInventory.playerShop &&
				!secondaryInventory.modifyShop
			) {
				if (props.canAddToShop()) {
					props.onAddToShop({
						...hover,
						slotFrom: hover.Slot,
						slotTo: props.slot,
					});
				} else {
					Nui.send('FrontEndSound', 'DISABLED');
				}
				return;
			}

			if (
				origin != destination &&
				destination == 'player' &&
				props.playerWeight + hoverData.weight * hover.Count >
					props.playerCapacity
			) {
				Nui.send('FrontEndSound', 'DISABLED');
				return;
			}

			if (
				origin != destination &&
				destination == 'secondary' &&
				props.secondaryWeight + hoverData.weight * hover.Count >
					props.secondaryCapacity
			) {
				Nui.send('FrontEndSound', 'DISABLED');
				return;
			}

			if (
				destination == 'player' &&
				origin == 'secondary' &&
				secondaryInventory.shop &&
				Boolean(props?.data?.Name) &&
				hoverOrigin.Name != props?.data?.Name
			) {
				Nui.send('FrontEndSound', 'DISABLED');
				return;
			}

			const payload = {
				origin: {
					...hover,
					isStackable: itemData?.isStackable,
				},
				destination: props.data,
				originSlot: hoverOrigin.slot,
				destSlot: props.slot,
				itemData: hoverData,
			};

			setAnchorEl(null);
			const isSplit = hoverOrigin.Count != hover.Count;
			if (origin === destination) {
				if (origin === 'player') {
					const destSlot = playerInventory.inventory.filter(
						(s) => Boolean(s) && s.Slot == props.slot,
					)[0];

					if (Boolean(destSlot)) {
						if (
							destSlot.Name == hover.Name &&
							destSlot.Count + hover.Count <=
								items[destSlot.Name].isStackable
						) {
							if (isSplit) {
								moveSlot(
									hoverOrigin.owner,
									props.owner,
									hoverOrigin.slot,
									props.slot,
									hoverOrigin.invType,
									props.invType,
									hoverOrigin.Name,
									hoverOrigin.Count,
									hover.Count,
									hoverOrigin.class,
									props.vehClass,
									hoverOrigin.model,
									props.vehModel,
									hoverOrigin.slotOverride,
									props.slotOverride,
									hoverOrigin.capacityOverride,
									props.capacityOverride,
									isSplit,
								);
								dispatch({
									type: 'SPLIT_ITEM_PLAYER_SAME',
									payload,
								});
							} else {
								mergeSlot(
									hoverOrigin.owner,
									props.owner,
									hoverOrigin.slot,
									props.slot,
									hoverOrigin.invType,
									props.invType,
									hoverOrigin.Name,
									hoverOrigin.Count,
									hover.Count,
									hoverOrigin.class,
									props.vehClass,
									hoverOrigin.model,
									props.vehModel,
									hoverOrigin.slotOverride,
									props.slotOverride,
									hoverOrigin.capacityOverride,
									props.capacityOverride,
								);
								dispatch({
									type: 'MERGE_ITEM_PLAYER_SAME',
									payload,
								});
							}
						} else {
							swapSlot(
								hoverOrigin.owner,
								props.owner,
								hoverOrigin.slot,
								props.slot,
								hoverOrigin.invType,
								props.invType,
								hoverOrigin.Name,
								hoverOrigin.Count,
								hover.Count,
								hoverOrigin.class,
								props.vehClass,
								hoverOrigin.model,
								props.vehModel,
								hoverOrigin.slotOverride,
								props.slotOverride,
								hoverOrigin.capacityOverride,
								props.capacityOverride,
							);
							dispatch({
								type: 'SWAP_ITEM_PLAYER_SAME',
								payload,
							});
						}
					} else {
						moveSlot(
							hoverOrigin.owner,
							props.owner,
							hoverOrigin.slot,
							props.slot,
							hoverOrigin.invType,
							props.invType,
							hoverOrigin.Name,
							hoverOrigin.Count,
							hover.Count,
							hoverOrigin.class,
							props.vehClass,
							hoverOrigin.model,
							props.vehModel,
							hoverOrigin.slotOverride,
							props.slotOverride,
							hoverOrigin.capacityOverride,
							props.capacityOverride,
							isSplit,
						);
						if (isSplit) {
							dispatch({
								type: 'SPLIT_ITEM_PLAYER_SAME',
								payload,
							});
						} else {
							dispatch({
								type: 'MOVE_ITEM_PLAYER_SAME',
								payload,
							});
						}
					}
				} else {
					const destSlot = secondaryInventory.inventory.filter(
						(s) => Boolean(s) && s.Slot == props.slot,
					)[0];

					if (Boolean(destSlot)) {
						if (
							destSlot.Name == hover.Name &&
							destSlot.Count + hover.Count <=
								items[destSlot.Name].isStackable
						) {
							if (isSplit) {
								moveSlot(
									hoverOrigin.owner,
									props.owner,
									hoverOrigin.slot,
									props.slot,
									hoverOrigin.invType,
									props.invType,
									hoverOrigin.Name,
									hoverOrigin.Count,
									hover.Count,
									hoverOrigin.class,
									props.vehClass,
									hoverOrigin.model,
									props.vehModel,
									hoverOrigin.slotOverride,
									props.slotOverride,
									hoverOrigin.capacityOverride,
									props.capacityOverride,
									isSplit,
								);
								dispatch({
									type: 'SPLIT_ITEM_SECONDARY_SAME',
									payload,
								});
							} else {
								if (
									secondaryInventory.playerShop &&
									props?.data?.Price != hover?.Price
								) {
									Nui.send('FrontEndSound', 'DISABLED');
									return;
								}

								mergeSlot(
									hoverOrigin.owner,
									props.owner,
									hoverOrigin.slot,
									props.slot,
									hoverOrigin.invType,
									props.invType,
									hoverOrigin.Name,
									hoverOrigin.Count,
									hover.Count,
									hoverOrigin.class,
									props.vehClass,
									hoverOrigin.model,
									props.vehModel,
									hoverOrigin.slotOverride,
									props.slotOverride,
									hoverOrigin.capacityOverride,
									props.capacityOverride,
								);
								dispatch({
									type: 'MERGE_ITEM_SECONDARY_SAME',
									payload,
								});
							}
						} else {
							swapSlot(
								hoverOrigin.owner,
								props.owner,
								hoverOrigin.slot,
								props.slot,
								hoverOrigin.invType,
								props.invType,
								hoverOrigin.Name,
								hoverOrigin.Count,
								hover.Count,
								hoverOrigin.class,
								props.vehClass,
								hoverOrigin.model,
								props.vehModel,
								hoverOrigin.slotOverride,
								props.slotOverride,
								hoverOrigin.capacityOverride,
								props.capacityOverride,
							);
							dispatch({
								type: 'SWAP_ITEM_SECONDARY_SAME',
								payload,
							});
						}
					} else {
						moveSlot(
							hoverOrigin.owner,
							props.owner,
							hoverOrigin.slot,
							props.slot,
							hoverOrigin.invType,
							props.invType,
							hoverOrigin.Name,
							hoverOrigin.Count,
							hover.Count,
							hoverOrigin.class,
							props.vehClass,
							hoverOrigin.model,
							props.vehModel,
							hoverOrigin.slotOverride,
							props.slotOverride,
							hoverOrigin.capacityOverride,
							props.capacityOverride,
							isSplit,
						);
						if (isSplit) {
							dispatch({
								type: 'SPLIT_ITEM_SECONDARY_SAME',
								payload,
							});
						} else {
							dispatch({
								type: 'MOVE_ITEM_SECONDARY_SAME',
								payload,
							});
						}
					}
				}
			} else {
				if (origin === 'player') {
					if (secondaryInventory.playerShop) {
						if (props.canAddToShop()) {
							props.onAddToShop({
								...hover,
								slotFrom: hover.Slot,
								slotTo: props.slot,
							});
							Nui.send('FrontEndSound', 'SHOP_ADD');
						} else {
							Nui.send('FrontEndSound', 'DISABLED');
						}
						return;
					}

					const destSlot = secondaryInventory.inventory.filter(
						(s) => Boolean(s) && s.Slot == props.slot,
					)[0];

					if (Boolean(destSlot)) {
						if (
							destSlot.Name == hover.Name &&
							destSlot.Count + hover.Count <=
								items[destSlot.Name].isStackable
						) {
							if (isSplit) {
								moveSlot(
									hoverOrigin.owner,
									props.owner,
									hoverOrigin.slot,
									props.slot,
									hoverOrigin.invType,
									props.invType,
									hoverOrigin.Name,
									hoverOrigin.Count,
									hover.Count,
									hoverOrigin.class,
									props.vehClass,
									hoverOrigin.model,
									props.vehModel,
									hoverOrigin.slotOverride,
									props.slotOverride,
									hoverOrigin.capacityOverride,
									props.capacityOverride,
									isSplit,
								);
								dispatch({
									type: 'SPLIT_ITEM_PLAYER_TO_SECONDARY',
									payload,
								});
							} else {
								mergeSlot(
									hoverOrigin.owner,
									props.owner,
									hoverOrigin.slot,
									props.slot,
									hoverOrigin.invType,
									props.invType,
									hoverOrigin.Name,
									hoverOrigin.Count,
									hover.Count,
									hoverOrigin.class,
									props.vehClass,
									hoverOrigin.model,
									props.vehModel,
									hoverOrigin.slotOverride,
									props.slotOverride,
									hoverOrigin.capacityOverride,
									props.capacityOverride,
								);
								dispatch({
									type: 'MERGE_ITEM_PLAYER_TO_SECONDARY',
									payload,
								});
							}
						} else if (
							!secondaryInventory.shop &&
							!secondaryInventory.playerShop
						) {
							swapSlot(
								hoverOrigin.owner,
								props.owner,
								hoverOrigin.slot,
								props.slot,
								hoverOrigin.invType,
								props.invType,
								hoverOrigin.Name,
								hoverOrigin.Count,
								hover.Count,
								hoverOrigin.class,
								props.vehClass,
								hoverOrigin.model,
								props.vehModel,
								hoverOrigin.slotOverride,
								props.slotOverride,
								hoverOrigin.capacityOverride,
								props.capacityOverride,
							);
							dispatch({
								type: 'SWAP_ITEM_PLAYER_TO_SECONDARY',
								payload,
							});
						}
					} else {
						moveSlot(
							hoverOrigin.owner,
							props.owner,
							hoverOrigin.slot,
							props.slot,
							hoverOrigin.invType,
							props.invType,
							hoverOrigin.Name,
							hoverOrigin.Count,
							hover.Count,
							hoverOrigin.class,
							props.vehClass,
							hoverOrigin.model,
							props.vehModel,
							hoverOrigin.slotOverride,
							props.slotOverride,
							hoverOrigin.capacityOverride,
							props.capacityOverride,
							isSplit,
						);
						if (isSplit) {
							dispatch({
								type: 'SPLIT_ITEM_PLAYER_TO_SECONDARY',
								payload,
							});
						} else {
							dispatch({
								type: 'MOVE_ITEM_PLAYER_TO_SECONDARY',
								payload,
							});
						}
					}
				} else {
					const destSlot = playerInventory.inventory.filter(
						(s) => Boolean(s) && s.Slot == props.slot,
					)[0];

					if (Boolean(destSlot)) {
						if (
							destSlot.Name == hover.Name &&
							destSlot.Count + hover.Count <=
								items[destSlot.Name].isStackable
						) {
							if (isSplit) {
								moveSlot(
									hoverOrigin.owner,
									props.owner,
									hoverOrigin.slot,
									props.slot,
									hoverOrigin.invType,
									props.invType,
									hoverOrigin.Name,
									hoverOrigin.Count,
									hover.Count,
									hoverOrigin.class,
									props.vehClass,
									hoverOrigin.model,
									props.vehModel,
									hoverOrigin.slotOverride,
									props.slotOverride,
									hoverOrigin.capacityOverride,
									props.capacityOverride,
									isSplit,
								);
								dispatch({
									type: 'SPLIT_ITEM_SECONDARY_TO_PLAYER',
									payload,
								});
							} else {
								mergeSlot(
									hoverOrigin.owner,
									props.owner,
									hoverOrigin.slot,
									props.slot,
									hoverOrigin.invType,
									props.invType,
									hoverOrigin.Name,
									hoverOrigin.Count,
									hover.Count,
									hoverOrigin.class,
									props.vehClass,
									hoverOrigin.model,
									props.vehModel,
									hoverOrigin.slotOverride,
									props.slotOverride,
									hoverOrigin.capacityOverride,
									props.capacityOverride,
								);
								dispatch({
									type: 'MERGE_ITEM_SECONDARY_TO_PLAYER',
									payload,
								});
							}
						} else if (
							!secondaryInventory.shop &&
							!secondaryInventory.playerShop
						) {
							swapSlot(
								hoverOrigin.owner,
								props.owner,
								hoverOrigin.slot,
								props.slot,
								hoverOrigin.invType,
								props.invType,
								hoverOrigin.Name,
								hoverOrigin.Count,
								hover.Count,
								hoverOrigin.class,
								props.vehClass,
								hoverOrigin.model,
								props.vehModel,
								hoverOrigin.slotOverride,
								props.slotOverride,
								hoverOrigin.capacityOverride,
								props.capacityOverride,
							);
							dispatch({
								type: 'SWAP_ITEM_SECONDARY_TO_PLAYER',
								payload,
							});
						}
					} else {
						moveSlot(
							hoverOrigin.owner,
							props.owner,
							hoverOrigin.slot,
							props.slot,
							hoverOrigin.invType,
							props.invType,
							hoverOrigin.Name,
							hoverOrigin.Count,
							hover.Count,
							hoverOrigin.class,
							props.vehClass,
							hoverOrigin.model,
							props.vehModel,
							hoverOrigin.slotOverride,
							props.slotOverride,
							hoverOrigin.capacityOverride,
							props.capacityOverride,
							isSplit,
						);
						if (isSplit) {
							dispatch({
								type: 'SPLIT_ITEM_SECONDARY_TO_PLAYER',
								payload,
							});
						} else {
							dispatch({
								type: 'MOVE_ITEM_SECONDARY_TO_PLAYER',
								payload,
							});
						}
					}
				}
			}
			setAnchorEl(null);
			soundEffect('drag');
		}

		dispatch({
			type: 'SET_HOVER',
			payload: null,
		});
		dispatch({
			type: 'SET_HOVER_ORIGIN',
			payload: null,
		});
	};

	const onMouseDown = (event) => {
		event.preventDefault();
		if (props.locked || (Boolean(itemData) && itemData.invalid)) return;
		if (hoverOrigin == null) {
			if (!Boolean(props.data?.Name)) return;
			if (event.button !== 0 && event.button !== 1) return;

			if (isQualiDisabled || isWeaponDisabled || isOpenContainer) {
				Nui.send('FrontEndSound', 'DISABLED');
				return;
			}

			if (event.button === 1) {
				if (isUsable()) {
					props.onUse(props.owner, props?.data?.Slot, props.invType);
					dispatch({
						type: 'USE_ITEM_PLAYER',
						payload: {
							originSlot: props?.data?.Slot,
						},
					});
				} else {
					Nui.send('FrontEndSound', 'DISABLED');
					return;
				}
			} else {
				if (event.shiftKey && showSecondary) {
					if (
						playerInventory.owner === props.owner &&
						playerInventory.invType === props.invType &&
						props.secondaryWeight +
							itemData.weight * props?.data?.Count >
							props.secondaryCapacity
					) {
						Nui.send('FrontEndSound', 'DISABLED');
						return;
					}

					if (
						secondaryInventory.owner === props.owner &&
						secondaryInventory.invType === props.invType &&
						props.playerWeight +
							itemData.weight * props?.data?.Count >
							props.playerCapacity
					) {
						Nui.send('FrontEndSound', 'DISABLED');
						return;
					}

					const payload = {
						origin: {
							...props.data,
							slot: props.slot,
							owner: props.owner,
							invType: props.invType,
							shop: props.shop,
							isStackable: itemData.isStackable,
						},
						destination: Object(),
						originSlot: props.slot,
						itemData: itemData,
					};

					if (
						playerInventory.owner === props.owner &&
						playerInventory.invType === props.invType
					) {
						if (secondaryInventory.shop) {
							Nui.send('FrontEndSound', 'DISABLED');
							return;
						}

						secondaryInventory.inventory
							.filter((s) => Boolean(s))
							.sort((a, b) => a.Slot - b.Slot)
							.every((slot) => {
								if (
									slot.Name == props?.data?.Name &&
									Boolean(itemData.isStackable) &&
									props?.data?.Count + slot.Count <=
										itemData.isStackable
								) {
									payload.destination = slot;
									payload.destSlot = slot.Slot;
									return false;
								}
								return true;
							});

						if (!Boolean(payload.destSlot)) {
							for (let i = 1; i <= secondaryInventory.size; i++) {
								if (
									secondaryInventory.inventory.filter(
										(s) => Boolean(s) && s.Slot == i,
									).length == 0
								) {
									payload.destSlot = i;
									break;
								}
							}
						}

						if (Boolean(payload.destSlot)) {
							if (secondaryInventory.playerShop) {
								if (props.canAddToShop()) {
									props.onAddToShop({
										...props?.data,
										slotFrom: props.slot,
										slotTo: payload.destSlot,
									});
									Nui.send('FrontEndSound', 'SHOP_ADD');
								} else {
									Nui.send('FrontEndSound', 'DISABLED');
								}
								return;
							}
							soundEffect('drag');

							if (
								secondaryInventory.inventory.filter(
									(s) =>
										Boolean(s) &&
										s.Slot == payload.destSlot,
								).length > 0
							) {
								mergeSlot(
									playerInventory.owner,
									secondaryInventory.owner,
									props.slot,
									payload.destSlot,
									props.invType,
									secondaryInventory.invType,
									props?.data?.Name,
									props?.data?.Count,
									props?.data?.Count,
									false,
									secondaryInventory.class,
									false,
									secondaryInventory.model,
									false,
									secondaryInventory.slotOverride,
									false,
									secondaryInventory.capacityOverride,
								);
								dispatch({
									type: 'MERGE_ITEM_PLAYER_TO_SECONDARY',
									payload,
								});
							} else {
								moveSlot(
									playerInventory.owner,
									secondaryInventory.owner,
									props.slot,
									payload.destSlot,
									props.invType,
									secondaryInventory.invType,
									props?.data?.Name,
									props?.data?.Count,
									props?.data?.Count,
									false,
									secondaryInventory.class,
									false,
									secondaryInventory.model,
									false,
									secondaryInventory.slotOverride,
									false,
									secondaryInventory.capacityOverride,
								);
								dispatch({
									type: 'MOVE_ITEM_PLAYER_TO_SECONDARY',
									payload,
								});
							}
							setAnchorEl(null);
						} else {
							Nui.send('FrontEndSound', 'DISABLED');
						}
					} else {
						playerInventory.inventory
							.filter((s) => Boolean(s))
							.sort((a, b) => a.Slot - b.Slot)
							.every((slot) => {
								if (
									slot.Name == props?.data?.Name &&
									Boolean(itemData.isStackable) &&
									props?.data?.Count + slot.Count <=
										itemData.isStackable
								) {
									payload.destination = slot;
									payload.destSlot = slot.Slot;
									return false;
								}
								return true;
							});

						if (!Boolean(payload.destSlot)) {
							for (let i = 1; i <= playerInventory.size; i++) {
								if (
									playerInventory.inventory.filter(
										(s) => Boolean(s) && s.Slot == i,
									).length == 0
								) {
									payload.destSlot = i;
									break;
								}
							}
						}

						if (Boolean(payload.destSlot)) {
							soundEffect('drag');

							if (
								playerInventory.inventory.filter(
									(s) =>
										Boolean(s) &&
										s.Slot == payload.destSlot,
								).length > 0
							) {
								mergeSlot(
									secondaryInventory.owner,
									playerInventory.owner,
									props.slot,
									payload.destSlot,
									props.invType,
									1,
									props?.data?.Name,
									props?.data?.Count,
									props?.data?.Count,
									secondaryInventory.class,
									false,
									secondaryInventory.model,
									false,
									secondaryInventory.slotOverride,
									false,
									secondaryInventory.capacityOverride,
									false,
								);
								dispatch({
									type: 'MERGE_ITEM_SECONDARY_TO_PLAYER',
									payload,
								});
							} else {
								moveSlot(
									secondaryInventory.owner,
									playerInventory.owner,
									props.slot,
									payload.destSlot,
									props.invType,
									1,
									props?.data?.Name,
									props?.data?.Count,
									props?.data?.Count,
									secondaryInventory.class,
									false,
									secondaryInventory.model,
									false,
									secondaryInventory.slotOverride,
									false,
									secondaryInventory.capacityOverride,
									false,
								);
								dispatch({
									type: 'MOVE_ITEM_SECONDARY_TO_PLAYER',
									payload,
								});
							}
							setAnchorEl(null);
						} else {
							Nui.send('FrontEndSound', 'DISABLED');
						}
					}
					setAnchorEl(null);
				} else if (event.ctrlKey) {
					dispatch({
						type: 'SET_HOVER',
						payload: {
							...props.data,
							slot: props.slot,
							owner: props.owner,
							shop: props.shop,
							free: props.free,
							invType: props.invType,
							Count:
								draggingAmount < props?.data?.Count &&
								draggingAmount !== '' &&
								draggingAmount > 0
									? Number(draggingAmount)
									: props?.data?.Count,
						},
					});
					dispatch({
						type: 'SET_HOVER_ORIGIN',
						payload: {
							...props.data,
							slot: props.slot,
							owner: props.owner,
							shop: props.shop,
							invType: props.invType,
							class: props.vehClass || false,
							model: props.vehModel || false,
						},
					});
					setAnchorEl(null);
				} else {
					dispatch({
						type: 'SET_HOVER',
						payload: {
							...props.data,
							slot: props.slot,
							owner: props.owner,
							shop: props.shop,
							free: props.free,
							invType: props.invType,
							Count:
								draggingAmount < props?.data?.Count &&
								draggingAmount !== '' &&
								draggingAmount > 0
									? Number(draggingAmount)
									: props?.data?.Count,
						},
					});
					dispatch({
						type: 'SET_HOVER_ORIGIN',
						payload: {
							...props.data,
							slot: props.slot,
							owner: props.owner,
							shop: props.shop,
							invType: props.invType,
							class: props.vehClass || false,
							model: props.vehModel || false,
						},
					});
					setAnchorEl(null);
				}
			}
		} else {
			moveItem();
		}
	};

	const onMouseUp = (event) => {
		if (props.locked) return;
		if (hoverOrigin == null) return;
		if (event.button !== 0) return;

		if (!event.shiftKey || !showSecondary) {
			moveItem();
		}
	};

	return (
		<div
			className={`${classes.slotWrap}${
				Boolean(props.equipped) ? ' equipped' : ''
			}${props.mini ? ' mini' : ''}`}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onContextMenu={Boolean(itemData) ? props.onContextMenu : null}
			onMouseEnter={Boolean(itemData) ? tooltipOpen : null}
			onMouseLeave={Boolean(itemData) ? tooltipClose : null}
		>
			<div
				className={`${classes.slot}${props.mini ? ' mini' : ''}${
					props.solid ? ' solid' : ''
				} ${
					!Boolean(props.data?.Name)
						? ` empty`
						: ` rarity-${itemData.rarity}`
				}${
					hoverOrigin != null &&
					hoverOrigin.slot === props.slot &&
					hoverOrigin.owner === props.owner &&
					hoverOrigin.invType === props.invType
						? ` ${classes.slotDrag}`
						: ''
				}${
					isQualiDisabled || isWeaponDisabled || isOpenContainer
						? ' disabled'
						: ''
				}${
					Boolean(broken) &&
					Boolean(itemData) &&
					!Boolean(props.locked)
						? ' broken'
						: ''
				}`}
			>
				{Boolean(itemData) && (
					<div
						className={`${classes.img}${props.mini ? ' mini' : ''}`}
						style={{
							backgroundImage: `url(${getItemImage(
								props.data,
								itemData,
							)})`,
						}}
					></div>
				)}
				{Boolean(itemData) && props?.data?.Count > 0 && (
					<div className={classes.count}>{props?.data?.Count}</div>
				)}
				{props.hotkeys && props.slot <= 5 && !Boolean(props?.data) && (
					<div className={classes.hotkey}>
						{Boolean(props.equipped) ? 'Equipped' : props.slot}
					</div>
				)}
				{props.shop &&
					Boolean(itemData) &&
					!itemData?.invalid &&
					(props.free ||
					(props?.data?.Price ?? itemData.price) == 0 ? (
						<div className={classes.free}>FREE</div>
					) : (
						<div className={classes.price}>
							{FormatThousands(
								(props?.data?.Price ?? itemData.price) *
									props?.data?.Count,
							)}
							{props?.data?.Count > 1 && (
								<small>
									{FormatThousands(
										props?.data?.Price ?? itemData.price,
									)}
								</small>
							)}
						</div>
					))}
				{props.playerShop &&
					Boolean(itemData) &&
					!itemData?.invalid &&
					(props?.data?.Price > 0 ? (
						<div className={classes.price}>
							{FormatThousands(
								props?.data?.Price * props?.data?.Count,
							)}
							{props?.data?.Count > 1 && (
								<small>
									{FormatThousands(props?.data?.Price)}
								</small>
							)}
						</div>
					) : (
						<div className={classes.free}>FREE</div>
					))}
				{Boolean(itemData?.durability) &&
					Boolean(props?.data?.CreateDate) &&
					(!broken ? (
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
				{Boolean(itemData) && (
					<div className={classes.label}>
						{getItemLabel(props.data, itemData)}
					</div>
				)}
				{Boolean(props.locked) && (
					<div className={classes.loader}>
						<CircularProgress color="primary" size={30} />
					</div>
				)}
			</div>
			{Boolean(itemData) && (
				<Popover
					className={classes.popover}
					classes={{
						paper: `${classes.paper} rarity-${itemData.rarity}`,
					}}
					open={
						open && !Boolean(hover) && !hidden && Boolean(anchorEl)
					}
					anchorEl={anchorEl}
					anchorOrigin={
						props.secondary
							? {
									vertical: 'center',
									horizontal: 'left',
							  }
							: {
									vertical: 'center',
									horizontal: 'right',
							  }
					}
					transformOrigin={
						props.secondary
							? {
									vertical: 'center',
									horizontal: 'right',
							  }
							: {
									vertical: 'center',
									horizontal: 'left',
							  }
					}
					onClose={tooltipClose}
					transitionDuration={100}
				>
					<Tooltip
						isEligible={!isWeaponDisabled}
						isQualified={!isQualiDisabled}
						item={itemData}
						instance={props.data}
						durability={durability}
						invType={props.invType}
						shop={props.shop}
						free={props.free}
					/>
				</Popover>
			)}
		</div>
	);
};
