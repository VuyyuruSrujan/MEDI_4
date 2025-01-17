import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Array "mo:base/Array";

actor {
 
  public type UserRole = {
    user_Prin:Principal;
    role:Nat64;
  };

  public type DoctorRegistration = {
    name:Text;
    email:Text;
    medical_license_number:Text;
    specialization:Text;
    years_of_experience:Nat64;
    role:Nat64;
    prin:Principal;
  };
  
  var user_role:[UserRole] = [];
  public func GetUserRole(det:UserRole): async Text{
    user_role:=Array.append<UserRole>(user_role , [det]);
    return "OK";
  };

  public func DeleteUserRole():async Text{
    user_role:=[];
    return "users's role deleted";
  };

  public shared query func getUserRole(user_Prin:Principal) : async Nat64 {
   var answer = Array.find<UserRole>(user_role , func x = x.user_Prin == user_Prin);
   switch(answer) {
    case(?found){ 
      return found.role 
    };
    case(null){
      return 0 
    };
   };
  };


  var doc_reg:[DoctorRegistration] = [];

  public func SetDoctor(doc_det:DoctorRegistration):async Text {
    doc_reg:= Array.append<DoctorRegistration>(doc_reg , [doc_det]);
    return "OK";
  };

  public shared query func getDoctordet(prin:Principal): async ?DoctorRegistration{
    return Array.find<DoctorRegistration>(doc_reg , func x=x.prin == prin);
  };

  public shared query func getDoctorNm(prin:Principal): async Text{
    var answer = Array.find<DoctorRegistration>(doc_reg , func x=x.prin == prin);
    switch(answer) {
      case(?found) { 
        return found.name;
       };
      case(null) {
        return "null";
       };
    };
  };

  public func Delete_Doctors_Registrations():async Text {
    doc_reg:=[];
    return "Deleted";
  };

  public type PatientRegistration = {
    name:Text;
    email:Text;
    dob:Text;
    blood_grp:Text;
    address:Text;
    prin:Principal;
  };

  var patient_reg:[PatientRegistration] = [];

  public func Patient_Registration_function(det:PatientRegistration):async Text{
    patient_reg:= Array.append<PatientRegistration>(patient_reg , [det]);
    return "OK";
  };
  public shared query func getPatientDetails(prin:Principal): async ?PatientRegistration{
    return Array.find<PatientRegistration>(patient_reg , func x=x.prin == prin);
  };

  public func DeletePatientDetails():async Text {
    patient_reg:= [];
    return "Patient Data Deleted";
  };

  public type PharmacistRegistration = {
    name :Text;
    email:Text;
    pharmacy_license_number : Text;
    pharmacy_name:Text;
    pharmacy_address:Text;
    prin:Principal;
  };

  var pharm_reg:[PharmacistRegistration] = [];
  public func getPharmacistRegistartion(det:PharmacistRegistration): async Text {
    pharm_reg:= Array.append<PharmacistRegistration>(pharm_reg , [det]);
    return "OK";
  };

  public shared query func getPharmacistdetails(prin:Principal): async ?PharmacistRegistration{
    return Array.find<PharmacistRegistration>(pharm_reg , func x=x.prin == prin);
  };

  public func delete_Pharmacist_Details():async Text {
    patient_reg:= [];
    return "Patient Data Deleted";
  };

  public type PrescriptionDetails = {
    doctor_id:Principal;
    patient_id:Principal;
    diagnosis:Text;
    medicines:Text;
    additional_notes:Text;
    date:Text;
    doc_nm:Text;
  };

  var prescriptions:[PrescriptionDetails] = [];

  public func Prescription(pres:PrescriptionDetails): async Text {
    prescriptions:= Array.append<PrescriptionDetails>(prescriptions , [pres]);
    return"OK";
  };

  public shared query func getPresecriptions(patient_id:Principal) : async [PrescriptionDetails]{
    return Array.filter<PrescriptionDetails>(prescriptions , func x = x.patient_id == patient_id);
  };
  public shared query func getdate(patient_id:Principal) : async Text{
    var answer =  Array.find<PrescriptionDetails>(prescriptions , func x = x.patient_id == patient_id);
    switch(answer) {
      case(?found) { 
        return found.date;
       };
      case(null) { 
        return "not ok";
       };
    };
  };

  

};
