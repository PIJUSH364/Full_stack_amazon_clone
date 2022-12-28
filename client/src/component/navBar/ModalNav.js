import React from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Box, Stack, Typography } from '@mui/material';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { Link } from 'react-router-dom';

const ulStyle = {
  listStyleType: 'none',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '1rem',
  gap: '0.9rem',
  fontSize: '1.2rem',
};
export const ModalNav = ({ toggleMenu, setToggleMenu }) => {
  return (
    <Stack direction="row" minHeight="100vh" position="static">
      <Box width="82vw">
        <Stack
          p={2}
          pt={5}
          direction="row"
          justifyContent="space-between"
          bgcolor="rgb(19, 25, 33)"
          color="#fff">
          <div>
            <Typography variant="h5" fontWeight={700}>
              Browse
            </Typography>{' '}
            <Typography variant="h4" fontWeight={600}>
              Amazon
            </Typography>
          </div>

          <Link
            onClick={() => setToggleMenu(!toggleMenu)}
            to="login"
            style={{
              textDecoration: 'none',
              color: '#fff',
            }}>
            <Stack direction="row" alignItems="flex-start" gap={1}>
              <p>Sign in</p> <PersonOutlineIcon fontSize="medium" />
            </Stack>
          </Link>
        </Stack>
        <Stack gap={1} bgcolor="rgba(220, 220, 220)" minHeight="100%">
          <Link
            to="/"
            onClick={() => setToggleMenu(!toggleMenu)}
            style={{
              textDecoration: 'none',
              color: 'rgb(19, 25, 33)',
            }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              p={2}
              bgcolor="#fff">
              <Typography variant="h5" fontWeight={700} letterSpacing="1px">
                Amazon Home
              </Typography>
              <HomeTwoToneIcon fontSize="large" />
            </Stack>{' '}
          </Link>
          <Box p={2} bgcolor="#fff">
            <Typography variant="h5" fontWeight={700}>
              Trending
            </Typography>
            <ul style={ulStyle}>
              <li>Best seller</li> <li>New Releases</li>{' '}
              <li>Movers and Shakers</li>
            </ul>
          </Box>
          <Box p={2} bgcolor="#fff">
            <Typography variant="h5" fontWeight={700}>
              Top Categories For You
            </Typography>
            <ul style={ulStyle}>
              <li>Mobiles</li>
              <li>Computers</li>
              <li>Books</li>
              <li>See all Categories</li>
            </ul>
          </Box>{' '}
          <Box p={2} bgcolor="#fff">
            <Typography variant="h5" fontWeight={700}>
              Programs and Features
            </Typography>
            <ul style={ulStyle}>
              <li>Today's deal</li>
              <li>amazon Pay</li>
              <li>Try Prime</li>
              <li>Sell on amazon</li>
            </ul>
          </Box>
        </Stack>
      </Box>
      <Box
        bgcolor="#fff"
        p={2}
        style={{
          cursor: 'pointer',
          top: '0',
          position: 'sticky',
        }}>
        <CloseTwoToneIcon
          fontSize="large"
          onClick={() => setToggleMenu(!toggleMenu)}
        />
      </Box>
    </Stack>
  );
};
