import { motion } from 'framer-motion';
import './Home.css';
import { getGlobalPrincipal } from './Global';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Principal } from '@dfinity/principal';
import { Medi_backend } from '../../declarations/Medi_backend';
import Footer from './Footer';
import {  FaUserMd, FaUser, FaPills } from 'react-icons/fa';


function Home() {
  const principall = getGlobalPrincipal();
  const navigate = useNavigate();

  useEffect(()=>{
    console.log("principal",principall);
    navigate("/");
  },[])
  async function DocCheckConnect(){
    try {
      console.log("principall",principall)
      if (principall != null && principall !== ""){
        var roleRevise = await Medi_backend.getUserRole(Principal.fromText(principall));
        console.log("roleRevise",roleRevise);
        if(roleRevise == 1 || roleRevise == 0){
          navigate('/register/doctor')
        }else{
          alert("you are not a doctor")
        }
      }else{
        alert("connect to internet identity");
      }
    } catch (error) {
      console.log("error",error);
    }

  }
  async function PatientCheck(){
    try {
      console.log(principall);
      if (principall != null && principall !== ""){
        var roleRevise = await Medi_backend.getUserRole(Principal.fromText(principall));
    console.log("roleRevise",roleRevise);
    if(roleRevise == 2 || roleRevise == 0){
      navigate('/register/patient');
    }else{
      alert("you are not patient")
    }
      }else{
        alert("connect to internet identity");
      }
    } catch (error) {
      console.log("error",error);
    }
    
  }

  function PharmaConnect(){
    var principal = localStorage.getItem("principal");
    if(!principal){
      alert("connect to internet identity");
    }else{
      navigate('/profile')
    }
  }

  return (
    <div className="home">
      <motion.div 
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container">
          <motion.h2 
            className="neon-text"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to MediTrack
          </motion.h2>
          <motion.p
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4 }} >
            Connecting Doctors, Patients, and Pharmacies for Secure Healthcare records
          </motion.p>
        </div>
      </motion.div>

      <div className="features container" id='featurescontainer'>
        <motion.div 
          className="feature-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* <img src="/doctor.jpg" alt="Doctor" /> */}
          <h2><FaUserMd/><br/> FOR DOCTORS</h2>
          <p>Manage patient records and prescriptions efficiently</p><br />
          <button className="btn" onClick={DocCheckConnect}>Register as Doctor</button>
        </motion.div>

        <motion.div 
          className="feature-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {/* <img src="/patient.jpg" alt="Patient" /> */}
          <h2><FaUser /><br/>FOR PATIENTS</h2>
          <p>Access your medical history and prescriptions anytime</p><br />
          <button className="btn" onClick={PatientCheck}>Register as Patient</button>
        </motion.div>
        <motion.div 
          className="feature-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {/* <img src="/pharmacy.jpg" alt="Pharmacy" /> */}
          <h2><FaPills /><br/>MEDICAL HISTORY</h2>
          <p>Check your interaction with doctors and complete history</p><br />
          <button className="btn" onClick={PharmaConnect}>CHECK HISTORY</button>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
