import { Box, Stack } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import axios from 'axios';

export const SignUp = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { name, username, email, password } = data;
    axios
      .post('http://localhost:5000/user/signup', {
        name,
        username,
        email,
        password,
      })
      .then((res) => {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate('/');
      })
      .catch((err) =>
        toast.warning('SignUp failed!', {
          position: toast.POSITION.TOP_CENTER,
        })
      );
  };
  const errorStyle = { color: 'red', fontSize: '14px' };
  const labeStyle = {
    fontSize: '0.9rem',
    fontWeight: 500,
    padding: '10px 0 5px 0',
  };
  const inputStyle = {
    padding: '0.41rem',
    border: ' 2px solid lightgray',
    borderRadius: '5px',
    outline: 'none',
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
    fontSize: '13px',
    fontWeight: 500,
  };
  const styledButton_1 = ({ hover, active }) => ({
    ...CommonStyle,
    cursor: hover ? 'pointer' : 'text',
    color: 'rgba(19, 25, 33,0.9)',
    background: active ? 'rgb(240, 193, 75,0.7)' : 'rgb(240, 193, 75)',
    border: ' 1px solid  rgb(205, 144, 66,0.7)',
  });

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
          Create Account
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
            <label style={labeStyle}>Your name</label>
            <input
              style={inputStyle}
              placeholder="Your First and Last Name"
              type="text"
              {...register('name', {
                required: true,
                minLength: 5,
              })}
            />
          </Form.Field>
          {errors.name && (
            <p style={errorStyle}>Name should be moreThan Five character's</p>
          )}
          <Form.Field
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            <label style={labeStyle}>UserName</label>
            <input
              style={inputStyle}
              placeholder="Your Favorite"
              type="text"
              {...register('username', {
                required: true,
                maxLength: 12,
              })}
            />
          </Form.Field>
          {errors.username && (
            <p style={errorStyle}>username with in twelve characters</p>
          )}
          <Form.Field
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            <label style={labeStyle}>Email</label>
            <input
              style={inputStyle}
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
            <p style={errorStyle}> Please Enter valid Address</p>
          )}
          <Form.Field
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            <label style={labeStyle}>Password</label>
            <input
              style={inputStyle}
              placeholder="At least 8 characters"
              type="password"
              {...register('password', {
                required: true,
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
              })}
            />
            <p
              style={{
                paddingTop: '5px',
                fontSize: '12px',
              }}>
              * Passwords must be at least 8 characters.
            </p>
          </Form.Field>
          {errors.password && (
            <p style={errorStyle}>
              {' '}
              Passwords must be at least 8 characters and one upperCase, one
              lowerCase,one letter and one special character
            </p>
          )}{' '}
          <p
            style={{
              color: 'rgba(19, 25, 33,0.9)',
              fontSize: '12px',
              paddingBottom: '1rem',
              paddingTop: '1.5rem',
              textAlign: 'justify',
            }}>
            By enrolling your mobile phone number, you consent to receive
            automated security notifications via text message from Amazon.
            Message and data rates may apply.
          </p>
          <Button
            type="submit"
            style={styledButton_1({ hover, active })}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            onPointerDown={() => setActive(true)}
            onPointerUp={() => setActive(false)}>
            Continue
          </Button>
          <div>
            <p
              style={{
                color: 'rgba(19, 25, 33,0.9)',
                fontSize: '13px',
              }}>
              {' '}
              Already have an account?{' '}
              <Link to="../login" style={CommonLinkStyle}>
                Sign in
              </Link>
            </p>{' '}
            <p
              style={{
                color: 'rgba(19, 25, 33,0.9)',
                fontSize: '13px',
                paddingBottom: '0.81rem',
              }}>
              {' '}
              Buying for work?
              <Link to="#" style={CommonLinkStyle}>
                {' '}
                Create a free business account
              </Link>
            </p>{' '}
          </div>
          <div>
            <p
              style={{
                color: 'rgba(19, 25, 33,0.9)',
                fontSize: '13px',
                paddingBottom: '1rem',
              }}>
              By creating an account or logging in, you agree to Amazon’s{' '}
              <Link to="#" style={CommonLinkStyle}>
                {' '}
                Conditions of Use
              </Link>
              and{' '}
              <Link to="#" style={CommonLinkStyle}>
                {' '}
                Privacy Policy.
              </Link>
            </p>
          </div>
        </Form>
      </Stack>
    </Box>
  );
};
