import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import LoginModal from './modals/LoginModal';
import RegisterModal from './modals/RegisterModal';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AuthProviderWrapper } from './context/authContext';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProviderWrapper>
        <Provider store={store}>
          <Toaster />
          <RegisterModal />
          <LoginModal />
          <App />
        </Provider>
      </AuthProviderWrapper>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root'),
);
