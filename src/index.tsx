import React from 'react';
import ReactDOM from 'react-dom';
import LogRocket from 'logrocket';

import { RecoilRoot } from 'recoil';
import { ChakraProvider } from '@chakra-ui/core';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { theme } from '@chakra-ui/core';
import { merge } from '@chakra-ui/utils';

LogRocket.init('9aapdz/life-calendar');

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

const DefaultDataStr = `
{
    "events": [
        {
            "type": 1,
            "date": "1982-01-01",
            "title": "👶 I was born"
        },
        {
            "type": 1,
            "date": "1984-01-01",
            "title": "🎂 My 2nd birthday"
        }
    ]
}`.trim();
let dataStr = localStorage.getItem('data');
if (!dataStr) {
  localStorage.setItem('data', DefaultDataStr);
  dataStr = DefaultDataStr;
}

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={customTheme}>
      <RecoilRoot>
        <App dataString={dataStr} />
      </RecoilRoot>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
