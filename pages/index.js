import styles from "../styles/Home.module.css"
import { getSession, signIn, signOut } from "next-auth/client"

// import SocialLogin from "../components/SocialLogin"
import { useDispatch } from "react-redux"
import { clearProfile } from "../redux/userActions"

export default function Home({ session }) {
  const dispatch = useDispatch()

  const handelSignOut = () => {
    dispatch(clearProfile())
    signOut()
  }

  // console.log(session)
  return (
    <div className={styles.container}>
      {session ? (
        <button onClick={handelSignOut}>Sign out</button>
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
      {session && (
        <div>
          <p>Signed in as {session.user.email}</p>
          <p>Name: {session.user.name}</p>
          <img src={session.user.image} alt={session.user.name} />
        </div>
      )}
      {/* <SocialLogin /> */}
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
