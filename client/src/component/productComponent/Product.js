import { Box, Rating } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Product.css';
import { addProductId, addToCart } from '../../redux/productSlice';

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
function Product({ id, title, image, price, rating }) {
  const dispatch = useDispatch();
  const [buttonStatus, setButtonStatus] = useState(false);
  const allCartProducts = useSelector((state) => state.product.cartProducts);
  const productIds = useSelector((state) => state.product.productIds);

  const productDetails = {
    id,
    title,
    image,
    price,
    rating,
  };
  const handleAddToCart = () => {
    console.log('productIds', productDetails.id);
    if (productIds && !productIds.includes(productDetails.id)) {
      dispatch(addProductId([...productIds, productDetails.id]));
      dispatch(addToCart([...allCartProducts, productDetails]));
    }
  };

  return (
    <Box className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          {' '}
          <Rating
            name="half-rating-read"
            defaultValue={rating}
            precision={0.5}
            readOnly
          />
        </div>
        <div className="product_img">
          <img src={image} alt="product-img" style={{ width: '100%' }} />
          <button
            onClick={handleAddToCart}
            onMouseDownCapture={() => setButtonStatus(true)}
            onMouseUpCapture={() => setButtonStatus(false)}
            style={buttonStatus ? buttonExcite : buttonNatural}>
            Add to Cart
          </button>
        </div>
      </div>
    </Box>
  );
}

export default Product;
