import React, { useState } from 'react';
import { IconButton, TextField } from "@mui/material"
import { makeStyles } from "@mui/styles"

import Nui from "../../util/Nui"
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
  "@keyframes pulse": {
    "0%": {
      transform: "scale(1)",
      opacity: 0.8,
    },
    "50%": {
      transform: "scale(1.05)",
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
  slider: {
    display: "block",
    position: "relative",
    top: "25%",
  },
  action: {
    height: 86,
    position: "relative",
    lineHeight: "100px",
  },
  actionBtn: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    height: "fit-content",
    width: "fit-content",
    color: "rgba(255, 255, 255, 0.7)",
    background: "rgba(255, 255, 255, 0.05)",
    transition: "all 0.2s ease",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.1)",
      color: theme.palette.primary.main,
      transform: "scale(1.1)",
    },
  },
  textField: {
    width: 40,
    "& input": {
      textAlign: "center",
      color: theme.palette.primary.main,
      fontWeight: 600,
      fontSize: 16,
    },
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "rgba(255, 255, 255, 0.1)",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: theme.palette.primary.main,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.primary.main,
    },
  },
  wrapper: {
    display: "grid",
    gridGap: 0,
    gridTemplateColumns: "20% 60% 20%",
    gridTemplateRows: "40px 40px",
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
    color: "rgba(255, 255, 255, 0.9)",
    letterSpacing: 0.5,
  },
  maxValue: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 14,
    fontWeight: 500,
  },
}))

const Ticker = (props) => {
  const classes = useStyles()
  const [value, setValue] = useState(props.data.options.current)

  const onLeft = () => {
    if ((props.data.options.min && value - 1 < props.data.options.min) || value - 1 < 0) {
      setValue(props.data.options.max)
    } else {
      setValue(value - 1)
    }
    Nui.send("FrontEndSound", { sound: "UPDOWN" })
    Nui.send("Selected", {
      id: props.data.id,
      data: { value: value === 0 ? props.data.options.max : value - 1 },
    })
  }

  const onRight = () => {
    if (value + 1 > props.data.options.max) {
      setValue(props.data.options.min ? props.data.options.min : 0)
    } else {
      setValue(value + 1)
    }

    Nui.send("FrontEndSound", { sound: "UPDOWN" })
    Nui.send("Selected", {
      id: props.data.id,
      data: {
        value: value === props.data.options.max ? props.data.options.min : value + 1,
      },
    })
  }

  const updateIndex = (event) => {
    if (!props.data.options.disabled) {
      let v = Number.parseInt(event.target.value, 10)

      if (isNaN(v)) {
        setValue(props.data.options.min)
        Nui.send("Selected", {
          id: props.data.id,
          data: { value: props.data.options.min },
        })
        return
      } else {
        if (event.target.value > props.data.options.max) {
          v = props.data.options.max
        } else if (event.target.value < props.data.options.min) {
          v = props.data.options.max
        }
        setValue(v)
        Nui.send("Selected", {
          id: props.data.id,
          data: { value: v },
        })
      }
    }
  }

  var cssClass = props.data.options.disabled ? `${classes.div} disabled` : classes.div
  var style = props.data.options.disabled ? { opacity: 0.5, pointerEvents: "none" } : {}

  return (
    <div className={cssClass} style={style}>
      <div className={classes.wrapper}>
        <div style={{ gridColumn: 2, gridRow: 1 }}>
          <span className={classes.label}>{props.data.label}</span>
        </div>
        <div className={classes.action} style={{ gridColumn: 1, gridRow: "1 / 2" }}>
          <IconButton className={classes.actionBtn} onClick={onLeft} size="small">
            <FontAwesomeIcon icon="chevron-left" />
          </IconButton>
        </div>
        <div style={{ gridColumn: 2, gridRow: 2 }}>
          <TextField
            variant="standard"
            value={value}
            className={classes.textField}
            onChange={updateIndex}
            disabled={props.data.options.disabled}
            type="number"
            inputProps={{
              min: props.data.options.min,
              max: props.data.options.max,
              step: 1,
            }}
          />{" "}
          <span className={classes.maxValue}>/ {props.data.options.max}</span>
        </div>
        <div className={classes.action} style={{ gridColumn: 3, gridRow: "1 / 2" }}>
          <IconButton className={classes.actionBtn} onClick={onRight} size="small">
            <FontAwesomeIcon icon="chevron-right" />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default Ticker
