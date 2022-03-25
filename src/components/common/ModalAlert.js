import React from 'react';
import { Button } from '@ligph/ui';
import { ReactComponent as IconX } from '../../assets/images/icon-x.svg'

const ModalAlert = ({ children, modalName,   modalSize, onClose, show }) => {

  return (
    <div className={`w-screen h-screen flex items-center justify-center fixed z-50 top-0 left-0 bg-black bg-opacity-75 ${ show ? 'block' : 'hidden'}`}>
      <div className={`${modalSize} relative`}>
        <Button className="absolute right-0 top-0 mx-3 my-4" onClick={onClose}>
          <IconX className="stroke-current stroke-2 text-black-300" />
        </Button>
        <div className="bg-white rounded px-4 py-5 text-black overflow-scroll">
          <h2 className="text-l font-medium">{modalName}</h2>
          { children }
        </div>
      </div>
    </div>
  )
}

export default ModalAlert;
