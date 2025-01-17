import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaUserMd, FaUser, FaPills } from 'react-icons/fa';
import './Navbar.css';
import { AuthClient } from "@dfinity/auth-client";
import { useState, useEffect } from 'react';
import { Medi_backend } from 'declarations/Medi_backend';
import { Principal } from '@dfinity/principal';
import { useNavigate } from 'react-router-dom';
import { setGlobalPrincipal, getGlobalPrincipal, clearGlobalPrincipal } from './Global';

function Navbar() {
  const [principal, setPrincipal] = useState(getGlobalPrincipal() || "");
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  async function ConnectFun() {
    const authClient = await AuthClient.create();
    authClient.login({
      maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: async () => {
        const identity = await authClient.getIdentity();
        const newPrincipal = identity.getPrincipal().toText();
        setPrincipal(newPrincipal);
        setGlobalPrincipal(newPrincipal);
        localStorage.setItem("principal",newPrincipal);
        navigate('/')
      },
    });
  }

  async function handleLogout() {
    const authClient = await AuthClient.create();
    authClient.logout(); 
    setPrincipal("");
    clearGlobalPrincipal();
    localStorage.removeItem("principal");
    navigate('/');
  }

  useEffect(() => {
    async function init() {
      const authClient = await AuthClient.create();
      if (await authClient.isAuthenticated()) {
        const identity = await authClient.getIdentity();
        const newPrincipal = identity.getPrincipal().toText();
        setPrincipal(newPrincipal);
        setGlobalPrincipal(newPrincipal); 
        localStorage.setItem("principal",newPrincipal);
        navigate('/')
      }else{
        localStorage.removeItem("principal");
      }
    }
    init(); 
  }, []); 

  
  useEffect(() => {
    async function getUserRole() {
      if (!principal) return; 
      const answer = await Medi_backend.getUserRole(Principal.fromText(principal));
      console.log(answer);
      if (BigInt(answer) === 0) {
        console.log("You are not registered");
      } else if (BigInt(answer) === 1) {
        navigate('/doctor');
      } else if (BigInt(answer) === 2) {
        navigate('/patient');
      } else if (BigInt(answer) === 3) {
        navigate('/pharmacy');
      }
    }
    if (principal) {
      getUserRole();
    } else {
      console.log("Connect to internet identity");
    }
  }, [principal, navigate]);

  async function DocCheckConnect(){
    try {
        console.log("principall",principal)
        if (principal != null && principal !== ""){
          var roleRevise = await Medi_backend.getUserRole(Principal.fromText(principal));
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
  // try {
  //     console.log(principal);
  //     if (principal != null && principal !== ""){
  //       var roleRevise = await Medi_backend.getUserRole(Principal.fromText(principal));
  //   console.log("roleRevise",roleRevise);
  //   if(roleRevise == 2 || roleRevise == 0){
      navigate('/register/patient');
    // }else{
    //   alert("you are not patient")
    // }
    //   }else{
    //     alert("connect to internet identity");
    //   }
    // } catch (error) {
    //   console.log("error",error);
    // }
  };

  function ProfilePage(){
    if(!principal){
      alert("connect to internet identity")
    }else{
      navigate('/profile')
    }
  }

  return (
    <motion.nav
    className="navbar"
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="container nav-container">
      <motion.div className="logo" whileHover={{ scale: 1.1 }}>
        <Link to="/">MediTrack</Link>
      </motion.div>
      <button 
        className="menu-toggle" 
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <motion.li whileHover={{ scale: 1.1 }}>
          <Link to="/"><FaHome /> Home</Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <p onClick={DocCheckConnect}><FaUserMd /> Doctor</p>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <p onClick={PatientCheck}><FaUser /> Patient</p>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <p onClick={ProfilePage}>Profile</p>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <button onClick={principal ? handleLogout : ConnectFun} id="Connectbtn">
           <center> {principal ? "Logout" : "Connect"} </center>
          </button>
        </motion.li>
      </ul>
    </div>
  </motion.nav>
  );
}

export default Navbar;
