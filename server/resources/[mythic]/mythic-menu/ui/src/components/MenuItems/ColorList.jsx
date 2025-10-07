import React, { useState } from 'react';
import { Grid, Button, Dialog, DialogTitle, DialogContent } from "@mui/material"
import { makeStyles, useTheme } from "@mui/styles"
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
  "@keyframes colorPulse": {
    "0%": {
      transform: "scale(1)",
      boxShadow: "0 0 0 rgba(255, 255, 255, 0.4)",
    },
    "50%": {
      transform: "scale(1.05)",
      boxShadow: "0 0 10px rgba(255, 255, 255, 0.6)",
    },
    "100%": {
      transform: "scale(1)",
      boxShadow: "0 0 0 rgba(255, 255, 255, 0.4)",
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
      "&:before": {
        opacity: 1,
        transform: "translateX(0)",
      },
      "& .colorPreview": {
        animation: "$colorPulse 1.5s infinite ease-in-out",
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
  preview: {
    width: 30,
    height: 30,
    border: "2px solid rgba(255, 255, 255, 0.2)",
    transition: "all 0.3s ease",
    borderRadius: "50%",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  },
  colorButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    height: 50,
    fontSize: 14,
    fontWeight: 500,
    padding: "0 15px",
    textDecoration: "none",
    whiteSpace: "nowrap",
    borderRadius: 10,
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    userSelect: "none",
    marginBottom: 8,
    border: "1px solid rgba(255, 255, 255, 0.05)",
    background: "rgba(30, 30, 40, 0.4)",
    color: "#fff",
    "&:hover": {
      background: "rgba(40, 40, 50, 0.6)",
      transform: "translateY(-2px)",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
      cursor: "pointer",
      "& .colorPreview": {
        transform: "scale(1.1)",
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.3)",
      },
    },
  },
  colorGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 10,
  },
  dialogTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 600,
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    "& .closeButton": {
      position: "absolute",
      right: 8,
      top: 8,
      color: "rgba(255, 255, 255, 0.5)",
      "&:hover": {
        color: "#fff",
      },
    },
  },
  dialogContent: {
    padding: "20px !important",
  },
}))

export default ({ data }) => {
  const classes = useStyles()
  const [showList, setShowList] = useState(false)
  const [selectedColor, setSelectedColor] = useState(data.options.colors[data.options.current])
  const theme = useTheme()

  const onClick = () => {
    if (!data.options.disabled) {
      setShowList(!showList)
    }
  }

  const changeColor = (index) => {
    setSelectedColor(data.options.colors[index])
    setShowList(!showList)
    Nui.send("Selected", {
      id: data.id,
      data: { color: data.options.colors[index] },
    })
  }

  const cssClass = data.options.disabled ? `${classes.div} disabled` : `${classes.div}${showList ? " open" : ""}`
  const style = data.options.disabled ? { opacity: 0.5, pointerEvents: "none" } : {}

  return (
    <div>
      <Button className={cssClass} style={style} onClick={onClick} disableRipple>
        <Grid
          container
          style={{
            alignItems: "center",
            height: "100%",
          }}
        >
          <Grid item xs={2}>
            <div
              className={`colorPreview ${classes.preview}`}
              style={{
                background:
                  selectedColor.rgb != null
                    ? `rgb(${selectedColor.rgb.r}, ${selectedColor.rgb.g}, ${selectedColor.rgb.b})`
                    : selectedColor.hex,
              }}
            />
          </Grid>
          <Grid item xs={9}>
            <span style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>{selectedColor.label}</span>
          </Grid>
          <Grid item xs={1}>
            <FontAwesomeIcon icon="palette" style={{ opacity: 0.5 }} />
          </Grid>
        </Grid>
      </Button>
      <Dialog
        fullWidth
        onClose={onClick}
        open={showList}
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
        <DialogTitle className={classes.dialogTitle}>
          <FontAwesomeIcon icon="palette" style={{ marginRight: 10, color: theme.palette.primary.main }} />
          Select Color
          <FontAwesomeIcon icon="times" className="closeButton" onClick={onClick} style={{ cursor: "pointer" }} />
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <div className={classes.colorGrid}>
            {data.options.colors.map((color, i) => (
              <div
                className={classes.colorButton}
                key={i}
                onClick={() => {
                  changeColor(i)
                }}
              >
                <div
                  className={`colorPreview ${classes.preview}`}
                  style={{
                    background: color.rgb != null ? `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})` : color.hex,
                    marginRight: 15,
                  }}
                />
                <span style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>{color.label}</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
