/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from "@mui/styles"
import { Sanitize } from "../../util/Parser"

const useStyles = makeStyles((theme) => ({
  "@import":
    'url("https://fonts.googleapis.com/css2?family=Inconsolata&family=Inter:wght@400;500;600;700&display=swap")',
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
  defaultStyle: {
    textAlign: "left",
    fontSize: 14,
    fontWeight: "normal",
    fontFamily: "'Inter', sans-serif",
    lineHeight: 1.6,
    color: "rgba(255, 255, 255, 0.9)",
    letterSpacing: 0.3,
    animation: "$fadeIn 0.3s ease-out",
    marginBottom: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: 600,
    padding: "15px 0",
    borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
    marginBottom: 15,
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: -1,
      left: 0,
      width: "60px",
      height: "2px",
      background: `linear-gradient(90deg, ${theme.palette.primary.main}, transparent)`,
    },
  },
  textSmall: {
    fontSize: 10,
    opacity: 0.8,
  },
  textMedium: {
    fontSize: 14,
  },
  textLarge: {
    fontSize: 18,
    fontWeight: 500,
  },
  textExtraLarge: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: 0.5,
  },
  code: {
    fontFamily: ["Inconsolata", "monospace"],
    background: "rgba(0, 0, 0, 0.2)",
    padding: "3px 8px",
    borderRadius: 4,
    fontSize: "0.9em",
    border: "1px solid rgba(255, 255, 255, 0.05)",
  },
  left: {
    textAlign: "left",
  },
  center: {
    textAlign: "center",
  },
  right: {
    textAlign: "right",
  },
  bold: {
    fontWeight: 600,
  },
  pad: {
    padding: 15,
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
    border: "1px solid rgba(255, 255, 255, 0.05)",
  },
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  colorError: {
    color: theme.palette.error.main,
  },
  colorWarning: {
    color: theme.palette.warning.main,
  },
  colorSuccess: {
    color: theme.palette.success.light,
  },
}))

export default (props) => {
  const classes = useStyles()

  let style = ""

  if (props.data.options.classes != null && props.data.options.classes.length > 0)
    props.data.options.classes.map((css) => {
      style += ` ${classes[css]}`
    })

  return <div className={`${classes.defaultStyle} ${style}`}>{Sanitize(props.data.label)}</div>
}
