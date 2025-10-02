import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/Home/HomePage';
import FAQ from './pages/FAQ/FAQ';
import { UserProvider } from './UserContext/UserContext';
import HowItWorks from './pages/HowItWorks';
import SellPage from './pages/SellPage';
import MarketPage from './pages/MarketPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-500">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/howitworks" element={<HowItWorks />} />
              <Route path="/sell" element={<SellPage />} />
              <Route path="/market" element={<MarketPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/listed" element={<div className="text-center py-8">Listed Items - Coming Soon</div>} />
              <Route path="/history" element={<div className="text-center py-8">History - Coming Soon</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;