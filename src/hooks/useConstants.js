import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getConstants, getConstantsPublic } from '../redux/modules/constants/constantsActions';

export default (pub = false) => {
  const { constants } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pub) {
      if (!constants.publicCached) {
        dispatch(getConstantsPublic());
      }
    }
    else {
      if (!constants.cached) {
        dispatch(getConstants());
      }
    }
  }, [ constants, dispatch, pub ]);

  return constants;
}

