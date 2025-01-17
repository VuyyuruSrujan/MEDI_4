import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RegistrationForm from './RegistrationForm';
import './Registration.css';
import { getGlobalPrincipal } from './Global';
import { Principal } from '@dfinity/principal';
import { Medi_backend } from '../../declarations/Medi_backend';
import { useNavigate } from 'react-router-dom';

function PatientRegistration() {
    var navigate = useNavigate();
    const principall = getGlobalPrincipal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    bloodGroup: '',
    address: ''
  });

  useEffect(() => {
    async function verify() {
      try {
        if (!principall) {
          console.error("Principal ID is missing");
          return;
        }
  
        // Fetching patient details from the backend
        const check = await Medi_backend.getPatientDetails(Principal.fromText(principall));
        console.log("Patient Details:", check);
  
        // Check if the principal exists in the returned array
        const isVerified = check.some(
          (record) => record.prin && record.prin.toText() === principall
        );
  
        if (isVerified) {
          console.log("Verification passed, navigating to /patient");
          navigate('/patient');
        } else {
          console.log("Verification failed, staying on current page");
        }
      } catch (error) {
        console.error("Error in verify:", error);
      }
    }
  
    verify();
  }, [principall]); // Add principall as a dependency if it can change
  

  async function handleSubmit(){
    event.preventDefault();
    console.log('Patient registration:', formData);

    try {
        var PatientRegistration = {
            name:formData.name,
            email:formData.email,
            dob:(formData.dateOfBirth),
            blood_grp:formData.bloodGroup,
            address:formData.address,
            prin:Principal.fromText(principall)
          };
          console.log("PatientRegistration , before pushing",PatientRegistration);
          var answer = await Medi_backend.Patient_Registration_function(PatientRegistration);
          console.log("answer , after pushing", answer);
          if(answer == "OK"){
            navigate('/patient', {replace:true})
          }
    } catch (error) {
        console.log("error",error)
    }

    try {
      var UserRole = {
        user_Prin:Principal.fromText(principall),
        role:BigInt(2)
      };
      console.log("user Roel before pushing:",UserRole);
      var pushing = await Medi_backend.GetUserRole(UserRole);
      console.log("after pushing",pushing);
    } catch (error) {
      console.log("error :",error);
    }

  };

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
    { name: 'bloodGroup', label: 'Blood Group', type: 'text' },
    { name: 'address', label: 'Address', type: 'textarea' }
  ];

  return (
    <div className="registration-page container">
      <motion.h1 
        className="neon-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Patient Registration
      </motion.h1>
      <RegistrationForm 
        fields={fields}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        userType="patient"
      />
    </div>
  );
}

export default PatientRegistration;