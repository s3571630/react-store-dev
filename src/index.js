import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './pages/App';
import './css/style.scss';
import './css/app.scss';
import './commons/auth';

ReactDOM.render(
    // ToastContainer包進去就可以
    <div>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        <Router />
    </div>,
    document.getElementById('root')
);
