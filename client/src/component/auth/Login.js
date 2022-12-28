import { Box, Stack } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setUserName } from '../../redux/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;

    axios
      .post('http://localhost:5000/user/login', { email, password })
      .then((response) => {
        if (response.data.status) {
          dispatch(setUserName(response.data.result.username));
          // token store on local storage
          localStorage.setItem('jwtToken', response.data.result.token);
          // notification
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          navigate('/');
        } else {
          toast.error(response.data.error, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        toast.error('authentication failed', {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  // css file
  const labeStyle = {
    fontSize: '0.8rem',
    fontWeight: 500,
    padding: '10px 0 5px 0',
  };
  const CommonLinkStyle = {
    color: 'rgb(51, 102, 204)',
    fontSize: '13px',
    cursor: 'pointer',
  };
  const CommonStyle = {
    width: '100%',
    margin: '1rem 0',
    padding: '0.4rem 0',
    borderRadius: '3px',
    fontSize: '1rem',
    fontWeight: 500,
  };
  const styledButton_1 = ({ hover, active }) => ({
    ...CommonStyle,
    cursor: hover ? 'pointer' : 'text',
    color: 'rgba(19, 25, 33,0.9)',
    background: active ? 'rgb(240, 193, 75,0.7)' : 'rgb(240, 193, 75)',
    border: ' 1px solid  rgb(205, 144, 66,0.7)',
  });
  const styledButton_2 = ({ hover }) => ({
    ...CommonStyle,
    cursor: hover ? 'pointer' : 'text',
    color: 'rgba(19, 25, 33,0.8)',
    backgroundColor: 'rgba(118,118,118,0.1)',
    border: ' 1px solid  rgba(118,118,118,0.8)',
  });
  const errorStyle = { color: 'red', fontSize: '14px' };
  const inputStyle = {
    padding: '0.41rem',
    border: ' 2px solid lightgray',
    borderRadius: '5px',
    outline: 'none',
  };
  return (
    <Box style={{ display: 'grid', placeContent: 'center' }}>
      <ToastContainer />
      <Stack
        alignItems="center"
        mt={4}
        p={4}
        pt={2}
        style={{
          border: ' 1px solid lightgray',
          borderRadius: '3px',
          width: '280px',
        }}>
        <Typography variant="h5" mb={4}>
          Sign in
        </Typography>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: '100%',
          }}>
          <Form.Field
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            <label style={labeStyle}>Email</label>
            <input
              style={{
                padding: '0.41rem',
                border: ' 2px solid lightgray',
                borderRadius: '5px',
                outline: 'none',
              }}
              placeholder="Your Email"
              type="email"
              {...register('email', {
                required: true,
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
          </Form.Field>
          {errors.email && (
            <Typography color="red" variant="body2">
              Please Enter valid Address
            </Typography>
          )}{' '}
          <Form.Field
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            <label style={labeStyle}>Password</label>
            <input
              style={inputStyle}
              placeholder="At least 6 characters"
              type="password"
              {...register('password', {
                required: true,

                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
              })}
            />
          </Form.Field>
          {errors.password && (
            <p style={errorStyle}>
              {' '}
              Passwords must be at least 6 characters and one upperCase, one
              lowerCase,one letter and one special character
            </p>
          )}{' '}
          <Button
            type="submit"
            style={styledButton_1({ hover, active })}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            onPointerDown={() => setActive(true)}
            onPointerUp={() => setActive(false)}>
            Continue
          </Button>
          <p
            style={{
              color: 'rgba(19, 25, 33,0.9)',
              fontSize: '13px',
              paddingBottom: '1rem',
            }}>
            By continuing, you agree to Amazon's{' '}
            <Link to="#" style={CommonLinkStyle}>
              Conditions of Use{' '}
            </Link>
            and{' '}
            <Link to="#" style={CommonLinkStyle}>
              Privacy Notice.
            </Link>
          </p>
          <Link to="#" style={CommonLinkStyle}>
            {' '}
            Need help?
          </Link>
        </Form>
      </Stack>
      <Box textAlign="center" pt={4}>
        <Typography variant="body1" color="rgba(118,118,118)">
          New To Amazon?
        </Typography>
        <Link to="/signup" style={CommonLinkStyle}>
          <Button
            type="submit"
            style={styledButton_2({ hover })}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}>
            Create Your amazon Account
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Login;
