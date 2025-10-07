import React, { useEffect } from "react"
import { Avatar, Badge } from "@mui/material"
import { styled } from "@mui/material/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const AppButtonContainer = styled("div")(({ theme, isContext, docked, isEdit }) => ({
  width: docked ? "25%" : "100%",
  height: docked ? "fit-content" : 100,
  display: "inline-block",
  textAlign: "center",
  padding: docked ? "2% 0px" : "10% 0px",
  borderRadius: 12,
  position: "relative",
  userSelect: "none",
  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
  background: isContext ? `${theme.palette.primary.main}40` : "transparent",

  "&:hover": {
    background: `${theme.palette.primary.main}40`,
    cursor: "pointer",
    transform: "translateY(-2px)",
  },

  "&.edit": {
    animation: "wiggle linear 0.5s infinite",
  },

  "&.dragging": {
    background: "red",
  },

  "@keyframes wiggle": {
    "0%": {
      transform: "rotate(-1.5deg)",
      animationTimingFunction: "ease-in",
    },
    "50%": {
      transform: "rotate(2deg)",
      animationTimingFunction: "ease-out",
    },
  },
}))

const AppIconWrapper = styled(Avatar)(({ theme, color }) => ({
  fontSize: 20,
  width: 48,
  height: 48,
  margin: "auto",
  color: "#fff",
  borderRadius: 14,
  background: `linear-gradient(135deg, ${color} 0%, ${adjustColor(color, -30)} 100%)`,
  boxShadow: `0 4px 10px ${adjustColor(color, -40)}80, 0 0 15px ${adjustColor(color, -20)}40`,
  border: `1px solid ${adjustColor(color, 30)}`,
  transition: "all 0.3s ease",

  "& svg": {
    filter: "drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2))",
    fontSize: 22,
    transition: "transform 0.3s ease",
  },

  "&:hover svg": {
    transform: "scale(1.1)",
  },
}))

const AppLabel = styled("div")(({ theme }) => ({
  fontSize: 12,
  overflow: "hidden",
  textOverflow: "ellipsis",
  fontWeight: 600,
  marginTop: 10,
  pointerEvents: "none",
  color: "#fff",
  textShadow: "0px 1px 3px rgba(0, 0, 0, 0.7)",
  transition: "all 0.3s ease",
  padding: "0 5px",

  "&:hover": {
    color: "#fff",
  },
}))

const NotificationBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 4,
    top: 40,
    filter: "drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.5))",
  },
}))

const NotificationCount = styled(Avatar)(({ theme, color }) => ({
  width: 20,
  height: 20,
  fontSize: 12,
  fontWeight: "bold",
  lineHeight: "20px",
  background: "linear-gradient(135deg, #ff0000 0%, #cc0000 100%)",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
  border: `2px solid ${color}`,
}))

function adjustColor(color, amount) {
  if (color.startsWith("#")) {
    const hex = color.slice(1)

    let r = Number.parseInt(hex.slice(0, 2), 16)
    let g = Number.parseInt(hex.slice(2, 4), 16)
    let b = Number.parseInt(hex.slice(4, 6), 16)

    r = Math.max(0, Math.min(255, r + amount))
    g = Math.max(0, Math.min(255, g + amount))
    b = Math.max(0, Math.min(255, b + amount))

    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
  }

  if (color.startsWith("rgb")) {
    const rgba = color.match(/\d+/g)
    if (rgba && rgba.length >= 3) {
      let r = Number.parseInt(rgba[0])
      let g = Number.parseInt(rgba[1])
      let b = Number.parseInt(rgba[2])

      r = Math.max(0, Math.min(255, r + amount))
      g = Math.max(0, Math.min(255, g + amount))
      b = Math.max(0, Math.min(255, b + amount))

      return `rgb(${r}, ${g}, ${b})`
    }
  }

  return color
}

export default function AppButton({
  appId,
  app,
  isEdit,
  onClick,
  onRightClick,
  onStartEdit,
  isContext,
  onDragState = null,
  docked = false,
}) {
  let clickHoldTimer = null

  useEffect(() => {
    return () => {
      clearTimeout(clickHoldTimer)
    }
  }, [])

  const clickHoldStart = (e) => {
    if (e.button === 0) {
      if (Boolean(onDragState)) onDragState(true)
      clickHoldTimer = setTimeout(() => {
        onStartEdit(true)
      }, 1000)
    }
  }

  const clickHoldEnd = (e) => {
    if (Boolean(onDragState)) onDragState(false)
    clearTimeout(clickHoldTimer)
  }

  return (
    <AppButtonContainer
      isContext={isContext}
      docked={docked}
      isEdit={isEdit}
      className={`grid-item ${isEdit ? "edit" : ""}`}
      title={app.label}
      onClick={() => onClick(appId)}
      onContextMenu={(e) => onRightClick(e, appId, docked)}
      onMouseDown={clickHoldStart}
      onMouseUp={clickHoldEnd}
    >
      {app.unread > 0 ? (
        <NotificationBadge badgeContent={<NotificationCount color={app.color}>{app.unread}</NotificationCount>}>
          <AppIconWrapper color={app.color} variant="rounded">
            <FontAwesomeIcon icon={app.icon} />
          </AppIconWrapper>
        </NotificationBadge>
      ) : (
        <AppIconWrapper color={app.color} variant="rounded">
          <FontAwesomeIcon icon={app.icon} />
        </AppIconWrapper>
      )}

      {!docked && <AppLabel>{app.label}</AppLabel>}
    </AppButtonContainer>
  )
}
