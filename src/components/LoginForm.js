import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Text } from '@ligph/ui';

import { routes } from '../utils/routes';
import { useAuth } from '../hooks/useAuth.js';
import { toastAdd, toastRemoveAll } from '../redux/modules/toast/toastActions';
import { validateEmail, validatePassword } from '../utils/validation';

import './LoginForm.scss';
import { ReactComponent as Logo } from '../assets/images/logo.svg';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [token, login] = useAuth();
  const { error } = useSelector(state => state.auth);
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({ username: '', password: ''});

  const [errorEmail, setErrorEmail] = useState(true);
  const [errorPassword, setErrorPassword] = useState(false);

  const handleChange = e => {
    e.persist();

    const { id, value } = e.target;

    setForm(prevState => {
      return { ...prevState, [e.target.id]: e.target.value.trim() }
    });

    switch (id) {
      case 'username':
        setErrorEmail(validateEmail(value));
        break;
      case 'password':
        setErrorPassword(validatePassword(value));
        break;
      default:
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    setProcessing(true);
    login(username, password);
  }

  useEffect(() => {
    if (processing) {
      if (token && Object.keys(token).length > 0) {
        history.push(routes.recruitment.dashboard);
      }

      if (error) {
        setProcessing(false);

        dispatch(toastAdd({
          variant: 'error',
          position: 'top-right',
          close: true,
          isVisible: true,
          message: 'The Email Address or Password you entered is incorrect'
        }));

        setTimeout(() => {
          dispatch(toastRemoveAll({
            variant: 'error',
          }));
        }, 6000)
      }
    }
  }, [error, processing, token, history, dispatch])

  const validEmail = errorEmail ? '' : 'This field requires LIG Email address';
  const validPassword = errorPassword ? 'The Password you entered is too short' : '';
  const hasError = !errorEmail || errorPassword;

  return (
    <div className="z-10 login-form container mx-auto bg-white border border-black-100 rounded-lg pt-12 pb-6 px-10 relative">
      <form className="relative z-10" onSubmit={handleSubmit}>
        <h2 className="flex justify-center"><Logo className="text-black"/></h2>
        <div className="pt-12">
          <Text
            inputClassName="py-4"
            type="text"
            placeholder=""
            label="Email Address"
            asterisk
            id="username"
            value={form.username}
            onChange={handleChange}
            error={validEmail}
          />
        </div>
        <div className="pt-5">
          <Text
            inputClassName="py-4"
            type="password"
            placeholder=""
            label="Password"
            asterisk
            id="password"
            value={form.password}
            onChange={handleChange}
            error={validPassword}
          />
        </div>
        <div className="flex flex-col items-stretch py-8">
          <Button
            className="justify-center bg-blue"
            variant="fill"
            color="white"
            disabled={processing || hasError}
          >Login</Button>
        </div>
      </form>
      <div className="flex items-center justify-center pb-8">
        <Button
          className="justify-center"
          color="blue"
          onClick={() => {}}
        >Forget Password?</Button>
      </div>
    </div>
  );
}

export default Login;
