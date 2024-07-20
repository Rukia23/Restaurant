import React from 'react';
import '../App.css';

const teamMembers = [
  {
    imgSrc: '/images/Screenshot_20240616_180714_Gallery.jpg',
    name: 'Rukia Ally',
    role: 'Founder & CEO',
  },
  {
    imgSrc: '/images/Screenshot_20240616_180626_Gallery.jpg',
    name: 'Rahma Ally',
    role: 'Head Chef',
  },
  {
    imgSrc: '/images/Screenshot_20240616_180843_Gallery.jpg',
    name: 'Rumaytha Ali',
    role: 'Marketing Manager',
  },
];

const AboutUs = () => {
  return (
    <div>
      <section className="about-section">
        <div className="container">
          <h1>About Us</h1>
          <p>Welcome to our online restaurant services system, where we connect food lovers with their favorite local restaurants. We strive to bring you the best dining experience from the comfort of your home.</p>
        </div>
      </section>
      <section className="container">
        <h2>Our Mission</h2>
        <p>Our mission is to provide a seamless and enjoyable dining experience for our customers, while supporting local restaurants and food businesses. We aim to offer a wide variety of cuisines to cater to all tastes and preferences.</p>
      </section>
      <section className="container">
        <h2>Meet the Team</h2>
        <div className="team">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <img src={member.imgSrc} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="container contact-info">
        <h2>Contact Us</h2>
        <p>Have any questions or feedback? Feel free to reach out to us!</p>
        <p>Email: 200rukiaally@gmail.com</p>
        <p>Phone: 0623787027</p>
        <p>Address: Foodie Lane, Zanzibar City</p>
      </section>
    </div>
  );
};

export default AboutUs;
