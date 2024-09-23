import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../thunks/doctorThunk';
import { Phone, Mail, Award, User, Stethoscope } from 'lucide-react';

function DoctorData() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.doctorData);
  
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-70 border-t-2 border-b-2 border-green-500"></div>
    </div>;
  }

  if (error) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error:</strong>
      <span className="block sm:inline"> {error}</span>
    </div>;
  }

  return (
    <div className="text-emerald-500 rounded-lg shadow-xl p-6 md:p-8 max-w-4xl  ">
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
        <div className="flex-shrink-0 mb-6 md:mb-0">
          <div className="relative">
            <img
              className="w-40 h-40 rounded-full border-4 border-green-500 object-cover shadow-lg"
              src={items.profilepic || '/api/placeholder/160/160'}
              alt={`Dr. ${items.username}`}
            />
            <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2 shadow-lg">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="flex-grow text-center md:text-left">
          <h2 className="font-bold text-3xl text-green-700 mb-2">Dr. {items.username}</h2>
          <p className="font-semibold text-xl text-gray-700 mb-6">Specializes in treating cancer</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoItem icon={<Award className="w-6 h-6 text-green-600" />} label="Experience" value="10 years" />
            <InfoItem icon={<User className="w-6 h-6 text-green-600" />} label="Doctor ID" value={items.user_id} />
            <InfoItem icon={<Mail className="w-6 h-6 text-green-600" />} label="Email" value={items.email} />
            <InfoItem icon={<Phone className="w-6 h-6 text-green-600" />} label="Phone" value="+123 456 7890" />
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg shadow-sm transition duration-300 ease-in-out hover:bg-green-50 hover:shadow-md">
    <div className="bg-white p-2 rounded-full shadow-sm">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

export default DoctorData;