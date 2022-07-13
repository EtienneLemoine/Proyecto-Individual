import './App.css';
import React from 'react';
import LandingPage from './Components/LandingPage/LandingPage';
import { Route } from 'react-router-dom'
import Home from './Components/Home/Home.jsx'
import Details from './Components/Details/Details.jsx'
import ListFilter from './Components/ListFilter/ListFilter.jsx'
import Send from './Components/Send/send.jsx'

function App() {
  return (
    <div className="App">
      <Route exact path= "/" component={LandingPage}></Route>
      <Route exact path= "/Home" component={Home}></Route>
      <Route path= "/Details/:id" component={Details}></Route>
      <Route path= "/Home/Search" component={ListFilter}></Route>
      <Route path= "/Create" component={Send}></Route>
    </div>
  )
}

export default App;
