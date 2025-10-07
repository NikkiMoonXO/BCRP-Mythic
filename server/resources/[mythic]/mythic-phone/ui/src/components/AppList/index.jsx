import React, { useEffect, useState } from "react"
import { connect, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Menu, MenuItem, TextField, Slide, Avatar, Badge } from "@mui/material"
import { styled } from "@mui/material/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { uninstall } from "../../Apps/store/action"
import { useAlert, useAppView, useAppButton, useMyApps } from "../../hooks"

const Wrapper = styled("div")({
  height: "100%",
})

const SearchContainer = styled("div")({
  height: "12.5%",
  padding: 25,
})

const SearchInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  height: "100%",
  "& .MuiInputBase-root": {
    color: "#fff",
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottomColor: "rgba(255, 255, 255, 0.5)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.primary.main,
  },
}))

const AppGrid = styled("div")(({ theme }) => ({
  display: "flex",
  height: "87.5%",
  padding: "0 10px",
  flexWrap: "wrap",
  justifyContent: "start",
  alignContent: "flex-start",
  overflowX: "hidden",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: 6,
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#ffffff52",
    borderRadius: 3,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: theme.palette.primary.main,
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
}))

const AppButtonContainer = styled("div")(({ theme, isContext }) => ({
  width: "25%",
  display: "inline-block",
  textAlign: "center",
  height: "fit-content",
  padding: "15px 0",
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
}))

const AppIconWrapper = styled(Avatar)(({ color }) => ({
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

const AppLabel = styled("div")({
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
})

const NotificationBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    right: 4,
    top: 40, // Adjusted for smaller icon
    filter: "drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.5))",
  },
})

const NotificationCount = styled(Avatar)(({ color }) => ({
  width: 20,
  height: 20,
  fontSize: 12,
  fontWeight: "bold",
  lineHeight: "20px",
  color: "#fff",
  background: "linear-gradient(135deg, #ff0000 0%, #cc0000 100%)",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
  border: `2px solid ${color}`,
}))

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#1f2937",
    borderRadius: 8,
    border: `1px solid ${theme.palette.primary.main}20`,
  },
  "& .MuiMenuItem-root": {
    color: "#fff",
    fontSize: 14,
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main}15`,
    },
    "&.Mui-disabled": {
      color: "rgba(255, 255, 255, 0.5)",
      fontWeight: 600,
    },
  },
}))

function adjustColor(color, amount) {
  // If color is in hex format
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

      // Adjust brightness
      r = Math.max(0, Math.min(255, r + amount))
      g = Math.max(0, Math.min(255, g + amount))
      b = Math.max(0, Math.min(255, b + amount))

      return `rgb(${r}, ${g}, ${b})`
    }
  }

  return color
}

function AppList(props) {
  const { uninstall } = props
  const openedApp = useAppView()
  const showAlert = useAlert()
  const appButton = useAppButton()
  const history = useNavigate()
  const apps = useMyApps()
  const installed = useSelector((state) => state.data.data.player?.Apps?.installed)
  const homeApps = useSelector((state) => state.data.data.player?.Apps?.home)

  const [open, setOpen] = useState(false)
  useEffect(() => {
    setOpen(true)
    return () => {
      setOpen(false)
    }
  }, [])

  const [searchVal, setSearchVal] = useState("")
  const [filteredApps, setFilteredApps] = useState(Object.keys(apps).length > 0 ? installed : [])
  const [contextApp, setContextApp] = useState(null)
  const [offset, setOffset] = useState({
    left: 110,
    top: 0,
  })

  useEffect(() => {
    if (Object.keys(apps).length > 0) {
      setFilteredApps([
        ...new Set(
          installed.filter((app) => {
            if (apps[app] && apps[app].label.toUpperCase().includes(searchVal.toUpperCase())) {
              return app
            }
            return null
          }),
        ),
      ])
    }
  }, [searchVal, apps, installed])

  const onClick = (app) => {
    openedApp(app)
    history(`/apps/${app}`)
  }

  const openApp = () => {
    openedApp(contextApp)
    history(`/apps/${contextApp}`)
  }

  const onRightClick = (e, app) => {
    e.preventDefault()
    setOffset({ left: e.clientX - 2, top: e.clientY - 4 })
    if (app != null) setContextApp(app)
  }

  const closeContext = (e) => {
    if (e != null) e.preventDefault()
    setContextApp(null)
  }

  const addToHome = async () => {
    await appButton("add", "Home", contextApp)
    showAlert(`${apps[contextApp].label} Added To Home Screen`)
    closeContext()
  }

  const uninstallApp = () => {
    uninstall(contextApp)
    closeContext()
  }

  const onSearchChange = (e) => {
    setSearchVal(e.target.value)
  }

  return (
    <Slide in={open} direction="up">
      <Wrapper>
        <SearchContainer>
          <SearchInput variant="standard" label="Search For App" value={searchVal} onChange={onSearchChange} />
        </SearchContainer>
        <AppGrid>
          {filteredApps
            .sort((a, b) => {
              if (apps[a]?.label > apps[b]?.label) return 1
              else if (apps[a]?.label < apps[b]?.label) return -1
              else return 0
            })
            .map((app, i) => {
              const data = apps[app]
              if (data) {
                return (
                  <AppButtonContainer
                    key={i}
                    isContext={contextApp === app}
                    title={data.label}
                    onClick={() => onClick(app)}
                    onContextMenu={(e) => onRightClick(e, app)}
                  >
                    {data.unread > 0 ? (
                      <NotificationBadge
                        badgeContent={<NotificationCount color={data.color}>{data.unread}</NotificationCount>}
                      >
                        <AppIconWrapper color={data.color} variant="rounded">
                          <FontAwesomeIcon icon={data.icon} />
                        </AppIconWrapper>
                      </NotificationBadge>
                    ) : (
                      <AppIconWrapper color={data.color} variant="rounded">
                        <FontAwesomeIcon icon={data.icon} />
                      </AppIconWrapper>
                    )}
                    <AppLabel>{data.label}</AppLabel>
                  </AppButtonContainer>
                )
              } else return null
            })}
        </AppGrid>
        {contextApp != null ? (
          <StyledMenu
            keepMounted
            onContextMenu={closeContext}
            open={!!contextApp}
            onClose={closeContext}
            anchorReference="anchorPosition"
            anchorPosition={offset}
          >
            <MenuItem disabled>{apps[contextApp].label}</MenuItem>
            <MenuItem onClick={addToHome} disabled={homeApps.filter((app) => app === contextApp).length > 0}>
              Add To Home
            </MenuItem>
            <MenuItem onClick={openApp}>Open {apps[contextApp].label}</MenuItem>
            {apps[contextApp].canUninstall ? (
              <MenuItem onClick={uninstallApp}>Uninstall {apps[contextApp].label}</MenuItem>
            ) : null}
          </StyledMenu>
        ) : null}
      </Wrapper>
    </Slide>
  )
}

export default connect(null, {
  uninstall,
})(AppList)

