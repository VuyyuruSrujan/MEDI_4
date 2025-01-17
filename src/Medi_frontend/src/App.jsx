import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';
import DoctorRegistration from './DoctorRegistration';
import PatientRegistration from './PatientRegistration';
import Profile from './Profile';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/register/doctor" element={<DoctorRegistration />} />
          <Route path="/register/patient" element={<PatientRegistration />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;