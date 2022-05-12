import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import configureStore from './redux/reducers/configureStore';

const container = document.getElementById('root')
const root = createRoot(container); 
const store = configureStore();
root.render(<Provider store={store}><App/></Provider>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
