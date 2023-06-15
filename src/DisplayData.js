import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayData = () => {
  const [data, setData] = useState([]);
  const [totalBTC, setTotalBTC] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    calculateTotalBTC();
  }, [data]);
  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/trades');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteTrade = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/trades/${id}`);
      fetchData(); // Refresh data after successful deletion
    } catch (error) {
      console.error('Error deleting trade:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const calculateTotalBTC = () => {
    let total = 0;
    for (const trade of data) {
      total += parseFloat(trade.BTC);
    }
    setTotalBTC(total);
  };

  const calculateSumPartial = () => {
    let sum = 0;
    data.forEach((trade) => {
      const partial = (trade.BTC / totalBTC) * trade.BuyPrice;
      sum += partial;
    });
    return sum.toFixed(2); // Optional: Round the sum to 2 decimal places
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Trade List</h2>
      <div align="right" className="mb-4">
        <strong>Total BTC:</strong> {totalBTC}
      </div>
      <div align="right" className="mb-4">
        <strong>Average Price:</strong> {calculateSumPartial()}
    </div>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-2 text-center">Date</th>
            <th className="py-2 text-center">Time</th>
            <th className="py-2 text-center">CAD to USD</th>
            <th className="py-2 text-center">Online Price</th>
            <th className="py-2 text-center">Buy Price</th>
            <th className="py-2 text-center">Spread</th>
            <th className="py-2 text-center">Amt Paid</th>
            <th className="py-2 text-center">Weekly Amt</th>
            <th className="py-2 text-center">BTC</th>
            <th className="py-2 text-center">Partial</th>
            <th className="py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((trade) => (
            <tr key={trade.Date}>
              <td className="py-2 text-center">{formatDate(trade.Date)}</td>
              <td className="py-2 text-center">{trade.Time}</td>
              <td className="py-2 text-center">{trade.CADtoUSD}</td>
              <td className="py-2 text-center">{trade.OnlinePrice}</td>
              <td className="py-2 text-center">{trade.BuyPrice}</td>
              <td className="py-2 text-center">{((trade.BuyPrice / trade.OnlinePrice) - 1).toFixed(7)}</td>
              <td className="py-2 text-center">{trade.AmtPaid}</td>
              <td className="py-2 text-center">{trade.WeeklyAmt}</td>
              <td className="py-2 text-center">{trade.BTC}</td>
              <td className="py-2 text-center">{((trade.BTC/totalBTC)*trade.BuyPrice).toFixed(4)}</td>
              <td className="py-2 text-center">
                <button
                  onClick={() => handleDeleteTrade(trade.Date)}
                  className="bg-red-600 hover:bg-red-700 text-white rounded px-4 py-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default DisplayData;
