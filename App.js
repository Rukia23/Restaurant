import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Menu from './components/Menu';
import Order from './components/Order';
import Reservation from './components/Reservation';
import AboutUs from './components/AboutUs';
import Registration from './components/Registration'; 
import './App.css'; 

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Navigation />
        <Routes>
          <Route path="/menu" element={<Menu />} />
          <Route path="/order" element={<Order />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
