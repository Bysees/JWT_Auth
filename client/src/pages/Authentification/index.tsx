import { FC, FormEvent, useContext, useState } from "react"
import styles from './index.module.scss'
import { AuthService } from '../../api/AuthService'
import { AuthContext } from "../../context/auth"
import { useNavigate } from "react-router-dom"
import { validator } from "../../utils/authValidator"
import { responseErrorHandler } from "../../api"

interface Props {
  registration?: boolean
}

const Authentification: FC<Props> = ({ registration = false }) => {
  const { doLogin } = useContext(AuthContext)
  const redirect = useNavigate()

  const authQuery = registration ? 'registration' : 'login'

  const [login, setLogin] = useState<string>(registration ? '' : 'bysees')
  const [password, setPassword] = useState<string>(registration ? '' : 'qwer')
  const [error, setError] = useState<string | null>(null)


  const doAuth = async (event: FormEvent) => {
    event.preventDefault()
    const errorMessage = validator(login, password)

    if (errorMessage) {
      return setError(errorMessage)
    }

    try {
      const { data } = await AuthService[authQuery]({ login, password })

      doLogin(data.token)
      redirect('/')
    } catch (err) {
      responseErrorHandler(err, setError)
    }
  }

  return (
    <form className={styles.form} onSubmit={doAuth}>
      <h2 className={styles.form__title}>{authQuery}</h2>
      <div className={styles.form__field}>
        <label htmlFor="login">Login: </label>
        <input
          value={login}
          onChange={e => setLogin(e.target.value)}
          id="login" />
      </div>
      <div className={styles.form__field}>
        <label htmlFor="password"> Password: </label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          id="password" />
      </div>
      <button>Login</button>
      {error &&
        <p className={styles.form__error}>{error}</p>
      }
    </form>
  )
}

export default Authentification