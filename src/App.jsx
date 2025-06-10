import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import NewsBriefing from './components/NewsBriefing';
import Settings from './pages/SettingsPage';
import { BriefingProvider } from './context/BriefingContext';
import './index.css';

function App() {
  return (
    <BriefingProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 font-body">
          <Header />
          
          <main className="pb-16 md:pb-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/briefing/:categoryId" element={<NewsBriefing />} />
              <Route path="/briefing" element={<NewsBriefing />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </BriefingProvider>
  );
}

export default App;