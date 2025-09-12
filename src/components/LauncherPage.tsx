import React from 'react';
import { useNavigate } from 'react-router-dom';
import Launcher from '@/components/Launcher';

const LauncherPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      <Launcher onClose={() => navigate(-1)} />
    </div>
  );
};

export default LauncherPage;
