import React from 'react';
import ReactDOM from 'react-dom';
/* eslint-disable */
import './css/index.scss';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import FullscreenProvider from './context/FullscreenContext';
import 'font-awesome/css/font-awesome.min.css';
ReactDOM.render(
	<BrowserRouter>
		<FullscreenProvider>
			<App />
		</FullscreenProvider>
	</BrowserRouter>,
	document.getElementById('root')
);

registerServiceWorker();
