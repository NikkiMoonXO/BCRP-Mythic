import React, { memo } from "react"
import { AppBar } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useMyApps } from "../../hooks"

const DEFAULT_HEADER_COLOR = "#1f2937"

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100%",
    background: theme.palette.secondary.main,
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  header: {
    fontSize: 20,
    lineHeight: "55px",
    height: 55,
    padding: "0 8px",
    flexShrink: 0,
  },
  headerInner: {
    display: "flex",
  },
  headerAction: {
    textAlign: "right",
    display: "flex",
    "&:hover": {
      color: theme.palette.text.main,
      transition: "color ease-in 0.15s",
    },

    "& .MuiIconButton-root": {
      width: 40,
      height: 40,
      margin: "auto",
      position: "relative",
    },
  },
  body: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    position: "relative",
    "&::-webkit-scrollbar": {
      width: 6,
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#ffffff52",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: theme.palette.primary.main,
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
  },
  appTitle: {
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    flexGrow: 1,
  },
}))

export default memo(
  ({
    appId,
    children,
    actions = null,
    actionShow = true,
    colorOverride = false,
    titleOverride = false,
    useAppColor = false,
  }) => {
    const classes = useStyles()
    const apps = useMyApps()

    if (!Boolean(appId)) return null

    const app = apps[appId]

    const headerColor = Boolean(colorOverride)
      ? colorOverride
      : useAppColor && Boolean(app.color)
        ? app.color
        : DEFAULT_HEADER_COLOR

    return (
      <div className={classes.wrapper}>
        <AppBar position="static" className={classes.header} elevation={0} style={{ background: headerColor }}>
          <div className={classes.headerInner}>
            <div className={classes.appTitle}>{Boolean(titleOverride) ? titleOverride : app.storeLabel}</div>
            {actionShow && Boolean(actions) && <div className={classes.headerAction}>{actions}</div>}
          </div>
        </AppBar>
        <div className={classes.body}>{children}</div>
      </div>
    )
  },
)
