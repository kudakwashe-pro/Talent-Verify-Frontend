import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Basic from './HomePage';
import BursarDashboard from '../Bursar/BursarDashboard/BursrDashboard';
import AdminDashboard from '../Admin/Dashboard/AdminDashboard';

export default class Main extends Component {
  render () {
    return (
      <BrowserRouter>

        <Routes>
          <Route path='/' Component={Basic}/>
        </Routes>

        <Routes>
          <Route path='/bursar' Component={BursarDashboard}/>
        </Routes>
        <Routes>
          <Route path='/admin' Component={AdminDashboard}/>
        </Routes>
      </BrowserRouter>
    )
  }
}
