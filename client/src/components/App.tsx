import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Authentification from '../pages/Authentification';
import Header from './Header';
import styles from './App.module.scss'
import AuthProvider from '../context/auth';
import Home from '../pages/Home';


const App = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <div className={styles.container}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Authentification key={1} />} />
            <Route path="/registration" element={<Authentification registration key={2} />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
