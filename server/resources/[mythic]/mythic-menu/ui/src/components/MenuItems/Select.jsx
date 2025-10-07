import React from 'react';
import { TextField, MenuItem } from "@mui/material"
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
  item: {
    width: "100%",
    textAlign: "left",
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
      caretColor: theme.palette.primary.main,
    },
    "& .MuiSelect-icon": {
      color: theme.palette.primary.main,
    },
  },
  menuPaper: {
    background: "rgba(20, 20, 30, 0.95) !important",
    border: "1px solid rgba(255, 255, 255, 0.05) !important",
    borderRadius: "12px !important",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3) !important",
    padding: "5px !important",
    "& .MuiMenuItem-root": {
      color: "#fff !important",
      fontSize: "14px !important",
      borderRadius: "8px !important",
      margin: "2px 0 !important",
      transition: "all 0.2s !important",
      "&:hover": {
        background: `rgba(255, 255, 255, 0.1) !important`,
      },
      "&.Mui-selected": {
        background: `${theme.palette.primary.main}20 !important`,
        "&:hover": {
          background: `${theme.palette.primary.main}30 !important`,
        },
      },
    },
  },
}))

export default ({ data }) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(data.options.current)

  const handleChange = (event) => {
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
        className={classes.item}
        select
        disabled={data.options.disabled}
        label={data.label}
        value={value}
        onChange={handleChange}
        SelectProps={{
          MenuProps: {
            classes: {
              paper: classes.menuPaper,
            },
          },
        }}
      >
        {data.options.list.map((option) => (
          <MenuItem key={option.value} value={option.value} selected={false}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  )
}
