import { Box, Typography } from '@mui/material';
import React from 'react';

export const Footer = () => {
  return (
    <Box
      textAlign="center"
      p={2}
      width="100vw"
      position="fixed"
      bottom={0}
      bgcolor="rgba(220,220,220,0.6)">
      <Typography letterSpacing={1}>amazon@2022AllRightReserved</Typography>
    </Box>
  );
};
