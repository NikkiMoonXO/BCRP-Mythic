import React from 'react';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import Nui from '../../util/Nui';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const useStyles = makeStyles((theme) => ({
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "translateY(10px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  "@keyframes arrowPulse": {
    "0%": {
      transform: "translateX(0)",
    },
    "50%": {
      transform: "translateX(-3px)",
    },
    "100%": {
      transform: "translateX(0)",
    },
  },
  div: {
    background: "rgba(30, 30, 40, 0.4)",
    
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderLeft: "3px solid rgba(255, 255, 255, 0.1)",
    color: theme.palette.text.main,
    fontSize: 14,
    fontWeight: 500,
    height: 48,
    width: "100%",
    textAlign: "left",
    userSelect: "none",
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    marginBottom: 16,
    borderRadius: "12px 12px 12px 12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    position: "relative",
    overflow: "hidden",
    animation: "$fadeIn 0.3s ease-out",
    display: "flex",
    alignItems: "center",
    padding: "0 20px",
    "&:hover:not(.disabled)": {
      borderLeft: `3px solid ${theme.palette.error.main}`,
      background: "rgba(40, 40, 50, 0.6)",
      transform: "translateY(-2px)",
      "&:before": {
        opacity: 1,
        transform: "translateX(0)",
      },
      "& .arrow": {
        animation: "$arrowPulse 1s infinite ease-in-out",
        color: theme.palette.error.main,
      },
    },
    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: `linear-gradient(90deg, ${theme.palette.error.main}10 0%, transparent 100%)`,
      opacity: 0,
      transform: "translateX(-100%)",
      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      zIndex: -1,
    },
  },
  arrow: {
    marginRight: 10,
    fontSize: 14,
    transition: "transform 0.2s ease",
    color: "rgba(255, 255, 255, 0.5)",
  },
}))

export default ({ data }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const onClick = () => {
    if (!data.options.disabled) {
      Nui.send("FrontEndSound", { sound: "BACK" })
      Nui.send("Selected", {
        id: data.id,
      })

      dispatch({
        type: "SUBMENU_BACK",
      })
    }
  }

  return (
    <Button className={classes.div} onClick={onClick} disableRipple>
      <FontAwesomeIcon icon="chevron-left" className={`arrow ${classes.arrow}`} />
      <span>{data.label}</span>
    </Button>
  )
}