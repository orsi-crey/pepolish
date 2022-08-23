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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="profile" element={<Profile />} />
          <Route path="products">
            <Route index element={<ProductList />} />
            <Route path="new" element={<NewProduct />} />
            <Route path=":productId" element={<Product />} />
            <Route
              path=":productId/edit"
              element={<div>edit product page</div>}
            />
          </Route>
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
