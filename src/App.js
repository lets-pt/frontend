import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Header from './component/Header'
import Script from './component/Script'
import Homepage from './page/HomePage'
import PracticeStart from './page/PracticeStart'
import { Routes, Route, Link } from 'react-router-dom'
import TestPage from './page/TestPage'
import LoginPage from './page/LoginPage'
import JoinPage from './page/JoinPage'
import ObservePage from './page/ObservePage'
import { useState } from 'react'
import PrivateRoute from './route/PrivateRoute'
import KeywordPage from './page/KeywordPage'
import ResultDetail from './page/ResultDetail'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/resultDetail"
          element={<ResultDetail />}
        />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/observe" element={<ObservePage />} />
        <Route path="/keyword" element={<KeywordPage />} />
        <Route
          path="/practice"
          element={<PracticeStart />}
          isLoggedIn={isLoggedIn}
        />
        <Route element={<PrivateRoute />}>

        </Route>
        <Route path="/test" element={<TestPage />} isLoggedIn={isLoggedIn} />
      </Routes>
    </div>
  )
}

export default App
