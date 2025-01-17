import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './DoctorDashboard.css';
import { Medi_backend } from '../../declarations/Medi_backend';
import { getGlobalPrincipal } from './Global';
import { Principal } from '@dfinity/principal';
import { useNavigate } from 'react-router-dom';
import { LifeLine } from 'react-loading-indicators';

function DoctorDashboard() {
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();
  const principall = getGlobalPrincipal();
  const [prescription, setPrescription] = useState({
    patientId: '',
    diagnosis: '',
    medicines: '',
    notes: ''
  });
  useEffect(()=>{
    try {
      if (!principall) {
        console.error('Principal ID is missing');
        navigate('/')
      }
    } catch (error) {
      console.log("error",error);
    }
  })

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true); // Show the loading animation

    try {
      if (!principall) {
        alert('Connect to Internet Identity');
      } else {
        const PrescriptionDetails = {
          doctor_id: Principal.fromText(principall),
          patient_id: Principal.fromText(prescription.patientId),
          diagnosis: prescription.diagnosis,
          medicines: prescription.medicines,
          additional_notes: prescription.notes,
          date: new Date().toISOString(),
          doc_nm: await Medi_backend.getDoctorNm(Principal.fromText(principall)),
        };
        console.log("Before pushing", PrescriptionDetails);

        const answer = await Medi_backend.Prescription(PrescriptionDetails);
        console.log("Answer:", answer);

        if (answer === "OK") {
          alert("Successfully submitted");
          navigate('/profile');
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Hide the loading animation
    }
  }

  return (
    <div className="doctor-dashboard container">
      <motion.h1 
        className="neon-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Doctor's Dashboard
      </motion.h1>

      {isLoading ? (
        <div className="loading-container">
         <center> <LifeLine color="#32cd32" size="large" text="Submitting..." textColor="#e380de" /> </center>
        </div>
      ) : (
        <motion.form 
          className="prescription-form"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>Patient ID</label>
            <input
              type="text"
              value={prescription.patientId}
              onChange={(e) => setPrescription({ ...prescription, patientId: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Diagnosis</label>
            <textarea
              value={prescription.diagnosis}
              onChange={(e) => setPrescription({ ...prescription, diagnosis: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Medicines</label>
            <textarea
              value={prescription.medicines}
              onChange={(e) => setPrescription({ ...prescription, medicines: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Additional Notes</label>
            <textarea
              value={prescription.notes}
              onChange={(e) => setPrescription({ ...prescription, notes: e.target.value })}
            />
          </div>

          <motion.button 
            type="submit" 
            className="btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Prescription
          </motion.button>
        </motion.form>
      )}
    </div>
  );
}

export default DoctorDashboard;
