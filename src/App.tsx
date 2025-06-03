import React from 'react';
import PCDViewer from './components/PCDViewer.tsx';
import './App.css';

const App: React.FC = () => {
  return (
    <PCDViewer 
      pcdFiles={[
        '/pcds/frame1.pcd',
        '/pcds/frame2.pcd'
      ]}
    />
  );
};

export default App;
