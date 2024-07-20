import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Reservation = () => {
  const initialFormData = {
    fullName: '',
    email: '',
    phoneNumber: '',
    reservationDate: '',
    reservationTime: '',
    numberOfGuests: '1',
    specialRequests: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/reservations', formData);
      console.log('Reservation submitted:', response.data);
      alert('Reservation Creation successfully!');
      setFormData(initialFormData); 
      setError(null); 
      navigate('/'); 
    } catch (error) {
      console.error('Error creating reservation:', error);
      setError('Failed to create reservation. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/reservations/${id}`);
      console.log('Reservation deleted:', response.data);
    
    } catch (error) {
      console.error('Error deleting reservation:', error);
    
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/reservations/${id}`, updatedData);
      console.log('Reservation updated:', response.data);
    
    } catch (error) {
      console.error('Error updating reservation:', error);
    
    }
  };

  return (
    <div className="reservation">
      <h2>Make a Reservation</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reservationDate">Reservation Date</label>
          <input
            type="date"
            id="reservationDate"
            name="reservationDate"
            value={formData.reservationDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reservationTime">Reservation Time</label>
          <input
            type="time"
            id="reservationTime"
            name="reservationTime"
            value={formData.reservationTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numberOfGuests">Number of Guests</label>
          <select
            id="numberOfGuests"
            name="numberOfGuests"
            value={formData.numberOfGuests}
            onChange={handleChange}
            required
          >
            {[...Array(10).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="specialRequests">Special Requests</label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            rows="4"
            value={formData.specialRequests}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <button type="submit">Reserve </button>
        </div>
      </form>
      <div className="container">
        <a href="/" className="btn">
          Back To Homepage
        </a>
      </div>
    </div>
  );
};

export default Reservation;
