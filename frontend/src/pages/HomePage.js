import React, { useEffect } from 'react';
import { useAuth } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // User is authenticated, navigate to the dashboard
      navigate('/dashboard'); // Adjust the path as needed
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>TEST CREDENTIALS
        firstname: john
        lastname: doe
        password: pass123
      </h1>
    </div>
  );
};

export default HomePage;
