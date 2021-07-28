import styles from "../styles/Home.module.css"
import { getSession, signIn, signOut } from "next-auth/client"
import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import {
  FacebookLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
  TwitterLoginButton,
  LinkedInLoginButton,
} from "react-social-login-buttons"

function SocialLogin({ session }) {
  const handleClick = () => {
    alert("Hello!")
  }
  console.log(session)
  return (
    <div>
      {session ? (
        <Button icon="fab fa-github" onClick={() => signOut()}>
          Sign out
        </Button>
      ) : (
        <>
          <FacebookLoginButton onClick={handleClick} />
          <GoogleLoginButton onClick={() => signIn("google")} />
          <GithubLoginButton onClick={handleClick} />
          <TwitterLoginButton onClick={handleClick} />
          {/* <LinkedInLoginButton onClick={handleClick} /> */}
        </>
      )}
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}

export default SocialLogin
