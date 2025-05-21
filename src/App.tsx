import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import BreakBus from './pages/BreakBus';
import StudentStorage from './pages/StudentStorage';
import FAQs from './pages/FAQs';
import ContactUs from './pages/ContactUs';
import AIAdvisor from './pages/AIAdvisor';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/breakbus" element={<BreakBus />} />
            <Route path="/studentstorage" element={<StudentStorage />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/ai-advisor" element={<AIAdvisor />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
