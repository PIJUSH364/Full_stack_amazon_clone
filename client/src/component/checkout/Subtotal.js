import React, { useState } from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useDispatch, useSelector } from 'react-redux';
import { getBasketTotalPrice } from '../../redux/store';
import { ToastContainer, toast } from 'react-toastify';
import { removeFromCart } from '../../redux/productSlice';

function Subtotal() {
  const [isChecked, setIsChecked] = useState(false);
  const [toggleValue, setToggleValue] = useState(false);
  const allCartProducts = useSelector((state) => state.product.cartProducts);
  const dispatch = useDispatch();

  if (toggleValue) {
    setTimeout(() => setToggleValue(false), 700);
  }
  // checkbox value
  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  };
  // final step to checkOut
  const handleProceedToPayment = () => {
    if (isChecked) {
      //confirm order
      if (allCartProducts.length !== 0) {
        dispatch(removeFromCart([]));
        toast.success('Order Confirm !', {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.warning('Please add item on your cart', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } else {
      toast.error('Please Check your checkbox', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setToggleValue(!toggleValue);
  };

  return (
    <div className="subtotal">
      <ToastContainer></ToastContainer>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({allCartProducts.length} items) :
              <strong>{value}</strong>{' '}
            </p>
            <small className="subtotal_gift">
              <input
                style={{ cursor: 'pointer' }}
                type="checkbox"
                onChange={(e) => handleChange(e)}
                value={isChecked}
              />{' '}
              This is your order contain a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotalPrice(allCartProducts)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />
      <button
        className={` ${toggleValue ? 'toggle_click' : ''}`}
        onClick={handleProceedToPayment}>
        Proceed to checkout
      </button>
    </div>
  );
}

export default Subtotal;
