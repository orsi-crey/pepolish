import { Route, Routes } from 'react-router-dom';

import Home from './routes/home/home.component';
import Auth from './routes/auth/auth.component';
import Profile from './routes/profile/profile.component';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='auth' element={<Auth />} />
      <Route path='profile' element={<Profile />} />
    </Routes>
  );
}

export default App;
