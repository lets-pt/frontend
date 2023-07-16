import logo from './img/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './component/Header';
import Script from './component/Script';
import Homepage from "./page/HomePage"
import PracticeStart from "./page/PracticeStart"
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path="/practice" element={<PracticeStart />}></Route>
      </Routes>
    </div>
  );
}

export default App;
