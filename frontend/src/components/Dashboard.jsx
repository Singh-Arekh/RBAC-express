// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { getUserDetails } from '../services/service';

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await getUserDetails();
        setUserDetails(data);
      } catch (err) {
        console.error('Error fetching user details:', err);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Welcome to Your Dashboard</h2>
        {userDetails ? (
          <div className="space-y-4">
            <p className="text-lg text-gray-700">Username: <span className="font-semibold">{userDetails.username}</span></p>
            <p className="text-lg text-gray-700">Role: <span className="font-semibold">{userDetails.role}</span></p>
          </div>
        ) : (
          <div className="text-center text-gray-600">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
