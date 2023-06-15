import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SubmitForm = () => {
  const [tradeData, setTradeData] = useState({
    Date: '',
    Time: '',
    CADtoUSD: '',
    OnlinePrice: '',
    BuyPrice: '',
    AmtPaid: '',
    WeeklyAmt: '',
    BTC: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTradeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8000/trades', tradeData); // Replace '/api/data' with the appropriate backend route
      // Handle success, e.g., show a success message or redirect to another page
      window.location.href = '/'; // Redirect to the data display page
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Submit Trade</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          name="Date"
          placeholder="Date"
          value={tradeData.Date}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="Time"
          placeholder="Time"
          value={tradeData.Time}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="CADtoUSD"
          placeholder="CAD to USD"
          value={tradeData.CADtoUSD}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="OnlinePrice"
          placeholder="Online Price"
          value={tradeData.OnlinePrice}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="BuyPrice"
          placeholder="Buy Price"
          value={tradeData.BuyPrice}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="AmtPaid"
          placeholder="Amount Paid"
          value={tradeData.AmtPaid}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="WeeklyAmt"
          placeholder="Weekly Amount"
          value={tradeData.WeeklyAmt}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="BTC"
          placeholder="BTC"
          value={tradeData.BTC}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitForm;
