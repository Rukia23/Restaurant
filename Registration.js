import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Registration = () => {
  const initialFormData = {
    username: '',
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
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

    try {
      const response = await axios.post('http://localhost:8080/api/registration', formData);

      if (response.status === 201) {
        setSuccessMessage('Registration successful! Please log in.');
        setFormData(initialFormData);
        setTimeout(() => {
          navigate('/menu');
        }, 2000);
      } else {
        setError('Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Failed to register. Please try again.');
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/regitration/${id}`);
      console.log('Registration deleted:', response.data);
      
    } catch (error) {
      console.error('Error deleting registration:', error);
    
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/registration/${id}`, updatedData);
      console.log('Registration updated:', response.data);
    
    } catch (error) {
      console.error('Error updating registration:', error);
    
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn-register" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
