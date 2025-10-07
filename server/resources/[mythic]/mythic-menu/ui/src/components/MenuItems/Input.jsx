/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { TextField } from "@mui/material"
import { makeStyles } from "@mui/styles"
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
  div: {
    background: "rgba(30, 30, 40, 0.4)",
    
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderLeft: "3px solid rgba(255, 255, 255, 0.1)",
    color: theme.palette.text.main,
    fontSize: 13,
    minHeight: 84,
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
  input: {
    width: "100%",
    "& .MuiInput-underline:before": {
      borderBottomColor: "rgba(255, 255, 255, 0.1)",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: theme.palette.primary.main,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.primary.main,
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255, 255, 255, 0.7)",
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: 0.5,
    },
    "& .MuiInputBase-input": {
      color: "#fff",
      fontSize: 14,
      padding: "8px 0",
      caretColor: theme.palette.primary.main,
    },
  },
}))

export default ({ data }) => {
  const classes = useStyles()
  const [value, setValue] = useState(data.options.current == null ? "" : data.options.current)

  const onChange = (event) => {
    setValue(event.target.value)
    Nui.send("Selected", {
      id: data.id,
      data: { value: event.target.value },
    })
  }

  const cssClass = data.options.disabled ? `${classes.div} disabled` : classes.div
  const style = data.options.disabled ? { opacity: 0.5, pointerEvents: "none" } : {}

  return (
    <div className={cssClass} style={style}>
      <TextField
        variant="standard"
        label={data.label}
        disabled={data.options.disabled}
        value={value}
        onChange={onChange}
        className={classes.input}
        type="text"
        multiline
        inputProps={{
          maxLength: data.options.max != null ? data.options.max : 1024,
        }}
      />
    </div>
  )
}
