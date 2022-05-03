import { fontStyle } from '@mui/system';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom";
import DashBoard from './Components/Dashboard';
import Stats from './Components/Stats';
const styles = {
  float: 'left',
  color: '#f2f2f2',
  textAlign: 'center',
  padding: '14px 16px',
  textDecoration: 'none',
  fontSize: '17px'
}
function App() {
  return (
    <div className='app'> 
      <Router>
        <nav style={{backgroundColor: '#333',overflow: 'hidden',marginBottom:'10px'}}>
              <Link   style={styles} to="/dashboard">Dashboard</Link>
              <Link  style={styles} to="/stats">Stats</Link>
        </nav>
        <Routes>
          <Route path="/stats" element={<Stats />} />
          <Route path='/dashboard' element={<DashBoard />} />
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
