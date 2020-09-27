import React from 'react';
import ReactDOM from 'react-dom';

import { RecoilRoot } from 'recoil';
import { ChakraProvider } from '@chakra-ui/core';
import { AppContextProvider } from './utils/AppContext';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { theme } from '@chakra-ui/core';
import { merge } from '@chakra-ui/utils';

// 2. Extend the theme to include custom colors, fonts, etc.
const customTheme = merge(theme, {
  colors: {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac'
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={customTheme}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
