import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/home.jsx';
import LoginSignup from './components/LoginSignup/loginSignup.jsx';
import Index from './components/Home/index.jsx';
function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginSignup />} /> 
          <Route path="/index" element={<Index />} />
      </Routes>
    </>
  );
}

export default App;
