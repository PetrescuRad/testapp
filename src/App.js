import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import DisplayData from './DisplayData';
import SubmitForm from './SubmitForm';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<DisplayData />} />
            <Route path="/form" element={<SubmitForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};


export default App;
