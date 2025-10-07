import React, { useState } from 'react';
import { Slider as MSlider, Tooltip, Grid } from "@mui/material"
import { withStyles, makeStyles } from "@mui/styles"
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
  "@keyframes pulse": {
    "0%": {
      transform: "scale(1)",
      opacity: 0.8,
    },
    "50%": {
      transform: "scale(1.1)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(1)",
      opacity: 0.8,
    },
  },
  div: {
    background: "rgba(30, 30, 40, 0.4)",
    
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderLeft: "3px solid rgba(255, 255, 255, 0.1)",
    color: theme.palette.text.main,
    fontSize: 13,
    height: 84,
    width: "100%",
    textAlign: "center",
    userSelect: "none",
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    padding: "14px 20px",
    marginBottom: 16,
    borderRadius: "12px 12px 12px 12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    position: "relative",
    overflow: "hidden",
    animation: "$fadeIn 0.3s ease-out",
    "&:hover:not(.disabled)": {
      borderLeft: `3px solid ${theme.palette.primary.main}`,
      background: "rgba(40, 40, 50, 0.6)",
      "&:before": {
        opacity: 1,
        transform: "translateX(0)",
      },
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
  label: {
    display: "block",
    width: "100%",
    fontSize: 14,
    fontWeight: 500,
    color: "rgba(255, 255, 255, 0.9)",
    letterSpacing: 0.5,
    textAlign: "left",
  },
  slider: {
    display: "block",
    position: "relative",
    top: "25%",
  },
  saveContainer: {
    textAlign: "right",
    color: theme.palette.success.main,
    "&:hover": {
      color: theme.palette.success.light,
      cursor: "pointer",
    },
  },
  icon: {
    width: "0.75em",
    height: "100%",
    fontSize: "1.25rem",
    float: "right",
    animation: "$pulse 1.5s infinite ease-in-out",
  },
}))

function ValueLabelComponent(props) {
  const { children, open, value } = props

  return (
    <Tooltip
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={value}
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: (theme) => theme.palette.primary.main,
            color: "#fff",
            "& .MuiTooltip-arrow": {
              color: (theme) => theme.palette.primary.main,
            },
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            borderRadius: "8px",
            padding: "6px 12px",
            fontSize: "12px",
            fontWeight: 500,
          },
        },
      }}
    >
      {children}
    </Tooltip>
  )
}

const XSlider = withStyles((theme) => ({
  root: {
    height: 8,
    padding: "15px 0",
  },
  thumb: {
    height: 18,
    width: 18,
    backgroundColor: "#fff",
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: `0 0 10px ${theme.palette.primary.main}80`,
    "&:focus, &:hover, &.Mui-active": {
      boxShadow: `0 0 15px ${theme.palette.primary.main}`,
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  },
  rail: {
    height: 8,
    borderRadius: 4,
    opacity: 0.2,
    backgroundColor: "#fff",
  },

  markActive: {
    backgroundColor: theme.palette.primary.light,
  },
}))(MSlider)

export default ({ data }) => {
  const classes = useStyles()

  const [currValue, setCurrValue] = useState(data.options.current)
  const [savedValue, setSavedValue] = useState(currValue)

  const onChange = (event, newValue) => {
    if (!data.disabled) {
      setCurrValue(newValue)
    }
  }

  const onSave = () => {
    if (!data.disabled && currValue != savedValue) {
      setSavedValue(currValue)
      Nui.send("FrontEndSound", { sound: "SELECT" })
      Nui.send("Selected", {
        id: data.id,
        data: { value: currValue },
      })
    }
  }

  var cssClass = data.options.disabled ? `${classes.div} disabled` : classes.div
  var style = data.options.disabled ? { opacity: 0.5, pointerEvents: "none" } : {}

  return (
    <div className={cssClass} style={style}>
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <span className={classes.label}>{data.label}</span>
        </Grid>
        <Grid item xs={2} className={classes.saveContainer} onClick={onSave}>
          {currValue == savedValue ? null : <FontAwesomeIcon icon="circle-check" className={classes.icon} />}
        </Grid>
        <Grid item xs={12}>
          <XSlider
            valueLabelDisplay="auto"
            className={classes.slider}
            onChange={onChange}
            components={{
              ValueLabel: ValueLabelComponent,
            }}
            defaultValue={0}
            value={currValue}
            step={data.options.step != null ? data.options.step : 1}
            min={data.options.min}
            max={data.options.max}
            component="div"
            marks
          />
        </Grid>
      </Grid>
    </div>
  )
}
