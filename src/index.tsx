import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import {green, grey} from "@material-ui/core/colors";


const theme = createTheme({
   palette: {
      primary: {
         main: '#ea80fc',
         dark: '#ea80fc',

      },
      secondary: {
         main: '#ea80fc',
         dark: '#ea80fc'
      },
      error: {
         main: '#bc80fc',
         dark: '#bc80fc'
      },
     
      type: "dark"
   },


})


ReactDOM.render(
  <ThemeProvider theme={theme}>
     <CssBaseline/>
     <App/>
  </ThemeProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
