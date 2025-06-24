import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BookingPage from './pages/BookingPage';
import ConfirmationPage from './pages/ConfirmationPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;