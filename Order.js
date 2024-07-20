import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Order = () => {
  const initialFormData = {
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    orderDetails: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);
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
    try {
      const response = await axios.post('http://localhost:8080/api/orders', formData);
      console.log('Order placed:', response.data);
      alert('Order placed successfully!');
      setFormData(initialFormData); 
      setError(null); 
      navigate('/'); 
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order. Please try again.'); 
    }
  };

  
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/orders/${id}`);
      console.log('Order deleted:', response.data);
      
    } catch (error) {
      console.error('Error deleting order :', error);
  
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/orders/${id}`, updatedData);
      console.log('Order updated:', response.data);
      
    } catch (error) {
      console.error('Error updating order:', error);
      
    }
  };



  return (
    <div className="container">
      <h2>Order Page</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="orderDetails">Order Details:</label>
          <textarea
            id="orderDetails"
            name="orderDetails"
            value={formData.orderDetails}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Order;
