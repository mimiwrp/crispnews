
import './index.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BriefingProvider } from './context/BriefingContext';

// Layout components
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import BriefingPage from './pages/BriefingPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <BriefingProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/briefing/:categoryId" element={<BriefingPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Layout>
      </Router>
    </BriefingProvider>
  );
}

export default App;
