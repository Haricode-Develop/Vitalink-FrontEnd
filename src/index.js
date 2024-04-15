import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Modal from 'react-modal';

import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const rootElement = document.getElementById('root');
Modal.setAppElement(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();