import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Button as MButton, Alert } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Draggable from "react-draggable"

import Nui from "../../util/Nui"

import {
  AdvancedButton,
  Button,
  Checkbox,
  ColorList,
  ColorPicker,
  Slider,
  SubMenu,
  SubMenuBack,
  Ticker,
  Input,
  Number,
  Select,
  Text,
} from "../MenuItems"

const useStyles = makeStyles((theme) => ({
  "@global": {
    "@keyframes pulse": {
      "0%": {
        opacity: 0.6,
      },
      "50%": {
        opacity: 1,
      },
      "100%": {
        opacity: 0.6,
      },
    },
    "@keyframes float": {
      "0%": {
        transform: "translateY(0px)",
      },
      "50%": {
        transform: "translateY(-10px)",
      },
      "100%": {
        transform: "translateY(0px)",
      },    
    },
  },
  wrapper: {
    background: `rgba(15, 15, 20, 0.85)`,
    border: `1px solid rgba(255, 255, 255, 0.1)`,
    //borderLeft: `3px solid ${theme.palette.primary.main}`,
    maxHeight: 800,
    width: 500,
    position: "absolute",
    margin: "auto",
    textAlign: "center",
    fontSize: 30,
    color: theme.palette.text.main,
    zIndex: 1000,
    padding: "5px 0 20px 0",
    overflow: "hidden",
    borderRadius: "16px 16px 16px 16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 0, 0, 0.3)",
    animation: "$glow 4s infinite ease-in-out",
  },
  menuHeader: {
    color: theme.palette.text.main,
    position: "relative",
    padding: "20px 20px 15px 20px",
    width: "100%",
    marginBottom: 15,
    fontSize: 18,
    letterSpacing: 2,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    maxWidth: "95%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    userSelect: "none",
    textAlign: "left",
    fontWeight: 600,
    borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
    "&:hover": {
      cursor: "move",
    },
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: -1,
      left: 20,
      width: "60px",
      height: "2px",
      background: `linear-gradient(90deg, ${theme.palette.primary.main}, transparent)`,
    },
  },
  menuButton: {
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 18,
    right: 15,
    color: "rgba(255, 255, 255, 0.7)",
    padding: 5,
    background: `rgba(255, 255, 255, 0.05)`,
    minWidth: 32,
    height: 32,
    borderRadius: "50%",
    boxShadow: "none",
    transition: "all 0.3s ease",
    zIndex: 10,
    "&:hover": {
      color: "#fff",
      background: theme.palette.primary.main,
    },
  },
  buttons: {
    overflowY: "auto",
    overflowX: "hidden",
    maxHeight: 695,
    display: "block",
    padding: "0 20px",
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "10px",
      margin: "10px 0",
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.primary.main,
      borderRadius: "10px",
    },
  },
  branding: {
    position: "absolute",
    opacity: 0.03,
    top: -100,
    right: 0,
    left: 0,
    margin: "auto",
    width: "100%",
    maxWidth: 300,
    zIndex: -1,
    userSelect: "none",
    filter: "drop-shadow(0 0 20px rgba(255,255,255,0.5))",
    animation: "$float 6s infinite ease-in-out",
  },
  alert: {
    borderRadius: 8,
    background: "rgba(211, 47, 47, 0.2)",
    border: "1px solid rgba(211, 47, 47, 0.3)",
    color: "#fff",
    
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  },
}))

export default (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const menu = useSelector((state) => state.menu.menu)
  const hidden = useSelector((state) => state.app.hidden)

  const [pos, setPos] = useState({ x: 25, y: 25 })

  useEffect(() => {
    setPos({ x: 25, y: 25 })
  }, [hidden])

  const onChange = (e, p) => {
    e.preventDefault()
    e.stopPropagation()
    setPos({ x: p.x, y: p.y })
  }

  const [elements, setElements] = useState([])
  useEffect(() => {
    setElements(
      menu.items.map((item, i) => {
        switch (item.type.toUpperCase()) {
          case "ADVANCED":
            return <AdvancedButton key={`${menu.id}-${i}`} mId={menu.id} id={i} data={item} />
          case "CHECKBOX":
            return <Checkbox key={`${menu.id}-${i}`} mId={menu.id} id={i} data={item} />
          case "SLIDER":
            return <Slider key={`${menu.id}-${i}`} mId={menu.id} id={i} data={item} />
          case "TICKER":
            return <Ticker key={`${menu.id}-${i}`} mId={menu.id} id={i} data={item} />
          case "COLORPICKER":
            return <ColorPicker key={`${menu.id}-${i}`} mId={menu.id} id={i} data={item} />
          case "COLORLIST":
            return <ColorList key={`${menu.id}-${i}`} mId={menu.id} id={i} data={item} />
          case "INPUT":
            return <Input key={`${menu.id}-${i}`} mId={menu.id} id={i} data={item} />
          case "NUMBER":
            return <Number key={`${menu.id}-${i}`} mId={menu.id} id={i} data={item} />
          case "SELECT":
            return <Select key={`${menu.id}-${i}`} mId={menu.id} id={i} data={item} />
          case "TEXT":
            return <Text key={`${menu.id}-${i}`} mId={menu.id} id={i} data={item} />
          case "SUBMENU":
            return <SubMenu key={`${menu.id}-${i}`} id={i} mId={menu.id} data={item} />
          case "GOBACK":
            return <SubMenuBack key={`${menu.id}-${i}`} id={i} mId={menu.id} data={item} />
          default:
            return <Button key={`${menu.id}-${i}`} id={i} mId={menu.id} data={item} />
        }
      }),
    )
  }, [menu])

  const onClick = () => {
    Nui.send("Close")
    dispatch({
      type: "CLEAR_MENU",
    })
  }

  return (
    <Draggable handle=".drag-handle" bounds="#app" defaultPosition={{ x: 25, y: 25 }} position={pos} onDrag={onChange}>
      <div className={classes.wrapper} hidden={hidden}>
        <MButton className={classes.closeButton} variant="contained" color="primary" onClick={onClick}>
          <FontAwesomeIcon icon="x" />
        </MButton>

        <div className={`${classes.menuHeader} drag-handle`}>{Boolean(menu.label) ? menu.label : "Mythic Frawework"}</div>
        <div className={classes.buttons}>
          {elements.length > 0 ? (
            elements
          ) : (
            <Alert variant="filled" color="error" className={classes.alert}>
              Menu Has No Content
            </Alert>
          )}
        </div>
      </div>
    </Draggable>
  )
}
