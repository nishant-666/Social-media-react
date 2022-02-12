import './App.css';
import Register from './Components/Register';
import Home from './Components/Home';
import { Routes, Route } from 'react-router-dom'
import { app, database } from './firebaseConfig';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/home" element={<Home database={database}/>} />
    </Routes>
  );
}

export default App;
