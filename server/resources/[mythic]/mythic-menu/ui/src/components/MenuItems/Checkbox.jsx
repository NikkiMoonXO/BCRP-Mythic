/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Grid, Button } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Nui from "../../util/Nui"

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
  "@keyframes checkPulse": {
    "0%": {
      transform: "scale(1)",
    },
    "50%": {
      transform: "scale(1.2)",
    },
    "100%": {
      transform: "scale(1)",
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
    "&:hover:not(.disabled)": {
      borderLeft: `3px solid ${theme.palette.primary.main}`,
      background: "rgba(40, 40, 50, 0.6)",
      transform: "translateY(-2px)",
      boxShadow: "0 6px 25px rgba(0, 0, 0, 0.15)",
      "&:before": {
        opacity: 1,
        transform: "translateX(0)",
      },
    },
    "&:active": {
      transform: "translateY(0)",
      transition: "all 0.1s",
    },
    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: `linear-gradient(90deg, ${theme.palette.primary.main}10 0%, transparent 100%)`,
      opacity: 0,
      transform: "translateX(-100%)",
      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      zIndex: -1,
    },
  },
  icon: {
    width: "0.75em",
    height: "100%",
    fontSize: "1.25rem",
    color: theme.palette.primary.main,
    transition: "all 0.3s ease",
  },
  uncheckedIcon: {
    width: "0.75em",
    height: "100%",
    fontSize: "1.25rem",
    color: "rgba(255, 255, 255, 0.5)",
    transition: "all 0.3s ease",
  },
  checkedAnimation: {
    animation: "$checkPulse 0.4s ease-out",
  },
  label: {
    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
  },
}))

export default ({ data }) => {
  const classes = useStyles()
  const [selected, setSelected] = useState(data.options.selected)
  const [animating, setAnimating] = useState(false)

  const onClick = () => {
    setSelected(!selected)
    setAnimating(true)
    setTimeout(() => setAnimating(false), 400)

    Nui.send("FrontEndSound", { sound: "SELECT" })
    Nui.send("Selected", {
      id: data.id,
      data: { selected: !selected },
    })
  }

  return (
    <Button className={classes.div} onClick={onClick} disableRipple>
      <Grid container alignItems="center">
        <Grid item xs={2}>
          {selected ? (
            <FontAwesomeIcon
              icon="square-check"
              className={`${classes.icon} ${animating ? classes.checkedAnimation : ""}`}
            />
          ) : (
            <FontAwesomeIcon icon="square" className={classes.uncheckedIcon} />
          )}
        </Grid>
        <Grid item xs={8}>
          <span className={classes.label}>{data.label}</span>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Button>
  )
}