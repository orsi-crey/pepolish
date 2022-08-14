import { Route, Routes } from 'react-router-dom';

import Home from './routes/home/home.component';
import Auth from './routes/auth/auth.component';
import Profile from './routes/profile/profile.component';
import Navigation from './routes/navigation/navigation.component';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='auth' element={<Auth />} />
        <Route path='profile' element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
