import { Box, Rating, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductId, addToCart } from '../../redux/productSlice';

const buttonNatural = {
  padding: '0.4rem 0.7rem',
  marginTop: '2rem',
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

export const ProductInfo = () => {
  const dispatch = useDispatch();
  const [buttonStatus, setButtonStatus] = useState(false);

  const allCartProducts = useSelector((state) => state.product.cartProducts);
  const productDetails = useSelector((state) => state.product.productInfo);
  const productIds = useSelector((state) => state.product.productIds);

  const handleAddToCart = () => {
    if (!productIds.includes(productDetails.id)) {
      dispatch(addProductId([...productIds, productDetails.id]));
      dispatch(addToCart([...allCartProducts, productDetails]));
    }
  };
  console.log();
  return (
    <>
      {Object.entries(productDetails).length !== 0 ? (
        <Stack
          p={5}
          pl={3}
          pb={0}
          sx={{
            flexDirection: {
              xs: 'column',
              sm: 'column',
              md: 'row',
              lg: 'row',
              xl: 'row',
            },
            gap: {
              xs: '2rem',
              sm: '2rem',
              md: '3rem',
              lg: '3rem',
              xl: '3rem',
            },
          }}>
          <Box
            p={4}
            style={{
              boxShadow: ` rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px`,
            }}>
            <img
              src={productDetails.image}
              alt={productDetails._id}
              style={{
                width: '280px',
                objectFit: 'contain',
                objectPosition: '80% 100%',
              }}
            />
          </Box>
          <Box>
            {' '}
            <Typography variant="body2"> #1 Best Seller </Typography>
            <Typography variant="h5" textAlign="justify">
              {' '}
              {productDetails.title}
            </Typography>{' '}
            <Rating
              name="half-rating-read"
              defaultValue={productDetails.rating}
              precision={0.5}
              readOnly
            />{' '}
            <Typography variant="h5">${productDetails.price}</Typography>
            <button
              onClick={handleAddToCart}
              onMouseDownCapture={() => setButtonStatus(true)}
              onMouseUpCapture={() => setButtonStatus(false)}
              style={buttonStatus ? buttonExcite : buttonNatural}>
              Add to Cart
            </button>
          </Box>
        </Stack>
      ) : (
        <Box textAlign="center" mt={10}>
          <Typography variant="h4" letterSpacing="1px">
            Oh No!
          </Typography>
        </Box>
      )}
    </>
  );
};
