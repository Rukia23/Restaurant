import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <Link to="/registration">Registration</Link>
      <Link to="/menu">Menu</Link>
      <Link to="/order">Order</Link>
      <Link to="/reservation">Reservation</Link>
      <Link to="/about-us">About Us</Link>
    </nav>
  );
};

export default Navigation;