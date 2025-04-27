import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/home.jsx';
import LoginSignup from './components/LoginSignup/loginSignup.jsx';
import Index from './components/Home/Index.jsx';
import Dashboard from './components/Home/dashboard.jsx';
import About from './components/About/About.jsx';
import AboutLogin from './components/About/AboutLogin.jsx';
import ProtectedRoute from './components/protectedRoute.jsx';
function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginSignup />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/aboutUs" element={<ProtectedRoute><AboutLogin /></ProtectedRoute>} />
          <Route path="/index" element={<Index />} />
      </Routes>
    </>
  );
}

export default App;
