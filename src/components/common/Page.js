import React from 'react';
import './Page.scss';
import { ReactComponent as LogoHRIS } from '../../assets/images/logo-hris.svg';

const Page = ({ type, children }) => (
  <div className={`min-h-screen bg-white ${type === 'login' ? 'login relative flex items-center' : ''}`}>
    <span className={`absolute top-0 left-0 ${type === 'login' ? 'block' : 'hidden'}`}>
      <LogoHRIS className="fill-current text-white opacity-10" />
    </span>
    <span className={`absolute bottom-0 right-0 ${type === 'login' ? 'block' : 'hidden'}`}>
      <LogoHRIS className="fill-current text-white opacity-10" />
    </span>
    {children}
  </div>
);

export default Page;
