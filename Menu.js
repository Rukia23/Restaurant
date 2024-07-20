import React from 'react';
import '../App.css';

const menuItems = [
  {
    imgSrc: '/images/Screenshot_20240615_163742_Google.jpg',
    name: 'Ugali Samaki Na Mbogamboga',
    price: 'Tzs10,000',
  },
  {
    imgSrc: '/images/Screenshot_20240615_172803_Google.jpg',
    name: 'Pilau Kuku',
    price: 'Tzs25,000',
  },
  {
    imgSrc: '/images/Screenshot_20240615_173502_Google.jpg',
    name: 'Kisinia',
    price: 'Tzs35,000',
  },
  {
    imgSrc: '/images/Screenshot_20240615_205517_Google.jpg',
    name: 'Pizza',
    price: 'Tzs20,000',
  },
  {
    imgSrc: '/images/Screenshot_20240615_210418_Google.jpg',
    name: 'Cooked Rice',
    price: 'Tzs6,000',
  },
  {
    imgSrc: '/images/Screenshot_20240615_211008_Google.jpg',
    name: 'Biryani',
    price: 'Tzs9,000',
  },
  {
    imgSrc: '/images/Screenshot_20240615_214036_Google.jpg',
    name: 'Mixed Bites',
    price: 'Tzs25,000',
  },
  {
    imgSrc: '/images/Screenshot_20240615_214348_Google.jpg',
    name: 'Ndizi Nyama',
    price: 'Tzs5,000',
  },
];

const Menu = () => {
  return (
    <div className="menu-section">
      {menuItems.map((item, index) => (
        <div key={index} className="menu-item">
          <img src={item.imgSrc} alt={item.name} />
          <h3>{item.name}</h3>
          <p className="price">{item.price}</p>
        </div>
      ))}
      <div className="container">
        <a href="/order" className="btn">Order Now</a>
      </div>
      <div className="container">
        <a href="/reservation" className="btn">Make Reservation</a>
      </div>
    </div>
  );
};

export default Menu;
