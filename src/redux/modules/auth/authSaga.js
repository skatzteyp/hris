import { put, call, getContext } from 'redux-saga/effects';
import { queries } from './authQueries';
// Actions   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { AUTH_LOGOUT } from './authTypes';
import { AUTH_LOGIN } from './authTypes';

// reqFunction   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
function* authLogoutReq() {
  const client = yield getContext('client');
  const mutation = queries.LOGOUT;

  return yield call(client.mutate, { mutation });
}

function* authLoginReq({ username, password }) {
  const client = yield getContext('client');
  const mutation = queries.LOGIN;

  return yield call(client.mutate, { mutation,
    variables: {
      username,
      password
    }
  });
}


// exportFuntion   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export function* authLogout() {
  try {
    const { message } = yield authLogoutReq();
    yield put({ type: `${AUTH_LOGOUT}_SUCCESS`, payload: message })
  } catch(error) {
    yield put({ type: `${AUTH_LOGOUT}_FAIL`, payload: error })
  }
}

export function* authLogin(action) {
  try {
    const { data: { login } } = yield authLoginReq(action.payload);
    // const { user } = login;
    // delete login.user;

    // update auth
    yield put({ type: `${AUTH_LOGIN}_SUCCESS`, payload: login })

    // update current user
    // yield put({ type: 'USER_SET', payload: user });
  } catch(error) {
    yield put({ type: `${AUTH_LOGIN}_FAIL`, payload: error })
  }
}


