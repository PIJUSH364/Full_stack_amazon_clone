import { Box, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Link } from 'react-router-dom';
import { ModalNav } from './ModalNav';
import { products } from '../data';
import { showProductDetails } from '../../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
const searchItemStyle = {
  listStyleType: 'none',
  padding: '6px 10px',
  fontSize: '16px',
  fontWeight: 400,
  color: '#fff',
  background: 'rgba(118,118,118,0.7)',
};
const itemsBoxStyle = {
  display: 'grid',
  placeItems: 'center',
  position: 'relative',
};
const hidden_display = {
  display: 'none',
};
export const MobileNavBar = ({ allCartProducts }) => {
  const userName = useSelector((state) => state.user.userName);
  const dispatch = useDispatch();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filterProducts, setFilterProducts] = useState([]);

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setInputValue(searchWord);
    const newFilterData = products.filter((products) => {
      return products.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    setFilterProducts([...newFilterData]);
  };
  useEffect(() => {
    if (inputValue === '') {
      setFilterProducts([]);
    }
  }, [inputValue]);
  return (
    <>
      <div style={toggleMenu ? null : hidden_display}>
        <ModalNav setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} />
      </div>
      <Stack
        style={toggleMenu ? hidden_display : null}
        p={2}
        pt={1}
        bgcolor="rgb(19, 25, 33)"
        color="#fff">
        <Stack direction="row" justifyContent="space-between">
          {/* menu and website logo */}
          <Stack direction="row" alignItems="center" gap={1}>
            <MenuIcon onClick={() => setToggleMenu(!toggleMenu)} />
            <Link to="/">
              <img
                style={{
                  paddingTop: '10px',
                }}
                className="header_logo"
                src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
                alt="amazon_logo"
              />
            </Link>
          </Stack>
          <Stack direction="row" alignItems="center" gap={2}>
            <Link
              to="/login"
              style={{
                textDecoration: 'none',
                color: '#fff',
              }}>
              <Stack direction="row" alignItems="center">
                <p>
                  {userName ? userName.toUpperCase().slice(0, 15) : 'signIn'}
                </p>
                <PersonOutlineIcon />
              </Stack>
            </Link>
            <Link to="/checkout">
              <div className="header_optionBasket">
                <ShoppingBasketIcon />
                {/* /no of add to cart items */}
                <span className="header_optionLineTwo header_BasketCount">
                  {allCartProducts?.length}
                </span>
              </div>
            </Link>
          </Stack>
        </Stack>
        {/* search bar */}
        <Box>
          <Box className="header_search">
            <input
              type="text"
              className="header_searchInput"
              value={inputValue}
              onChange={handleFilter}
            />
            <SearchIcon className="header_searchIcon" />
            {/* logo */}
          </Box>
        </Box>
      </Stack>
      <Box style={itemsBoxStyle}>
        {filterProducts && (
          <Stack minWidth="20rem" position="absolute" gap={0.6} top="15%">
            {filterProducts.slice(0, 3).map((item, key) => (
              <Link
                to="product"
                key={key}
                style={{ textDecoration: 'none', ...searchItemStyle }}
                onClick={() => {
                  dispatch(showProductDetails({ ...item }));
                  setFilterProducts([]);
                }}>
                <li className="autoSearchItem">{item.title.slice(0, 30)}</li>
              </Link>
            ))}
          </Stack>
        )}
      </Box>
    </>
  );
};
