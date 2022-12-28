import React from 'react';
import Product from '../productComponent/Product';
import { Box, Stack } from '@mui/material';
import { products } from '../data';

function Home() {
  return (
    <Stack
      className="home"
      justifyContent="center"
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '1500px',
      }}>
      <div className="home_container">
        <img
          className="home_image"
          style={{ width: '100%', zIndex: -1 }}
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/AmazonBusiness/JanArt/Gateway/MainBanner_1500_300_1701.jpg"
          alt=""
        />
        {/*all land page  product  item contain below*/}
        <Box className="home_row section_1" display="grid">
          {products.slice(0, 2).map((product, key) => (
            <Product
              key={key}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              rating={product.rating}
            />
          ))}
        </Box>
        <Box className="home_row section_2" display="grid">
          {products.slice(2, 5).map((product, key) => (
            <Product
              key={key}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              rating={product.rating}
            />
          ))}
        </Box>
        <div className="home_row">
          {products.slice(5).map((product, key) => (
            <Product
              key={key}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              rating={product.rating}
            />
          ))}
        </div>
      </div>
    </Stack>
  );
}

export default Home;
