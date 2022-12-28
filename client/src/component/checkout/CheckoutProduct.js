import { Rating } from '@mui/material';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './CheckoutProduct.css';
import { addProductId, removeFromCart } from '../../redux/productSlice';

const buttonNatural = {
  padding: '0.4rem 0.7rem',
  background: 'rgb(240, 193, 75)',
  cursor: 'pointer',
  borderRadius: '15px',
  border: '1px solid rgba(118,118,118)',
  fontSize: '0.9rem',
  fontWeight: 600,
  color: 'rgb(17, 17, 17,0.8)',
};
const buttonExcite = {
  ...buttonNatural,
  transform: 'scale(1.03)',
};

function CheckoutProduct({ id, title, image, price, rating }) {
  const dispatch = useDispatch();
  const [buttonStatus, setButtonStatus] = useState(false);
  const allCartProducts = useSelector((state) => state.product.cartProducts);
  const productIds = useSelector((state) => state.product.productIds);

  const handleRemoveProduct = (_id) => {
    const updatedCartProducts = allCartProducts.filter(
      (product) => product.id !== _id
    );
    const updatedProductIds = productIds.filter((itemId) => itemId !== id);
    dispatch(addProductId([...updatedProductIds]));
    dispatch(removeFromCart([...updatedCartProducts]));
  };

  return (
    <>
      <div className="checkoutProduct">
        <img
          src={image}
          className="checkoutProduct_image"
          alt="checkout-product-img"
        />
        <div className="checkoutProduct_info">
          <p className="checkoutProduct_title">{title} </p>{' '}
          <Rating
            name="half-rating-read"
            defaultValue={rating}
            precision={0.5}
            readOnly
          />
          <p className="checkoutProduct_price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <div className="checkoutProduct_info">
            {/* how much rating pass on props that much rating render on page */}
          </div>
          <button
            onClick={() => handleRemoveProduct(id)}
            onMouseDownCapture={() => setButtonStatus(true)}
            onMouseUpCapture={() => setButtonStatus(false)}
            style={buttonStatus ? buttonExcite : buttonNatural}>
            Remove from Basket
          </button>
        </div>
      </div>
    </>
  );
}

export default CheckoutProduct;
