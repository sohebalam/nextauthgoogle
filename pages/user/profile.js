// import React, { useState, useEffect } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { Alert } from "@material-ui/lab"
import { getSession } from "next-auth/client"
import PersonIcon from "@material-ui/icons/Person"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { CircularProgress } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { updateProfile, clearErrors } from "../../redux/userActions"
import { UPDATE_PROFILE_RESET } from "../../redux/userTypes"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Profile = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  })

  const { name, email, password } = user

  const {
    user: loadedUser,
    loading,
    message,
  } = useSelector((state) => state.profile)
  const {
    error,
    isUpdated,
    loading: updateLoading,
  } = useSelector((state) => state.update)

  useEffect(() => {
    if (loadedUser) {
      setUser({
        name: loadedUser.name,
        email: loadedUser.email,
      })
    }

    if (error) {
      console.log(error)
      dispatch(clearErrors())
    }

    if (isUpdated) {
      router.push("/")
      dispatch({ type: UPDATE_PROFILE_RESET })
    }
  }, [dispatch, isUpdated, loadedUser, error])

  const submitHandler = (e) => {
    e.preventDefault()

    const userData = {
      name,
      email,
      password,
    }

    dispatch(updateProfile(userData))
  }

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              User Profile
            </Typography>
            {loading && <CircularProgress />}
            {message && <Alert severity="success">{message}</Alert>}
            <form className={classes.form} noValidate onSubmit={submitHandler}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="Name"
                    label="Name"
                    autoFocus
                    value={name}
                    onChange={onChange}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              /> */}
                {/* </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Update Profile
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      )}
    </>
  )
}

export default Profile
