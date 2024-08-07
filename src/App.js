// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './components/Forms';
import Uploadresume from './components/Uploadresume';
import Selectionresume from './components/Selectionresume';
import 'react-quill/dist/quill.snow.css';
import './index.css'
import Paymentpage from './components/Paymentpage';

function App() {
  
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/form" element={<Form />} />
          <Route path="/" element={<Selectionresume />} />
          <Route path="/uploadresume" element={<Uploadresume />} />
          <Route path="/paymentpage" element={<Paymentpage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
