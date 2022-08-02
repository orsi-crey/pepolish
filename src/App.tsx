import { Route, Routes } from 'react-router-dom';

import Home from './routes/home/home.component';
import Auth from './routes/auth/auth.component';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='auth' element={<Auth />} />
    </Routes>
  );
}

export default App;
