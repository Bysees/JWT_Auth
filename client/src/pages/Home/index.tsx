import { useContext } from 'react'
import { AuthContext } from '../../context/auth'
import Posts from '../../components/Posts'
// import styles from './index.module.scss'

const Home = () => {

  const { auth } = useContext(AuthContext)

  return (
    <div>
      {auth.isLoginned
        ? <Posts login={auth.login} />
        : <h1>Authorize for send posts</h1>
      }
    </div>
  )
}

export default Home