/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"
import { makeStyles, useTheme } from "@mui/styles"
import { ChromePicker } from "react-color"
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
  div: {
    width: "100%",
    height: 82,
    fontSize: 14,
    fontWeight: 500,
    textAlign: "center",
    textDecoration: "none",
    textShadow: "none",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 20px",
    userSelect: "none",
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    background: "rgba(30, 30, 40, 0.4)",
    
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderLeft: "3px solid rgba(255, 255, 255, 0.1)",
    color: theme.palette.text.main,
    marginBottom: 16,
    borderRadius: "12px 12px 12px 12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    position: "relative",
    overflow: "hidden",
    animation: "$fadeIn 0.3s ease-out",
    "&:hover:not(.disabled)": {
      borderLeft: `3px solid ${theme.palette.primary.main}`,
      transform: "translateY(-2px)",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
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
  picker: {
    background: `transparent !important`,
    boxShadow: "none !important",
    color: theme.palette.text.dark,
    borderRadius: "8px !important",
    "& .chrome-picker": {
      background: "rgba(30, 30, 40, 0.8) !important",
      boxShadow: "none !important",
      border: "1px solid rgba(255, 255, 255, 0.1) !important",
      borderRadius: "12px !important",
      "& input": {
        background: "rgba(0, 0, 0, 0.2) !important",
        boxShadow: "none !important",
        border: "1px solid rgba(255, 255, 255, 0.1) !important",
        color: "#fff !important",
        borderRadius: "6px !important",
      },
    },
  },
  saveButton: {
    background: `linear-gradient(45deg, ${theme.palette.success.main}, ${theme.palette.success.light})`,
    color: "#fff",
    padding: "8px 20px",
    borderRadius: 8,
    fontWeight: 500,
    textTransform: "none",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
    },
  },
}))

export default ({ data }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [showPicker, setShowPicker] = useState(false)
  const [currColor, setCurrColor] = useState(data.options.current)
  const [tColor, setTColor] = useState(currColor)

  const onClick = () => {
    if (!data.options.disabled) {
      setShowPicker(!showPicker)
    }
  }

  const onChange = (color, event) => {
    if (!data.options.disabled) {
      setTColor(color.rgb)
    }
  }

  const onSave = () => {
    if (!data.options.disabled) {
      setCurrColor(tColor)
      Nui.send("Selected", {
        id: data.id,
        data: { color: tColor },
      })
      onClick()
    }
  }

  const cssClass = data.options.disabled ? `${classes.div} disabled` : classes.div
  const style = data.options.disabled
    ? {
        opacity: 0.5,
        pointerEvents: "none",
        background: `rgb(${currColor.r}, ${currColor.g}, ${currColor.b}`,
      }
    : { background: `rgb(${currColor.r}, ${currColor.g}, ${currColor.b}` }

  return (
    <div>
      <Button className={cssClass} style={style} onClick={onClick} disableRipple>
        <span style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)", fontWeight: 600, letterSpacing: 0.5 }}>
          Select Color : rgb({currColor.r}, {currColor.g}, {currColor.b})
        </span>
      </Button>
      <Dialog
        fullWidth
        onClose={onClick}
        open={showPicker}
        PaperProps={{
          style: {
            background: "rgba(20, 20, 30, 0.95)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: 16,
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: 600,
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <FontAwesomeIcon icon="palette" style={{ marginRight: 10, color: theme.palette.primary.main }} />
          Select Color
          <FontAwesomeIcon
            icon="times"
            onClick={onClick}
            style={{ position: "absolute", right: 16, top: 16, cursor: "pointer", opacity: 0.5 }}
          />
        </DialogTitle>
        <DialogContent style={{ padding: 20 }}>
          <ChromePicker color={tColor} disableAlpha onChange={onChange} width="100%" className={classes.picker} />
        </DialogContent>
        <DialogActions style={{ padding: "10px 20px 20px", justifyContent: "center" }}>
          <Button onClick={onSave} className={classes.saveButton}>
            <FontAwesomeIcon icon="save" style={{ marginRight: 8 }} />
            Save Color
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
