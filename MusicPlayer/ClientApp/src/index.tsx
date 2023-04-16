import 'bootstrap/dist/css/bootstrap.css';
import './Assets/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.getElementById('root');

if (root) {
  const rootElement = ReactDOM.createRoot(root);
  rootElement.render(<App />);
} else {
  console.error("Could not find element with ID 'root'");
}