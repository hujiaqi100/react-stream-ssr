// import React from 'react';
import ReactDom from 'react-dom'
// import Start from './Router/index.jsx'
import './index.less';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import '../node_modules/antd/dist/antd.css'
// import reg from './registrer.js'
import App from './App.jsx'
ReactDom.hydrate(
    <BrowserRouter >
        <App />
    </BrowserRouter>,
    document.getElementById('app')
)