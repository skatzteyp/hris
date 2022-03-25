import { useSelector, useDispatch } from 'react-redux';

import { authLogin, authLogout } from './../redux/modules/auth/authActions';

export const useAuth = () => {
  const { token } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const login = (username, password) => {
    return dispatch(authLogin({
      username, password
    }));
  };

  const logout = () => {
    return dispatch(authLogout);
  };

  return [
    token,
    login,
    logout
  ];
}
