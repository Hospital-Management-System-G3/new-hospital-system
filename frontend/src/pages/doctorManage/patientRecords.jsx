import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Weight } from "lucide-react";

function PatientRecords() {
  const [data, setData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/records");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatDate = (isoDate) => {
    const dateObject = new Date(isoDate);
    return dateObject.toISOString().split('T')[0];
  };

  const handleViewClick = useCallback(async (recordId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/records/${recordId}`);
      setSelectedPatient(response.data);
      setIsModalOpen(true);
      setIsEditing(false);
    } catch (error) {
      console.error("Error fetching patient details:", error);
      alert('Unable to fetch patient details.');
    }
  }, []);

  const handleEditClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSaveClick = useCallback(async (editedPatient) => {
    try {
      await axios.put(`http://localhost:5000/api/updaterecord/${editedPatient.record_id}`, editedPatient);
      setSelectedPatient(editedPatient);
      setIsEditing(false);
      fetchData();
    } catch (error) {
      console.error("Error updating patient details:", error);
      alert('Unable to update patient details.');
    }
  }, [fetchData]);

  const handleAdd = useCallback(() => {
    setIsAddModalOpen(true);
  }, []);

  const handleAddSave = useCallback(async (newPatient) => {
    try {
      await axios.post("http://localhost:5000/api/addrecord", newPatient);
      setIsAddModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error adding new patient:", error);
      alert('Unable to add new patient.');
    }
  }, [fetchData]);

  const Button = ({ children, onClick, className = "" }) => (
    <button
      className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  const Modal = ({ isOpen, onClose, patient, isEditing, onEdit, onSave }) => {
    const [editedPatient, setEditedPatient] = useState(patient);

    useEffect(() => {
      setEditedPatient(patient);
    }, [patient]);

    if (!isOpen || !patient) return null;

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedPatient(prev => ({ ...prev, [name]: value }));
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">{patient.username}'s Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem label="Email" value={patient.email} />
            <InfoItem label="Date of Birth" value={formatDate(patient.date_of_birth)} />
            <InfoItem label="Gender" value={patient.gender} />
            <InfoItem label="Phone" value={patient.phone} />
            {isEditing ? (
              <>
              temperature DECIMAL(4, 2) NOT NULL,
              blood_pressure INTEGER NOT NULL,
                <EditableInfoItem label="Medical History" name="medical_history" value={editedPatient.medical_history} onChange={handleInputChange} />
                <EditableInfoItem label="Treatment Plan" name="treatment_plan" value={editedPatient.treatment_plan} onChange={handleInputChange} />
                <EditableInfoItem label="Allergies" name="allergies" value={editedPatient.allergies} onChange={handleInputChange} />
                <EditableInfoItem label="Temperature" name="temperature" value={editedPatient.temperature} onChange={handleInputChange} />
                <EditableInfoItem label="Blood Pressure" name="blood_pressure" value={editedPatient.blood_pressure} onChange={handleInputChange} />
              </>
            ) : (
              <>
                <InfoItem label="Blood Type" value={patient.blood_type || 'N/A'} />
                <InfoItem label="Medical History" value={patient.medical_history || 'N/A'} />
                <InfoItem label="Treatment Plan" value={patient.treatment_plan || 'N/A'} />
                <InfoItem label="Allergies" value={patient.allergies || 'N/A'} />
                <InfoItem label="Temperature" value={patient.temperature || 'N/A'} />
                <InfoItem label="Blood Pressure" value={patient.blood_pressure || 'N/A'} />
              </>
            )}
          </div>
          {isEditing ? (
            <Button onClick={() => onSave(editedPatient)} className="mt-6 mr-2">Save</Button>
          ) : (
            <Button onClick={onEdit} className="mt-6 mr-2">Edit</Button>
          )}
          <Button onClick={onClose} className="mt-6">Close</Button>
        </div>
      </div>
    );
  };

  const AddModal = ({ isOpen, onClose, onSave }) => {
    const [newPatient, setNewPatient] = useState({
      username: '',
      email: '',
      date_of_birth: '',
      gender: '',
      phone: '',
      blood_type: '',
      medical_history:'',
      treatment_plan:'',
      allergies:'',
      notes:'',
      height:'',
      Weight:'',
      blood_pressure:'',
      temperature:''
    });
 

    if (!isOpen) return null;

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewPatient(prev => ({ ...prev, [name]: value }));
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Add New Patient</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditableInfoItem label="Name" name="username" value={newPatient.username} onChange={handleInputChange} />
            <EditableInfoItem label="Email" name="email" value={newPatient.email} onChange={handleInputChange} />
            <EditableInfoItem label="Date of Birth" name="date_of_birth" value={newPatient.date_of_birth} onChange={handleInputChange} type="date" />
            <EditableInfoItem label="Gender" name="gender" value={newPatient.gender} onChange={handleInputChange} />
            <EditableInfoItem label="Phone" name="phone" value={newPatient.phone} onChange={handleInputChange} />
            <EditableInfoItem label="Blood Type" name="blood_type" value={newPatient.blood_type} onChange={handleInputChange} />
            <EditableInfoItem label="Height" name="height" value={newPatient.height} onChange={handleInputChange} />
            <EditableInfoItem label="Weight" name="Weight" value={newPatient.Weight} onChange={handleInputChange} />
            <EditableInfoItem label="Medical History" name="medical_history" value={newPatient.medical_history} onChange={handleInputChange} />
                <EditableInfoItem label="Treatment Plan" name="treatment_plan" value={newPatient.treatment_plan} onChange={handleInputChange} />
                <EditableInfoItem label="Allergies" name="allergies" value={newPatient.allergies} onChange={handleInputChange} />
                <EditableInfoItem label="Notes" name="notes" value={newPatient.notes} onChange={handleInputChange} />
                <EditableInfoItem label="Temperature" name="temperature" value={newPatient.temperature} onChange={handleInputChange} />
                <EditableInfoItem label="Blood Pressure" name="blood_pressure" value={newPatient.blood_pressure} onChange={handleInputChange} />
           </div>
          <Button onClick={() => onSave(newPatient)} className="mt-6 mr-2">Add Patient</Button>
          <Button onClick={onClose} className="mt-6">Cancel</Button>
        </div>
      </div>
    );
  };

  const InfoItem = ({ label, value }) => (
    <div>
      <p className="font-semibold">{label}:</p>
      <p>{value}</p>
    </div>
  );

  const EditableInfoItem = ({ label, name, value, onChange, type = "text" }) => (
    <div>
      <p className="font-semibold">{label}:</p>
      {type === "date" ? (
        <input
          type="date"
          name={name}
          value={value || ''}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      ) : (
        <textarea
          name={name}
          value={value || ''}
          onChange={onChange}
          className="w-full p-2 border rounded"
          rows="2"
        />
      )}
    </div>
  );

  return (
    <div className="container overflow-x-auto overflow-y-auto h-80 mx-auto p-4">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl mr-4 font-semibold text-green-700 text-center md:text-left">Patient Records</h2>
        <Button className="px-4 py-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95" onClick={handleAdd}>
          Add New Patient
        </Button>
      </div>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full table-auto border-collapse bg-white">
          <thead>
            <tr className="bg-green-100">
              <th className="border border-green-200 p-3 text-left">Name</th>
              <th className="border border-green-200 p-3 text-left">Email</th>
              <th className="border border-green-200 p-3 text-left">Date of Birth</th>
              <th className="border border-green-200 p-3 text-left">Gender</th>
              <th className="border border-green-200 p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((patient) => (
              <tr key={patient.record_id} className="hover:bg-green-50 transition-colors duration-200">
                <td className="border border-green-200 p-3">{patient.username}</td>
                <td className="border border-green-200 p-3">{patient.email}</td>
                <td className="border border-green-200 p-3">{formatDate(patient.date_of_birth)}</td>
                <td className="border border-green-200 p-3">{patient.gender}</td>
                <td className="border border-green-200 p-3">
                  <Button className="mr-2" onClick={() => handleViewClick(patient.record_id)}>View/Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditing(false);
        }}
        patient={selectedPatient}
        isEditing={isEditing}
        onEdit={handleEditClick}
        onSave={handleSaveClick}
      />

      <AddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddSave}
      />
    </div>
  );
}

export default PatientRecords;