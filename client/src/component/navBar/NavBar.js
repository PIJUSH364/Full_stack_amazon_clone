import React from 'react';
import './navBar.css';
import { MobileNavBar } from './MobileNavBar';
import { DeskTopNavBar } from './DeskTopNavBar';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

export const NavBar = () => {
  const allCartProducts = useSelector((state) => state.product.cartProducts);
  return (
    <Box position="sticky" top={0} zIndex={999}>
      <div className="mobile_display">
        <MobileNavBar allCartProducts={allCartProducts} />
      </div>
      <div className="tab_deskTop_display">
        <DeskTopNavBar allCartProducts={allCartProducts} />
      </div>
    </Box>
  );
};
