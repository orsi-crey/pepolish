import './App.css';

import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Home from './routes/home/home.component';
import Profile from './routes/profile/profile.component';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/sign-in.component';
import SignUp from './routes/sign-up/sign-up.component';
import ProductList from './routes/product-list/product-list.component';
import Product from './routes/product-page/product.component';
import NewProduct from './routes/new-product-page/new-product.component';
import BottleList from './routes/bottle-list/bottle-list.component';
import Bottle from './routes/bottle-page/bottle.component';
import NewBottle from './routes/new-bottle-page/new-bottle.component';
import UserList from './routes/user-list/user-list.component';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="my-profile" element={<Profile />} />
          <Route path="users"> 
            <Route index element={<UserList />} />
            {/* <Route path=":userId" element={<UserProfile />} /> */}
          </Route>
          <Route path="products">
            <Route index element={<ProductList />} />
            <Route path="new" element={<NewProduct />} />
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="bottles">
            <Route index element={<BottleList />} />
            <Route path="new" element={<NewBottle />} />
            <Route path=":bottleId" element={<Bottle />} />
          </Route>
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
