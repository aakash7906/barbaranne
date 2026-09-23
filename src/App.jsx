import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WebsiteLayout from './layout/WebsiteLayout';
import HomePage from './pages/WebsitePages/HomePage';
import AboutPage from './pages/WebsitePages/AboutPage';
import ServicesPage from './pages/WebsitePages/ServicesPage';
import BookingPage from './pages/WebsitePages/BookingPage';
import ContactPage from './pages/WebsitePages/ContactPage';

function App() {
  return (
    <BrowserRouter>
      <WebsiteLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/consultation" element={<BookingPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </WebsiteLayout>
    </BrowserRouter>
  );
}

export default App;

