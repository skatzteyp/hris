import React from 'react';
import { createPortal } from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '@ligph/ui';

import Pages from './pages/Pages';
import { toastRemove } from './redux/modules/toast/toastActions';
import { TOAST_REMOVE } from './redux/modules/toast/toastTypes';

function App() {
  const dispatch = useDispatch();
  const toast = useSelector(state => state.toast);

  const toastTpl = toast
    ? toast.map(item => {
      return createPortal(<Toast { ...item.payload }
        onClose={ item.payload.onClose
          ? () => {
              item.payload.onClose();
              dispatch(toastRemove({
                type: TOAST_REMOVE,
                payload: { id: item.id }
              }));
            }
          : () => {
            dispatch(toastRemove({
              type: TOAST_REMOVE,
              payload: { id: item.id }
            }))
          }
        }
      isVisible={true}>
        {item.payload.message}
      </Toast>, document.body)})
    : null;

  return (
    <div className="app">
      { toastTpl }
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;
