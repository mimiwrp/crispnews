import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import BriefingPage from './pages/BriefingPage';
import SettingsPage from './pages/SettingsPage';
import { PreferencesProvider } from './context/PreferencesContext';
import './index.css';

function App() {
  return (
    <PreferencesProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/briefing" element={<BriefingPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
      </Router>
    </PreferencesProvider>
  )
}

export default App;
