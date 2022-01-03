import React, { useState, useEffect, lazy } from 'react';
// import xx from '../static/xx.png'
import { HashRouter, Switch, Route } from 'react-router'
// const One = lazy(() => import('./com/one.jsx'))
// const Two = lazy(() => import('./com/two.jsx'))
import One from './com/one.jsx'
import Two from './com/two.jsx'
const App = (props) => {

    return <Switch>
        <Route exact path='/' render={props => {
            return <One {...props} />
        }} />
        <Route path='/aa' render={props => {
            return <Two {...props} />
        }} />

    </Switch>


}
export default App