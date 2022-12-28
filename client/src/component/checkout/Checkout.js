import React from 'react';
import { useSelector } from 'react-redux';
import './Checkout.css';
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';
import img8 from '../../images/img8.jpg';
import { Typography } from '@mui/material';

function Checkout() {
  const allCartProducts = useSelector((state) => state.product.cartProducts);

  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout_ad checkOut_banner desktop_banner"
          src={img8}
          alt="checkOut_banner"
        />
        <div>
          <h2 className="checkout_title">Your Shopping Basket</h2>
          {}
          {allCartProducts.length ? (
            allCartProducts.map((item, index) => (
              <CheckoutProduct
                key={index}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))
          ) : (
            <Typography variant="h5" textAlign="center" pt={4}>
              Please add item!
            </Typography>
          )}
        </div>
      </div>

      <div className="checkout_right">
        <Subtotal />
      </div>
      <img
        className="checkout_ad checkOut_banner mobile_banner"
        src={img8}
        alt="checkOut_banner"
      />
    </div>
  );
}

export default Checkout;
