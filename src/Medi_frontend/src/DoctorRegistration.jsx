import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RegistrationForm from './RegistrationForm';
import './Registration.css';
import { Medi_backend } from '../../declarations/Medi_backend';
import { getGlobalPrincipal } from './Global';
import { Principal } from '@dfinity/principal';
import { useNavigate } from 'react-router-dom';
import { LifeLine } from 'react-loading-indicators'; // Ensure you install the 'react-load-animations' package or replace this with your preferred animation library.

function DoctorRegistration() {
  const navigate = useNavigate();
  const principall = getGlobalPrincipal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    licenseNumber: '',
    specialization: '',
    experience: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function checkingFun() {
      try {
        if (!principall) {
          console.error('Principal ID is missing');
          navigate('/')
          return;
        }

        const verification = await Medi_backend.getDoctordet(Principal.fromText(principall));
        console.log('verification', verification);

        const isVerified = verification.some(
          (record) => record.prin && record.prin.toText() === principall
        );

        if (isVerified) {
          console.log('Verification passed, navigating to /doctor');
          navigate('/doctor');
        } else {
          console.log('Verification failed, staying on current page');
        }
      } catch (error) {
        console.error('Error in checkingFun:', error);
      }
    }

    checkingFun();
  }, [principall]);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    console.log('Doctor registration:', formData);

    try {
      const DoctorRegistration = {
        name: formData.name,
        email: formData.email,
        medical_license_number: formData.licenseNumber,
        specialization: formData.specialization,
        years_of_experience: BigInt(formData.experience),
        role: BigInt(1),
        prin: Principal.fromText(principall),
      };

      console.log('DoctorRegistration , before pushing', DoctorRegistration);
      const answer = await Medi_backend.SetDoctor(DoctorRegistration);
      console.log('after pushing', answer);

      if (answer === 'OK') {
        navigate('/doctor', { replace: true });
      }
    } catch (error) {
      console.error('Error during doctor registration:', error);
    }

    try {
      const UserRole = {
        user_Prin: Principal.fromText(principall),
        role: BigInt(1),
      };
      console.log('UserRole before pushing:', UserRole);
      const pushing = await Medi_backend.GetUserRole(UserRole);
      console.log('After pushing UserRole', pushing);
    } catch (error) {
      console.error('Error during user role registration:', error);
    }

    setIsLoading(false); // Hide loading animation
  }

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'licenseNumber', label: 'Medical License Number', type: 'text' },
    { name: 'specialization', label: 'Specialization', type: 'text' },
    { name: 'experience', label: 'Years of Experience', type: 'number' },
  ];

  return (
    <div className="registration-page container">
      <motion.h1
        className="neon-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Doctor Registration
      </motion.h1>

      {isLoading ? ( // Show loading animation when isLoading is true
        <div className="loading-container">
         <center> <LifeLine color="#32cd32" size="large" text="" textColor="#e380de" /> </center>
        </div>
      ) : (
        <RegistrationForm
          fields={fields}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          userType="doctor"
        />
      )}
    </div>
  );
}

export default DoctorRegistration;
