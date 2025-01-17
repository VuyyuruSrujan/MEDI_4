import { useEffect, useState } from "react";
import { getGlobalPrincipal } from './Global';
import { Principal } from "@dfinity/principal";
import { Medi_backend } from '../../declarations/Medi_backend';
import { useNavigate } from "react-router-dom";
import './Profile.css'
import Footer from "./Footer";

export default function Profile(){
    const [prin , setprin] = useState("");
    const [role , setrole] = useState([""]);
    const [heading , setheading] = useState("");
    const navigate = useNavigate();
    const principall = getGlobalPrincipal();
    const [his_data , sethis_data] = useState([]);

    useEffect(()=>{
        get_pricipal(principall);
        getuserRole();
        History();
    }, [principall])
    function get_pricipal(principall){
        if(!principall){
            setprin("connect to internet identity");
        }else{
            setprin(principall);
        };
    };

    async function getuserRole(){
        try {
            var prin = localStorage.getItem("principal")
            if(!prin){
                setrole("--")
            }else{
            var ans = await Medi_backend.getUserRole(Principal.fromText(prin))
            console.log("ans:",ans)
            if(Number(ans) == 1){
                setrole("Doctor");
                setheading("DOCTOR PROFILE")
            }else if(Number(ans) == 2){
                setrole("Patient");
                setheading("PATIENT PROFILE");
            }else if(Number(ans) == 0){
                setrole("you are not regitered for any role");
            }
        }
        } catch (error) {
            console.log("role checking;",error)
        }
    }
    async function History() {
        try {
            console.log("Principal", principall);
            const answer = await Medi_backend.getPresecriptions(Principal.fromText(principall));
            console.log("before for loop", answer);
    
            const filteredPrescriptions = answer.filter(
                (prescription) =>
                    prescription.patient_id.toText() === principall || 
                    prescription.doctor_id.toText() === principall
            );
    
            console.log("after filtering", filteredPrescriptions);
            sethis_data(filteredPrescriptions);
        } catch (error) {
            console.log("error:", error);
        }
    }
    

    return(
        <>
        <div>
            <center><h1>{heading}</h1></center>
        </div>
        <div>
            <h1>Details:</h1>
            <p><b>Prinicpal:</b>{prin}</p>
            <p><b>Role:</b>{role}</p>
        </div>
        <div>
    <h1>History:</h1>
    <div>
        {his_data.map((filtered, index) => {
            const istDate = new Date(filtered.date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
            return (
                    <div key={index} id="history_data">
                        <p><b>Doctor id:</b> {filtered.doctor_id.toText()}</p>
                        <p><b>Patient id:</b> {filtered.patient_id.toText()}</p>
                        <p><b>Date:</b> {istDate}</p>
                        <p><b>Diagnosis:</b>{filtered.diagnosis}</p>
                    </div>
                );
            })}
        </div>
    </div>
    <Footer />
        </>
    );
}