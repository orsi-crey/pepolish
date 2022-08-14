import { Route, Routes } from 'react-router-dom';

import Home from './routes/home/home.component';
import Profile from './routes/profile/profile.component';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/sign-in.component';
import SignUp from './routes/sign-up/sign-up.component';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='sign-in' element={<SignIn />} />
        <Route path='sign-up' element={<SignUp />} />
        <Route path='profile' element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
