import Link from "next/link"

import React, { useContext, useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
import PersonIcon from "@material-ui/icons/Person"
import AssignmentIcon from "@material-ui/icons/Assignment"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
// import AdminMenu from "./Menu"

import { loadUser } from "../redux/userActions"
import { signOut, useSession, signIn } from "next-auth/client"
import {
  AppBar,
  Toolbar,
  IconButton,
  div,
  Typography,
  Button,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
// import { Alert } from "@material-ui/lab"
import { useSelector, useDispatch } from "react-redux"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const Header = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [session] = useSession()

  // console.log(session)

  const { user, loading } = useSelector((state) => state.profile)

  // console.log(user)

  if (session) {
    const { user } = session
    console.log(user)
  }

  useEffect(() => {
    if (!user) {
      dispatch(loadUser())
    }
  }, [])

  const handleSignout = (e) => {
    e.preventDefault()
    signOut()
  }

  return (
    <div>
      <div component="nav">
        <AppBar position="static" style={{ color: "primary" }}>
          <Toolbar>
            <IconButton aria-label="menu">
              <Link href="/">
                {<img src="/v3.png" height="40px" alt="logo" />}
              </Link>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              OpenFreeUni
            </Typography>

            <>
              {user ? (
                <>
                  <div style={{ marginTop: "0.25rem" }}>
                    <Link style={{ color: "white" }} href="/profile/profile">
                      <Button color="inherit" style={{ marginRight: "0.5rem" }}>
                        Profile
                      </Button>
                    </Link>
                  </div>

                  <div
                    style={{
                      marginRight: "0.25rem",
                      marginLeft: "0.75rem",
                      marginTop: "0.75",
                    }}
                  >
                    <Typography style={{ marginTop: "0.25rem" }}>
                      {" "}
                      Hello {user.name}
                      {/* {user.lastName} */}
                    </Typography>
                  </div>
                  {/* {user?.isAdmin && <AdminMenu />} */}
                  <div style={{ marginTop: "0.25rem" }}>
                    <Button
                      color="inherit"
                      style={{ marginRight: "0.5rem" }}
                      onClick={handleSignout}
                    >
                      <ExitToAppIcon style={{ marginRight: "0.25rem" }} />
                      LogOut
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/user/register">
                    <Button color="inherit">
                      <AssignmentIcon style={{ marginRight: "0.25rem" }} />
                      Register
                    </Button>
                  </Link>
                  <Link href="/user/login">
                    <Button color="inherit">
                      <PersonIcon style={{ marginRight: "0.25rem" }} />
                      Login
                    </Button>
                  </Link>
                </>
              )}
            </>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  )
}

export default Header
