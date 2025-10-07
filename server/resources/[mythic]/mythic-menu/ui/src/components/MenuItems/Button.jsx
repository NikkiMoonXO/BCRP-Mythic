/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from "@mui/material"
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
  "@keyframes pulse": {
    "0%": {
      boxShadow: "0 0 0 0 rgba(255, 255, 255, 0)",
    },
    "70%": {
      boxShadow: "0 0 0 5px rgba(255, 255, 255, 0)",
    },
    "100%": {
      boxShadow: "0 0 0 0 rgba(255, 255, 255, 0)",
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
      transform: "translateY(-2px)",
      boxShadow: "0 6px 25px rgba(0, 0, 0, 0.15)",
      "&:before": {
        opacity: 1,
        transform: "translateX(0)",
      },
      "&:after": {
        opacity: 1,
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
    "&:after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
      opacity: 0,
      transition: "opacity 0.5s ease",
      zIndex: -1,
    },
  },
  error: {
    background: "rgba(30, 30, 40, 0.4)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderLeft: `3px solid ${theme.palette.error.main}`,
    color: theme.palette.text.main,
    fontSize: 14,
    fontWeight: 500,
    height: 48,
    width: "100%",
    textAlign: "center",
    userSelect: "none",
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    marginBottom: 16,
    borderRadius: "12px 12px 12px 12px",
    boxShadow: `0 4px 20px rgba(0, 0, 0, 0.1), 0 0 0 1px ${theme.palette.error.main}20`,
    position: "relative",
    overflow: "hidden",
    animation: "$fadeIn 0.3s ease-out",
    "&:hover:not(.disabled)": {
      background: "rgba(40, 40, 50, 0.6)",
      transform: "translateY(-2px)",
      boxShadow: `0 6px 25px rgba(0, 0, 0, 0.15), 0 0 0 1px ${theme.palette.error.main}30`,
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
      background: `linear-gradient(90deg, ${theme.palette.error.main}10 0%, transparent 100%)`,
      opacity: 0,
      transform: "translateX(-100%)",
      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      zIndex: -1,
    },
  },
  success: {
    background: "rgba(30, 30, 40, 0.4)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderLeft: `3px solid ${theme.palette.success.main}`,
    color: theme.palette.text.main,
    fontSize: 14,
    fontWeight: 500,
    height: 48,
    width: "100%",
    textAlign: "center",
    userSelect: "none",
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    marginBottom: 16,
    borderRadius: "12px 12px 12px 12px",
    boxShadow: `0 4px 20px rgba(0, 0, 0, 0.1), 0 0 0 1px ${theme.palette.success.main}20`,
    position: "relative",
    overflow: "hidden",
    animation: "$fadeIn 0.3s ease-out",
    "&:hover:not(.disabled)": {
      background: "rgba(40, 40, 50, 0.6)",
      transform: "translateY(-2px)",
      boxShadow: `0 6px 25px rgba(0, 0, 0, 0.15), 0 0 0 1px ${theme.palette.success.main}30`,
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
      background: `linear-gradient(90deg, ${theme.palette.success.main}10 0%, transparent 100%)`,
      opacity: 0,
      transform: "translateX(-100%)",
      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      zIndex: -1,
    },
  },
}))

export default ({ data }) => {
  const classes = useStyles()

  const onClick = () => {
    if (!data.options.disabled) {
      Nui.send("FrontEndSound", { sound: "SELECT" })
      Nui.send("Selected", {
        id: data.id,
      })
    }
  }

  const cssClass = data.options.disabled
    ? `${data.options.success ? classes.success : classes.div} disabled`
    : data.options.success
      ? classes.success
      : data.options.error
        ? classes.error
        : classes.div
  const style = data.options.disabled ? { opacity: 0.5, pointerEvents: "none" } : {}

  return (
    <Button className={cssClass} style={style} onClick={onClick} disableRipple>
      <span style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>{data.label}</span>
    </Button>
  )
}

