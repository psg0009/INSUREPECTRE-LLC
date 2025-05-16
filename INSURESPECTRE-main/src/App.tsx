import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import BreakBus from './pages/BreakBus';
import StudentStorage from './pages/StudentStorage';
import FAQs from './pages/FAQs';
import ContactUs from './pages/ContactUs';

export default function App() {
  return (
    <Router>
      <div className="bg-gradient-to-r from-purple-950 to-black min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/breakbus" element={<BreakBus />} />
          <Route path="/studentstorage" element={<StudentStorage />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
