import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
import { products } from '../data';
import { useDispatch, useSelector } from 'react-redux';
import { showProductDetails } from '../../redux/productSlice';

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
export const DeskTopNavBar = ({ allCartProducts }) => {
  const userName = useSelector((state) => state.user.userName);
  const dispatch = useDispatch();
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
      <Stack className="header" direction="row">
        <Link to="/">
          <img
            className="header_logo"
            src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
            alt=""
          />
        </Link>

        <div className="header_search">
          <input
            type="text"
            className="header_searchInput"
            value={inputValue}
            onChange={handleFilter}
          />
          <SearchIcon className="header_searchIcon" />
          {/* logo */}
        </div>

        <div className="header_nav">
          <Link
            to="/login"
            style={{
              textDecoration: 'none',
            }}>
            <div className="header_option">
              <span className="header_optionLineOne">hello</span>
              <span className="header_optionLineTwo">
                {userName ? userName.toUpperCase().slice(0, 15) : 'sign in'}
              </span>
            </div>
          </Link>

          <div className="header_option none_temp">
            <span className="header_optionLineOne">Returns</span>
            <span className="header_optionLineTwo">& Orders</span>
          </div>

          <div className="header_option none_temp">
            <span className="header_optionLineOne ">Your</span>
            <span className="header_optionLineTwo">Prime</span>
          </div>
          <Link
            to="/checkout"
            style={{
              textDecoration: 'none',
            }}>
            <div className="header_optionBasket">
              <ShoppingBasketIcon />
              {/* /no of add to cart items */}
              <span className="header_optionLineTwo header_BasketCount">
                {allCartProducts?.length}
              </span>
            </div>
          </Link>
        </div>
      </Stack>
      <Box style={itemsBoxStyle}>
        {filterProducts && (
          <Stack minWidth="30rem" position="absolute" gap={0.6} top="15%">
            {filterProducts.slice(0, 3).map((item, key) => (
              <Link
                to="product"
                key={key}
                style={{ textDecoration: 'none' }}
                onClick={() => {
                  dispatch(showProductDetails({ ...item }));
                  setFilterProducts([]);
                }}>
                <li style={searchItemStyle} className="autoSearchItem">
                  {item.title.slice(0, 30)}
                </li>
              </Link>
            ))}
          </Stack>
        )}
      </Box>
    </>
  );
};

