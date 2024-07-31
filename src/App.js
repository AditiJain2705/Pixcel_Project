import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';
import CustomerMaster from './components/CustomerMaster';
function App() {

  return (
    <Router>
      <div className="App">
       <CustomerMaster/>
       {/* Router component provides routing capabilities*/}
   <Routes>
    
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/edit/:id" element={<CustomerForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
