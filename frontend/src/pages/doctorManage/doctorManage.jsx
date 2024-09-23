import React from 'react';
import DoctorData from './doctorData';
import PatientRecords from './patientRecords';
import Button from "./button";
import Appointments from './appointments';
import PatientCommunication from './patientCommunication';


 
  
 
  
  const TabButton = ({ children, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 ${
        isActive ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800 hover:bg-green-200'
      }`}
    >
      {children}
    </button>
  );
  
  const HealthcareProviderDashboard = () => {
 
    const [activeTab, setActiveTab] = React.useState('doctor');
  
 
  
  
    return (
      <div className='bg-green-50 p-4'>
        <div className="p-4 m-32 font-sans bg-green-50 min-h-screen">
          <h1 className="text-3xl font-bold mb-6 text-green-800 animate-fade-in">
            Healthcare Provider Management 🩺
          </h1> 
          <div className="mb-6 space-x-2 flex flex-wrap justify-start">
            <TabButton isActive={activeTab === 'doctor'} onClick={() => setActiveTab('doctor')}>Doctor Information</TabButton>
            <TabButton isActive={activeTab === 'records'} onClick={() => setActiveTab('records')}>Patient Records</TabButton>
            <TabButton isActive={activeTab === 'appointments'} onClick={() => setActiveTab('appointments')}>Appointments</TabButton>
            <TabButton isActive={activeTab === 'communication'} onClick={() => setActiveTab('communication')}>Patient Communication</TabButton>
          </div>
          
          <div className="animate-fade-in">
            {activeTab === 'doctor' && (
           <DoctorData/>
            )}
            
  
            {activeTab === 'records' && (
          <PatientRecords/>
 
 )}
  
            {activeTab === 'appointments' && (
              <Appointments/>
            )}
  
            {activeTab === 'communication' && (


<PatientCommunication/>

)}
          </div>
        </div>
      </div>
    );
  };
  
  export default HealthcareProviderDashboard;