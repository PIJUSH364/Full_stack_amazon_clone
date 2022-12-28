import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { NavBar } from './component/navBar/NavBar';
import Home from './component/layout/Home';
import Checkout from './component/checkout/Checkout';
// import { Footer } from './component/footer/Footer';
import Login from './component/auth/Login';
import { SignUp } from './component/auth/SignUp';
import { ProductInfo } from './component/product/ProductInfo';
import axios from 'axios';
import { setUserName } from './redux/userSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    axios
      .post('http://localhost:5000/user/auto_login', { token })
      .then((response) => {
        if (response.data.status) {
          dispatch(setUserName(response.data.result.username));
        } else {
          // console.log('login fail');
        }
      })
      .catch((error) => {
        // console.log('login fail');
      });
  }, []);

  return (
    <div className="App">
      {/* <FormPage /> */}
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/product" element={<ProductInfo />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
