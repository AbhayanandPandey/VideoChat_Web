import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/home.jsx';
import LoginSignup from './components/LoginSignup/loginSignup.jsx';
import Index from './components/Home/Index.jsx';
import Dashboard from './components/Home/dashboard.jsx';
import About from './components/About/About.jsx';
import Services from './components/Services/Services.jsx';
import AboutUs from './components/About/AboutUs.jsx';
import ServicesLogin from './components/Services/ServicesLogin.jsx';
import ContactUs from './components/Contact/ContactUs.jsx';
import ProtectedRoute from './components/protectedRoute.jsx';
import Contact from './components/Contact/Contact.jsx';
function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginSignup />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/aboutus" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
          <Route path="/contactUs" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/ourServices" element={<ProtectedRoute><ServicesLogin /></ProtectedRoute>} />
          <Route path="/index" element={<Index />} />
      </Routes>
    </>
  );
}

export default App;
