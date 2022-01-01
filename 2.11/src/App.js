import React from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import PersonsData from './components/PersonsData.js';

function App() {
  return <Router>
    <Routes>
      <Route path="/persons" element={<PersonsData />} />
    </Routes>
  </Router>
}
 
export default App
