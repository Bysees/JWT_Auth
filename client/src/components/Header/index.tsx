import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth'
import styles from './index.module.scss'

const Header = () => {
  const { auth, doLogout } = useContext(AuthContext)

  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <li><Link to='/'>home</Link></li>

          {!auth.isLoginned
            ? (
              <>
                <li><Link to='/login'>login</Link></li>
                <li><Link to='/registration'>registration</Link></li>
              </>
            )
            : (
              <>
                <li className={styles.login}>{auth.login}</li>
                <li>
                  <button onClick={doLogout}>
                    Logout
                  </button>
                </li>
              </>
            )
          }

        </ul>
      </nav>
    </header>
  )
}

export default Header