import React from 'react';
import Launcher from '@/components/Launcher';

const LauncherPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Launcher onClose={() => window.history.back()} />
    </div>
  );
};

export default LauncherPage;