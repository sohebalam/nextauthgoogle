import React, { useState, useContext, useEffect } from "react"
import {
  Grid,
  Button,
  Link,
  CircularProgress,
  List,
  Box,
} from "@material-ui/core"
import Avatar from "@material-ui/core/Avatar"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { Alert } from "@material-ui/lab"
import {
  FacebookLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
  TwitterLoginButton,
  LinkedInLoginButton,
} from "react-social-login-buttons"
import TwitterIcon from "@material-ui/icons/Twitter"
import { providers, signIn, getSession } from "next-auth/client"

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const SignIn = ({ providers }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const classes = useStyles()

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })
    setLoading(false)
    if (res.error) {
      setError(res.error)
      setLoading(false)
    } else {
      window.location.href = "/"
    }
  }

  const handleClick = () => {
    alert("Hello!")
  }

  return (
    <>
      <Container component="main" maxWidth="md">
        <Grid container>
          <Grid item sm={5}>
            {/* <Container
            // component="main"
            
            // style={{ marginLeft: "3rem" }}
          > */}
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              {error && <Alert severity="error">{error}</Alert>}
              <form
                className={classes.form}
                noValidate
                onSubmit={submitHandler}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                {loading && <CircularProgress />}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/user/forgot" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href={`/user/register`} variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            {/* </Container> */}
          </Grid>
          <Grid item sm={1}></Grid>

          <Grid item xs={5}>
            {/* <Container maxWidth="xs"> */}
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <TwitterIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                style={{ marginBottom: "1rem" }}
              >
                Social Login
              </Typography>
              <FacebookLoginButton onClick={() => signIn("facebook")} />
              <GoogleLoginButton onClick={() => signIn("google")} />
              <GithubLoginButton onClick={() => signIn("github")} />
              <TwitterLoginButton onClick={() => signIn("twitter")} />
              {/* <LinkedInLoginButton onClick={() => signIn("linkedin")} /> */}
            </div>
            {/* </Container> */}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

SignIn.getInitialProps = async (context) => {
  const { req, res } = context
  const session = await getSession({ req })

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: "/",
    })
    res.end()
    return
  }

  return {
    session: undefined,
    providers: await providers(context),
    // csrfToken: await csrfToken(context),
  }
}

export default SignIn