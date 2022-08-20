import './App.css';

import { Route, Routes } from 'react-router-dom';

import Home from './routes/home/home.component';
import Profile from './routes/profile/profile.component';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/sign-in.component';
import SignUp from './routes/sign-up/sign-up.component';
import ProductList from './routes/product-list/product-list.component';
import Product from './routes/product-page/product.component';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="profile" element={<Profile />} />
        <Route path="products">
          <Route index element={<ProductList />} />
          <Route path="new" element={<div>new page</div>} />
          <Route path=":productId" element={<Product />} />
          <Route
            path=":productId/edit"
            element={<div>edit product page</div>}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
