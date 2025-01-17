import { motion } from 'framer-motion';
import './PatientDashboard.css';
import { useEffect, useState } from 'react';
import { Medi_backend } from '../../declarations/Medi_backend';
import { getGlobalPrincipal } from './Global';
import { Principal } from '@dfinity/principal';
import { useNavigate } from 'react-router-dom';


function PatientDashboard() {
  var navigate = useNavigate();
  const principall = getGlobalPrincipal();
  const [prescriptions , setprescriptions] = useState([]);

  useEffect(() =>{
    if (!principall) {
      console.error('Principal ID is missing');
      navigate('/')
    }
    async function getPrescriptions(){
      var answer = await Medi_backend.getPresecriptions(Principal.fromText(principall));
      console.log("answer , prescription" , answer);
      setprescriptions(answer);
      console.log(answer);
      // console.log("Date being sent:", new Date().toISOString());
    };
    getPrescriptions();
  },[])


  return (
    <div className="patient-dashboard container">
      <motion.h1 
        className="neon-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        >
        Patient Dashboard
      </motion.h1>

      <div className="prescriptions-list">
        {prescriptions.map((prescription, index) => (
          <motion.div 
            key={prescription.id}
            className="prescription-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="prescription-header">
              <h3>{prescription.diagnosis}</h3>
              <span className="date">{new Date(prescription.date).toLocaleDateString()}</span>
            </div>
            <div className="prescription-details">
              <p><strong>Doctor:</strong> {prescription.doc_nm}</p>
              <p><strong>Medicines:</strong></p>
              <pre>{prescription.medicines}</pre>
              <p><strong>Notes:</strong></p>
              <p>{prescription.additional_notes}</p>
              
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default PatientDashboard;